import {test} from 'kizu';
import {regex} from './regex';

test('regex(): valid inputs', (assert) => {

    assert.equal(regex(/^[a-z]+$/, 'not a-z')('abc'), {isValid: true, value: 'abc'}, 'should return true for matching lowercase strings');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('hello').isValid, true, 'should return true for matching lowercase strings');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('world').isValid, true, 'should return true for matching lowercase strings');

});

test('regex(): case insensitive matching', (assert) => {

    assert.equal(regex(/^[a-z]+$/i, 'not a-z')('ABC'), {isValid: true, value: 'ABC'}, 'should return true for uppercase strings with i flag');
    assert.equal(regex(/^[a-z]+$/i, 'not a-z')('Hello').isValid, true, 'should return true for mixed case strings with i flag');
    assert.equal(regex(/^[a-z]+$/i, 'not a-z')('WORLD').isValid, true, 'should return true for uppercase strings with i flag');

});

test('regex(): validation errors', (assert) => {

    assert.equal(regex(/^[a-z]+$/, 'not a-z')('123'), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for non-matching strings');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('abc123'), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for strings with numbers');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('ABC'), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for uppercase without i flag');
    assert.equal(regex(/^[a-z]+$/i, 'not a-z')('123'), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for numbers even with i flag');

});

test('regex(): invalid input types', (assert) => {

    assert.equal(regex(/^[a-z]+$/, 'not a-z')(42), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for numbers');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')(true), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for booleans');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')(null), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for null');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')(undefined), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for undefined');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')({}), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for objects');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')([]), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for arrays');

});

test('regex(): edge cases', (assert) => {

    assert.equal(regex(/^$/, 'not empty')(''), {isValid: true, value: ''}, 'should return true for empty string when regex matches empty');
    assert.equal(regex(/^.*$/, 'not anything')('').isValid, true, 'should return true for empty string with wildcard');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')(''), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for empty string when regex requires content');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('a'), {isValid: true, value: 'a'}, 'should return true for single character match');
    assert.equal(regex(/^[a-z]+$/, 'not a-z')('a1'), {isValid: false, errors: {root: 'not a-z'}}, 'should return false for single character with number');

});
