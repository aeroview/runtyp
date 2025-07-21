import {test} from 'kizu';
import {ValidationError} from '..';
import {literal} from './literal';

test('pred should return true for correct values and throw otherwise', (assert) => {

    const err = (message: string): ValidationError => new ValidationError({
        root: message,
    });

    // successes

    assert.equal(literal(null)(null), true);
    assert.equal(literal(42)(42), true);
    assert.equal(literal('whatever')('whatever'), true);
    assert.equal(literal(true)(true), true);
    assert.equal(literal(false)(false), true);

    // failures
    assert.throws(() => literal(null)(42), err('must be null'));
    assert.throws(() => literal(69)('string'), err('must be 69'));
    assert.throws(() => literal(true)(false), err('must be true'));
    assert.throws(() => literal(false)(true), err('must be false'));
    assert.throws(() => literal('whatever')(42), err('must be whatever'));


});
