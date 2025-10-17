import {test} from 'kizu';
import {boolean} from './boolean';

test('boolean(): valid inputs', (assert) => {

    assert.equal(boolean()(true), {isValid: true, value: true}, 'should return true for boolean true');
    assert.equal(boolean()(false), {isValid: true, value: false}, 'should return true for boolean false');
    assert.equal(boolean()(true).isValid, true, 'should return true for boolean true');
    assert.equal(boolean()(false).isValid, true, 'should return true for boolean false');

});

test('boolean(): invalid input types', (assert) => {

    assert.equal(boolean()(42), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for numbers');
    assert.equal(boolean()('false'), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for strings');
    assert.equal(boolean()('true'), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for string "true"');
    assert.equal(boolean()(null), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for null');
    assert.equal(boolean()(undefined), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for undefined');
    assert.equal(boolean()({}), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for objects');
    assert.equal(boolean()([]), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for arrays');
    assert.equal(boolean()(() => {}), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for functions');

});

test('boolean(): edge cases', (assert) => {

    assert.equal(boolean()(1), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for truthy numbers');
    assert.equal(boolean()(0), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for falsy numbers');
    assert.equal(boolean()(''), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for empty strings');
    assert.equal(boolean()(' '), {isValid: false, errors: {root: 'must be a boolean'}}, 'should return false for whitespace strings');

});
