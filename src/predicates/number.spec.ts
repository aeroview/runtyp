import {test} from 'kizu';
import {number} from './number';
import {ValidationError} from '..';

test('number(): input types', (assert) => {

    assert.equal(number()(42), true, 'should return true for postive numbers');
    assert.equal(number()(-123), true, 'should return true for negative numbers');
    assert.equal(number()(0), true, 'should return true for zero');
    assert.equal(number()(3.14), true, 'should return true for floats');
    assert.throws(() => number()('42'), new ValidationError({root: 'must be a number'}), 'should throw ValidationError for non-numbers');

});

test('number(): ranges', (assert) => {

    const pred = number({range: {min: 5, max: 8}});

    assert.equal(pred(7), true, 'should return true if number inside range');
    assert.throws(() => pred(0), new ValidationError({root: 'must be between 5 and 8'}), 'should throw ValidationError if too small');
    assert.throws(() => pred(12312), new ValidationError({root: 'must be between 5 and 8'}), 'should throw ValidationError if too large');

});
