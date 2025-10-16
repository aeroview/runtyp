import {test} from 'kizu';
import {password} from './password';

test('password(): valid inputs', (assert) => {
    assert.equal(password()('asldh#2N'), {isValid: true, value: 'asldh#2N'}, 'should return true for valid passwords with all requirements');
    assert.equal(password()('423Ab_$2s').isValid, true, 'should return true for valid passwords with all requirements');
    assert.equal(password()('MyP@ssw0rd').isValid, true, 'should return true for valid passwords with all requirements');
    assert.equal(password()('Test123!').isValid, true, 'should return true for valid passwords with all requirements');
});

test('password(): invalid input types', (assert) => {
    assert.equal(password()(42), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for numbers');
    assert.equal(password()(true), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for booleans');
    assert.equal(password()(null), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for null');
    assert.equal(password()(undefined), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for undefined');
    assert.equal(password()({}), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for objects');
    assert.equal(password()([]), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for arrays');
});

test('password(): length validation errors', (assert) => {
    assert.equal(password()('asdf'), {isValid: false, errors: {root: 'must between 8 and 100 characters'}}, 'should return false for passwords too short');
    assert.equal(password()('1234567'), {isValid: false, errors: {root: 'must between 8 and 100 characters'}}, 'should return false for passwords too short');
    assert.equal(password()('a'.repeat(101)), {isValid: false, errors: {root: 'must between 8 and 100 characters'}}, 'should return false for passwords too long');
});

test('password(): character requirement errors', (assert) => {
    assert.equal(password()('blahblahblah'), {isValid: false, errors: {root: 'must include at least one uppercase letter'}}, 'should return false for passwords without uppercase');
    assert.equal(password()('BLAHBLAHBLAH'), {isValid: false, errors: {root: 'must include at least one lowercase letter'}}, 'should return false for passwords without lowercase');
    assert.equal(password()('asdfASDF$'), {isValid: false, errors: {root: 'must include at least one number'}}, 'should return false for passwords without numbers');
    assert.equal(password()('Aa45245bhAd'), {isValid: false, errors: {root: 'must include at least one special character'}}, 'should return false for passwords without special characters');
});

test('password(): edge cases', (assert) => {
    assert.equal(password()('').isValid, false, 'should return false for empty strings');
    assert.equal(password()(' ').isValid, false, 'should return false for whitespace only');
    assert.equal(password()('12345678').isValid, false, 'should return false for numbers only');
    assert.equal(password()('ABCDEFGH').isValid, false, 'should return false for uppercase only');
    assert.equal(password()('abcdefgh').isValid, false, 'should return false for lowercase only');
    assert.equal(password()('!@#$%^&*').isValid, false, 'should return false for special characters only');
});
