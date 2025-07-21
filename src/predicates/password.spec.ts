import {test} from 'kizu';
import {ValidationError} from '..';
import {password} from './password';

test('pred should return true for valid passwords', (assert) => {

    const pred = password();

    assert.equal(pred('asldh#2N'), true);
    assert.equal(pred('423Ab_$2s'), true);

});

// eslint-disable-next-line max-lines-per-function
test('pred should throw ValidationError for invalid password', (assert) => {

    const pred = password();

    assert.throws(
        () => pred(42),
        new ValidationError({
            root: 'must be a string',
        }),
        'not a string'
    );
    assert.throws(
        () => pred(true),
        new ValidationError({
            root: 'must be a string',
        }),
        'not a string'
    );
    assert.throws(
        () => pred('asdf'),
        new ValidationError({
            root: 'must between 8 and 100 characters',
        }),
        'too short'
    );
    assert.throws(
        () => pred('blahblahblah'),
        new ValidationError({
            root: 'must include at least one uppercase letter',
        }),
        'no uppercase'
    );
    assert.throws(
        () => pred('BLAHBLAHBLAH'),
        new ValidationError({
            root: 'must include at least one lowercase letter',
        }),
        'no lowercase'
    );
    assert.throws(
        () => pred('asdfASDF$'),
        new ValidationError({
            root: 'must include at least one number',
        }),
        'no number'
    );
    assert.throws(
        () => pred('Aa45245bhAd'),
        new ValidationError({
            root: 'must include at least one special character',
        }),
        'no special char'
    );

});
