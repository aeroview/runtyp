import {test} from 'kizu';
import {array} from './array';
import {number} from './number';
import {custom} from './custom';

test('array(): valid inputs', (assert) => {

    const pred = array(number());

    assert.equal(pred([]), {isValid: true, value: []}, 'should return true for empty arrays');
    assert.equal(pred([1, 2, 3]), {isValid: true, value: [1, 2, 3]}, 'should return true for valid number arrays');
    assert.equal(pred([42]).isValid, true, 'should return true for single item arrays');

});

test('array(): invalid input types', (assert) => {

    assert.equal(array(number())(42), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for numbers');
    assert.equal(array(number())(true), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for booleans');
    assert.equal(array(number())(null), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for null');
    assert.equal(array(number())(undefined), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for undefined');
    assert.equal(array(number())({}), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for objects');
    assert.equal(array(number())('string'), {isValid: false, errors: {root: 'must be an array'}}, 'should return false for strings');

});

test('array(): element validation errors', (assert) => {

    assert.equal(array(number())([1, '2', 3]), {isValid: false, errors: {'[1]': 'must be a number'}}, 'should return false with element-specific errors');
    assert.equal(array(custom(() => false, 'I like nothing'))([1, '2', 3]), {
        isValid: false,
        errors: {
            '[0]': 'I like nothing',
            '[1]': 'I like nothing',
            '[2]': 'I like nothing',
        },
    }, 'should return false with multiple element errors');

});

test('array(): length validation', (assert) => {

    assert.equal(array(number(), {len: {min: 2, max: 2}})([1, 2]).isValid, true, 'should return true if within exact range');
    assert.equal(array(number(), {len: {max: 5}})([]).isValid, true, 'should return true if empty but min not specified');
    assert.equal(array(number(), {len: {min: 5}})([1, 1, 1, 1, 1]).isValid, true, 'should return true if meets min and no max');
    assert.equal(array(number(), {len: {min: 1}})([]), {isValid: false, errors: {root: 'must have at least 1 item(s)'}}, 'should return false if does not meet min');
    assert.equal(array(number(), {len: {max: 1}})([1, 2]), {isValid: false, errors: {root: 'must have at most 1 item(s)'}}, 'should return false if does not meet max');
    assert.equal(array(number(), {len: {min: 2, max: 2}})([1, 2, 3]), {isValid: false, errors: {root: 'must have exactly 2 item(s)'}}, 'should return false with exact error if min and max are same and out of range');

});

test('array(): edge cases', (assert) => {

    assert.equal(array(number())([0]).isValid, true, 'should return true for arrays with zero values');
    assert.equal(array(number())([-1, 0, 1]).isValid, true, 'should return true for arrays with negative and positive numbers');
    assert.equal(array(number())([1.5, 2.7]).isValid, true, 'should return true for arrays with decimal numbers');

});
