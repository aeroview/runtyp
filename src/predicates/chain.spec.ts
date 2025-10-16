import {test} from 'kizu';
import {chain} from './chain';
import {string} from './string';
import {custom} from './custom';
import {number} from './number';

test('chain(): empty chain', (assert) => {

    const pred = chain();

    assert.equal(pred('whatever'), {isValid: true, value: 'whatever'}, 'should return true for empty chain');
    assert.equal(pred(42).isValid, true, 'should return true for empty chain with any value');

});

test('chain(): valid inputs', (assert) => {

    const pred = chain(
        string({len: {min: 5, max: 8}}),
        custom<string>((value: string) => value.includes('o'), 'must include letter o'),
    );

    assert.equal(pred('hello'), {isValid: true, value: 'hello'}, 'should return true when all predicates pass');
    assert.equal(pred('world').isValid, true, 'should return true when all predicates pass');

});

test('chain(): validation errors - first predicate fails', (assert) => {

    const pred = chain(
        string({len: {min: 5, max: 10}}),
        custom<string>((value: string) => value.includes('o'), 'must include letter o'),
    );

    assert.equal(pred(42), {isValid: false, errors: {root: 'must be a string'}}, 'should return false when first predicate fails');
    assert.equal(pred('hi'), {isValid: false, errors: {root: 'must be at least 5 characters'}}, 'should return false when string length fails');
    assert.equal(pred('blasdfasdfasdf'), {isValid: false, errors: {root: 'must be at most 10 characters'}}, 'should return false when string too long');

});

test('chain(): validation errors - later predicate fails', (assert) => {

    const pred = chain(
        string({len: {min: 5, max: 10}}),
        custom<string>((value: string) => value.includes('o'), 'must include letter o'),
    );

    assert.equal(pred('greetings'), {isValid: false, errors: {root: 'must include letter o'}}, 'should return false when custom predicate fails');
    assert.equal(pred('testing'), {isValid: false, errors: {root: 'must include letter o'}}, 'should return false when custom predicate fails');

});

test('chain(): multiple predicates', (assert) => {

    const pred = chain(
        number(),
        custom<number>((value: number) => value > 0, 'must be positive'),
        custom<number>((value: number) => value < 100, 'must be less than 100'),
    );

    assert.equal(pred(50).isValid, true, 'should return true when all predicates pass');
    assert.equal(pred(-5), {isValid: false, errors: {root: 'must be positive'}}, 'should return false when second predicate fails');
    assert.equal(pred(150), {isValid: false, errors: {root: 'must be less than 100'}}, 'should return false when third predicate fails');
    assert.equal(pred('not a number'), {isValid: false, errors: {root: 'must be a number'}}, 'should return false when first predicate fails');

});

test('chain(): edge cases', (assert) => {

    const pred = chain(
        string(),
        custom<string>((value: string) => value.length > 0, 'must not be empty'),
    );

    assert.equal(pred('').isValid, false, 'should return false for empty string');
    assert.equal(pred('a').isValid, true, 'should return true for single character');
    assert.equal(pred(null), {isValid: false, errors: {root: 'must be a string'}}, 'should return false for null');

});
