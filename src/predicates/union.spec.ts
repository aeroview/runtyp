import {test} from 'kizu';
import {union} from './union';
import {ValidationError} from '..';
import {string} from './string';
import {number} from './number';
import {boolean} from './boolean';
import {custom} from './custom';

test('pred should throw for empty union', (assert) => {

    const pred = union([], 'this will always throw');

    assert.throws(() => pred('anything'), new ValidationError({
        root: 'this will always throw',
    }));

});

test('pred should accept any value passing one of the given predicates (simple case)', (assert) => {

    const pred = union([string(), number()], 'must be a string or a number');

    assert.throws(() => pred(true), new ValidationError({
        root: 'must be a string or a number',
    }));
    assert.isTrue(pred('string'));
    assert.isTrue(pred(123));

});

test('pred should accept any value passing one of the given predicates (complex case)', (assert) => {

    const isEvenNumber = (value: unknown): boolean => typeof value === 'number' && value % 2 === 0;
    const isEvenNumberPredicate = custom(isEvenNumber, 'must be an even number');
    const pred = union([boolean(), isEvenNumberPredicate], 'must be a string or an even number');

    // failures
    assert.throws(() => pred(7), new ValidationError({
        root: 'must be a string or an even number',
    }));
    assert.throws(() => pred(/this is a regex/), new ValidationError({
        root: 'must be a string or an even number',
    }));
    assert.throws(() => pred(null), new ValidationError({
        root: 'must be a string or an even number',
    }));
    assert.throws(() => pred(undefined), new ValidationError({
        root: 'must be a string or an even number',
    }));

    // successes
    assert.isTrue(pred(true));
    assert.isTrue(pred(false));
    assert.isTrue(pred(2));
    assert.isTrue(pred(4));

});
