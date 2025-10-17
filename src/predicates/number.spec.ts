import {test} from 'kizu';
import {number} from './number';

test('number(): valid inputs', (assert) => {

    assert.equal(number()(42), {isValid: true, value: 42}, 'should return true for positive numbers');
    assert.equal(number()(-123), {isValid: true, value: -123}, 'should return true for negative numbers');
    assert.equal(number()(0), {isValid: true, value: 0}, 'should return true for zero');
    assert.equal(number()(3.14), {isValid: true, value: 3.14}, 'should return true for floats');
    assert.equal(number()(1.5).isValid, true, 'should return true for decimal numbers');

});

test('number(): invalid input types', (assert) => {

    assert.equal(number()('42'), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for string numbers');
    assert.equal(number()(true), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for booleans');
    assert.equal(number()(null), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for null');
    assert.equal(number()(undefined), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for undefined');
    assert.equal(number()({}), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for objects');
    assert.equal(number()([]), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for arrays');
    assert.equal(number()(() => {}), {isValid: false, errors: {root: 'must be a number'}}, 'should return false for functions');

});

test('number(): range validation', (assert) => {

    const pred = number({range: {min: 5, max: 8}});

    assert.equal(pred(7), {isValid: true, value: 7}, 'should return true if number inside range');
    assert.equal(pred(5).isValid, true, 'should return true for minimum boundary');
    assert.equal(pred(8).isValid, true, 'should return true for maximum boundary');
    assert.equal(pred(0), {isValid: false, errors: {root: 'must be between 5 and 8'}}, 'should return false if too small');
    assert.equal(pred(12312), {isValid: false, errors: {root: 'must be between 5 and 8'}}, 'should return false if too large');

});

test('number(): edge cases', (assert) => {

    assert.equal(number()(Infinity).isValid, true, 'should return true for Infinity');
    assert.equal(number()(-Infinity).isValid, true, 'should return true for -Infinity');
    assert.equal(number()(NaN).isValid, true, 'should return true for NaN');
    assert.equal(number()(Number.MAX_SAFE_INTEGER).isValid, true, 'should return true for large integers');
    assert.equal(number()(Number.MIN_SAFE_INTEGER).isValid, true, 'should return true for small integers');

});
