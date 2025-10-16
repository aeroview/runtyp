import {test} from 'kizu';
import {email} from './email';

test('email(): valid inputs', (assert) => {

    assert.equal(email()('john.doe@example.com'), {isValid: true, value: 'john.doe@example.com'}, 'should return true for valid emails with dots');
    assert.equal(email()('john.doe+test123@example.com'), {isValid: true, value: 'john.doe+test123@example.com'}, 'should return true for valid emails with plus signs');
    assert.equal(email()('jane-doe@sub.example.co.uk').isValid, true, 'should return true for valid emails with dashes and subdomains');
    assert.equal(email()('user.name@example.io').isValid, true, 'should return true for valid emails with different TLDs');
    assert.equal(email()('test@example.org').isValid, true, 'should return true for simple valid emails');

});

test('email(): invalid input types', (assert) => {

    assert.equal(email()(42), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for numbers');
    assert.equal(email()(true), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for booleans');
    assert.equal(email()(null), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for null');
    assert.equal(email()(undefined), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for undefined');
    assert.equal(email()({}), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for objects');
    assert.equal(email()([]), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for arrays');

});

test('email(): invalid email formats', (assert) => {

    assert.equal(email()('plainaddress'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for plain addresses without @');
    assert.equal(email()('@missingusername.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails missing username');
    assert.equal(email()('username@.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with missing domain');
    assert.equal(email()('username@.com.'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with period at end');
    assert.equal(email()('username@domain..com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with double periods');
    assert.equal(email()('username@domain@domain.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with double @ symbols');
    assert.equal(email()('.username@domain.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with period at start');
    assert.equal(email()('username@domain,com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with comma instead of period');

});

test('email(): length validation errors', (assert) => {

    assert.equal(email()('usersdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfname@domain.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with too long username');
    assert.equal(email()('user@domainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.com'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with too long domain part');
    assert.equal(email()('user@domainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'), {isValid: false, errors: {root: 'must be a valid email address'}}, 'should return false for emails with too long address');

});

test('email(): edge cases', (assert) => {

    assert.equal(email()('').isValid, false, 'should return false for empty strings');
    assert.equal(email()(' ').isValid, false, 'should return false for whitespace');
    assert.equal(email()('user@domain.com ').isValid, false, 'should return false for emails with trailing spaces');
    assert.equal(email()(' user@domain.com').isValid, false, 'should return false for emails with leading spaces');

});
