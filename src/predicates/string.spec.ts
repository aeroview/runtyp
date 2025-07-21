import {test} from 'kizu';
import {string} from './string';
import {ValidationError} from '..';

test('string(): input types', (assert) => {

    assert.equal(string()('hello'), true, 'should return true for valid strings');
    assert.throws(() => string()(42), new ValidationError({root: 'must be a string'}), 'should throw ValidationError for non-strings');
    assert.throws(() => string()(true), new ValidationError({root: 'must be a string'}), 'should throw ValidationError for non-strings');
    assert.throws(() => string()(() => {}), new ValidationError({root: 'must be a string'}), 'should throw ValidationError for non-strings');

});

test('string(): length', (assert) => {

    const len = {min: 5, max: 8};

    assert.equal(string()(''), true, 'should return true for empty strings if len is not set');
    assert.equal(string({len: {min: 5, max: 8}})('hello'), true, 'should return true if inside length range');
    assert.throws(() => string({len})('hi'), new ValidationError({root: 'must be at least 5 characters'}), 'should throw ValidationError if too small');
    assert.throws(() => string({len})('saldkfjlaskjdflaskdfasdf'), new ValidationError({root: 'must be at most 8 characters'}), 'should throw ValidationError if too large');

});

