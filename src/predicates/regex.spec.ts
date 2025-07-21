import {test} from 'kizu';
import {regex} from './regex';
import {ValidationError} from '..';

test('regex', (assert) => {

    assert.equal(
        regex(/^[a-z]+$/, 'not a-z')('abc'),
        true,
        '"abc" passes /^[a-z]+$/'
    );
    assert.throws(
        () => regex(/^[a-z]+$/, 'not a-z')('123'),
        new ValidationError({root: 'not a-z'}),
        '"123" does not pass /^[a-z]+$/'
    );

    // with modifiers

    assert.equal(
        regex(/^[a-z]+$/i, 'not a-z')('ABC'),
        true,
        '"ABC" passes /^[a-z]+$/i'
    );
    assert.throws(
        () => regex(/^[a-z]+$/i, 'not a-z')('123'),
        new ValidationError({root: 'not a-z'}),
        '"123" does not pass /^[a-z]+$/i'
    );

});
