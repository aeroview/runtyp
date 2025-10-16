import {test} from 'kizu';
import {string} from './string';

test('string(): valid inputs', (assert) => {

    assert.equal(string()('hello'), {isValid: true, value: 'hello'}, 'should return true for valid strings');
    assert.equal(string()('').isValid, true, 'should return true for empty strings');
    assert.equal(string()('a').isValid, true, 'should return true for single character strings');
    assert.equal(string()('very long string with many characters').isValid, true, 'should return true for long strings');

});

test('string(): invalid input types', (assert) => {

    assert.equal(string()(42), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for numbers');
    assert.equal(string()(true), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for booleans');
    assert.equal(string()(null), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for null');
    assert.equal(string()(undefined), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for undefined');
    assert.equal(string()({}), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for objects');
    assert.equal(string()([]), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for arrays');
    assert.equal(string()(() => {}), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for functions');

});

test('string(): length constraints - valid cases', (assert) => {

    assert.equal(string({len: {min: 5}})('hello').isValid, true, 'should return true when string meets minimum length');
    assert.equal(string({len: {max: 10}})('hello').isValid, true, 'should return true when string meets maximum length');
    assert.equal(string({len: {min: 3, max: 8}})('hello').isValid, true, 'should return true when string is within range');
    assert.equal(string({len: {min: 5, max: 5}})('hello').isValid, true, 'should return true when string is exactly the required length');

});

test('string(): length constraints - minimum length errors', (assert) => {

    assert.equal(string({len: {min: 5}})('hi'), {isValid: false, errors: {root: 'must be at least 5 characters'}}, 'should return false when string is too short');
    assert.equal(string({len: {min: 10}})(''), {isValid: false, errors: {root: 'must be at least 10 characters'}}, 'should return false when empty string is below minimum');
    assert.equal(string({len: {min: 1}})(''), {isValid: false, errors: {root: 'must be at least 1 characters'}}, 'should return false when empty string is below minimum of 1');

});

test('string(): length constraints - maximum length errors', (assert) => {

    assert.equal(string({len: {max: 3}})('hello'), {isValid: false, errors: {root: 'must be at most 3 characters'}}, 'should return false when string is too long');
    assert.equal(string({len: {max: 0}})('a'), {isValid: false, errors: {root: 'must be at most 0 characters'}}, 'should return false when string exceeds maximum of 0');

});

test('string(): length constraints - range errors', (assert) => {

    assert.equal(string({len: {min: 5, max: 8}})('hi'), {isValid: false, errors: {root: 'must be at least 5 characters'}}, 'should return false when string is below range');
    assert.equal(string({len: {min: 5, max: 8}})('very long string'), {isValid: false, errors: {root: 'must be at most 8 characters'}}, 'should return false when string is above range');

});

test('string(): edge cases', (assert) => {

    assert.equal(string()(' ').isValid, true, 'should return true for whitespace strings');
    assert.equal(string()('\n\t\r').isValid, true, 'should return true for strings with special characters');
    assert.equal(string()('123').isValid, true, 'should return true for numeric strings');
    assert.equal(string()('!@#$%^&*()').isValid, true, 'should return true for special character strings');

});

