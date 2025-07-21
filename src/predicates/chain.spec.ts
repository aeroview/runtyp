import {test} from 'kizu';
import {chain} from './chain';
import {ValidationError} from '..';
import {string} from './string';
import {custom} from './custom';

test('pred should return true for empty chain', (assert) => {

    const pred = chain();

    assert.equal(pred('whatever'), true);

});

test('pred should return true if all predicates in chain return true', (assert) => {

    const pred = chain(
        string({len: {min: 5, max: 8}}),
        custom<string>((value: string) => value.includes('o'), 'must include letter o'),
    );

    assert.equal(pred('hello'), true);

});

// eslint-disable-next-line max-lines-per-function
test('pred should throw ValidationError if any predicates in chain throw', (assert) => {

    const pred = chain(
        string({len: {min: 5, max: 10}}),
        custom<string>((value: string) => value.includes('o'), 'must include letter o'),
    );

    assert.throws(
        () => pred(42),
        new ValidationError({
            root: 'must be a string',
        }),
        'must be a string'
    );

    assert.throws(
        () => pred('hi'),
        new ValidationError({
            root: 'must be at least 5 characters',
        }),
        'too short'
    );

    assert.throws(
        () => pred('blasdfasdfasdf'),
        new ValidationError({
            root: 'must be at most 10 characters',
        }),
        'too long'
    );

    assert.throws(
        () => pred('greetings'),
        new ValidationError({
            root: 'must include letter o',
        }),
        'missing letter o'
    );

});
