import {test} from 'kizu';
import {ValidationError} from '..';
import {email} from './email';

test('pred should return true for valid emails', (assert) => {

    const pred = email();

    assert.equal(pred('john.doe@example.com'), true, 'email with dot');
    assert.equal(pred('john.doe+test123@example.com'), true, 'email with plus');
    assert.equal(pred('jane-doe@sub.example.co.uk'), true, 'with dash and subdomain');
    assert.equal(pred('user.name@example.io'), true, 'user.name@example.io');

});

// eslint-disable-next-line max-lines-per-function
test('pred should throw ValidationError for invalid emails', (assert) => {

    const pred = email();
    const expectedErr = new ValidationError({
        root: 'must be a valid email address',
    });

    assert.throws(
        () => pred(42),
        expectedErr,
        'not a string'
    );
    assert.throws(
        () => pred(true),
        expectedErr,
        'not a string'
    );
    assert.throws(
        () => pred('plainaddress'),
        expectedErr,
        'plainaddress'
    );
    assert.throws(
        () => pred('@missingusername.com'),
        expectedErr,
        'missing user name'
    );
    assert.throws(
        () => pred('username@.com'),
        expectedErr,
        'missing domain'
    );
    assert.throws(
        () => pred('username@.com.'),
        expectedErr,
        'period at end'
    );
    assert.throws(
        () => pred('username@domain..com'),
        expectedErr,
        'double period'
    );
    assert.throws(
        () => pred('username@domain@domain.com'),
        expectedErr,
        'double @'
    );
    assert.throws(
        () => pred('.username@domain.com'),
        expectedErr,
        'period at start'
    );
    assert.throws(
        () => pred('username@domain,com'),
        expectedErr,
        'comma instead of period'
    );
    assert.throws(
        () => pred('usersdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfname@domain.com'),
        expectedErr,
        'too long username'
    );
    assert.throws(
        () => pred('user@domainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.com'),
        expectedErr,
        'too long account'
    );
    assert.throws(
        () => pred('user@domainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'),
        expectedErr,
        'too long address'
    );

});
