import {test} from 'kizu';
import {union} from './union';
import {string} from './string';
import {number} from './number';
import {boolean} from './boolean';
import {custom} from './custom';

test('union(): empty union', (assert) => {

    const pred = union([], 'this will always fail');

    assert.equal(pred('anything'), {isValid: false, errors: {root: 'this will always fail'}}, 'should return false for empty union');
    assert.equal(pred(42), {isValid: false, errors: {root: 'this will always fail'}}, 'should return false for empty union with any value');

});

test('union(): valid inputs - simple case', (assert) => {

    const pred = union([string(), number()], 'must be a string or a number');

    assert.equal(pred('string'), {isValid: true, value: 'string'}, 'should return true for valid strings');
    assert.equal(pred(123), {isValid: true, value: 123}, 'should return true for valid numbers');
    assert.equal(pred('hello').isValid, true, 'should return true for valid strings');
    assert.equal(pred(42).isValid, true, 'should return true for valid numbers');

});

test('union(): validation errors - simple case', (assert) => {

    const pred = union([string(), number()], 'must be a string or a number');

    assert.equal(pred(true), {isValid: false, errors: {root: 'must be a string or a number'}}, 'should return false for booleans');
    assert.equal(pred(null), {isValid: false, errors: {root: 'must be a string or a number'}}, 'should return false for null');
    assert.equal(pred(undefined), {isValid: false, errors: {root: 'must be a string or a number'}}, 'should return false for undefined');
    assert.equal(pred({}), {isValid: false, errors: {root: 'must be a string or a number'}}, 'should return false for objects');
    assert.equal(pred([]), {isValid: false, errors: {root: 'must be a string or a number'}}, 'should return false for arrays');

});

test('union(): valid inputs - complex case', (assert) => {

    const isEvenNumber = (value: unknown): boolean => typeof value === 'number' && value % 2 === 0;
    const isEvenNumberPredicate = custom(isEvenNumber, 'must be an even number');
    const pred = union([boolean(), isEvenNumberPredicate], 'must be a boolean or an even number');

    assert.equal(pred(true), {isValid: true, value: true}, 'should return true for valid booleans');
    assert.equal(pred(false), {isValid: true, value: false}, 'should return true for valid booleans');
    assert.equal(pred(2), {isValid: true, value: 2}, 'should return true for even numbers');
    assert.equal(pred(4).isValid, true, 'should return true for even numbers');
    assert.equal(pred(6).isValid, true, 'should return true for even numbers');

});

test('union(): validation errors - complex case', (assert) => {

    const isEvenNumber = (value: unknown): boolean => typeof value === 'number' && value % 2 === 0;
    const isEvenNumberPredicate = custom(isEvenNumber, 'must be an even number');
    const pred = union([boolean(), isEvenNumberPredicate], 'must be a boolean or an even number');

    assert.equal(pred(7), {isValid: false, errors: {root: 'must be a boolean or an even number'}}, 'should return false for odd numbers');
    assert.equal(pred(/this is a regex/), {isValid: false, errors: {root: 'must be a boolean or an even number'}}, 'should return false for regex objects');
    assert.equal(pred(null), {isValid: false, errors: {root: 'must be a boolean or an even number'}}, 'should return false for null');
    assert.equal(pred(undefined), {isValid: false, errors: {root: 'must be a boolean or an even number'}}, 'should return false for undefined');
    assert.equal(pred('string'), {isValid: false, errors: {root: 'must be a boolean or an even number'}}, 'should return false for strings');

});

test('union(): edge cases', (assert) => {

    const pred = union([string(), number()], 'must be a string or a number');

    assert.equal(pred('').isValid, true, 'should return true for empty strings');
    assert.equal(pred(0).isValid, true, 'should return true for zero');
    assert.equal(pred(-1).isValid, true, 'should return true for negative numbers');
    assert.equal(pred(1.5).isValid, true, 'should return true for decimal numbers');

});
