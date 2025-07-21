import {test} from 'kizu';
import {ValidationError} from '..';
import {custom} from './custom';

test('pred should return true if wrapped pred returns true', (assert) => {

    assert.equal(custom(() => true, 'always true')(true), true);

});

test('pred should throw ValidationError with provided message if wrapped pred returns false', (assert) => {

    const pred = custom(() => false, 'always false');

    assert.throws(
        () => pred('whatever'),
        new ValidationError({root: 'always false'}),
    );

});
