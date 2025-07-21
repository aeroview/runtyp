import {test} from 'kizu';
import {array} from './array';
import {number} from './number';
import {Pred, ValidationError} from '..';
import {custom} from './custom';

test('pred should return true for arrays', (assert) => {

    const pred = array(number());

    assert.equal(pred([]), true);
    assert.equal(pred([1, 2, 3]), true);

});

test('pred should throw ValidationError for invalid value', (assert) => {

    assert.throws(() => array(number())(42), new ValidationError({root: 'must be an array'}), 'throws');
    assert.throws(() => array(number())([1, '2', 3]), new ValidationError({'[1]': 'must be a number'}), 'throws');
    assert.throws(
        () => array(custom(() => false, 'I like nothing'))([1, '2', 3]),
        new ValidationError({
            '[0]': 'I like nothing',
            '[1]': 'I like nothing',
            '[2]': 'I like nothing',
        }),
        'throws'
    );

    const predWithInvalidError: Pred<number> = (val: unknown): val is number => {

        if (typeof val !== 'number') throw new Error('must be a number');
        return true;

    };

    assert.throws(
        () => array(predWithInvalidError)([1, '2', 3]),
        new Error('must be a number'),
        'throws'
    );

});

// eslint-disable-next-line max-lines-per-function
test('with specified optional length range', (assert) => {

    assert.equal(
        array(number(), {len: {min: 2, max: 2}})([1, 2]),
        true,
        'should not throw if within range'
    );
    assert.equal(
        array(number(), {len: {max: 5}})([]),
        true,
        'should not throw if empty but min is not specified'
    );
    assert.equal(
        array(number(), {len: {min: 5}})([1, 1, 1, 1, 1]),
        true,
        'should not throw if meets min and there is no max'
    );
    assert.throws(
        () => array(number(), {len: {min: 1}})([]),
        new ValidationError({root: 'must have at least 1 item(s)'}),
        'should throw if does not meet min'
    );
    assert.throws(
        () => array(number(), {len: {max: 1}})([1, 2]),
        new ValidationError({root: 'must have at most 1 item(s)'}),
        'should throw if does not meet max'
    );
    assert.throws(
        () => array(number(), {len: {min: 2, max: 2}})([1, 2, 3]),
        new ValidationError({root: 'must have exactly 2 item(s)'}),
        'should throw with exact error if min and max are the same and it is out of range'
    );

});
