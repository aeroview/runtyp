import {test} from 'kizu';
import {ValidationError} from '..';
import {boolean} from './boolean';

test('pred should return true for booleans', (assert) => {

    const pred = boolean();

    assert.equal(pred(true), true);
    assert.equal(pred(false), true);

});

test('pred should throw ValidationError for invalid value', (assert) => {

    const pred = boolean();
    const expected = new ValidationError({
        root: 'must be a boolean',
    });

    assert.throws(
        () => pred(42),
        expected,
    );
    assert.throws(
        () => pred('false'),
        expected,
    );

});
