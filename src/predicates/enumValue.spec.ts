import {test} from 'kizu';
import {enumValue} from './enumValue';

enum TestEnum {
    Foo = 'foo',
    Bar = 'bar',
    Baz = 'baz'
}

enum StatusEnum {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending'
}

test('enumValue(): valid inputs', (assert) => {

    const pred = enumValue(TestEnum);

    assert.equal(pred('foo'), {isValid: true, value: 'foo'}, 'should return true for valid enum values');
    assert.equal(pred('bar'), {isValid: true, value: 'bar'}, 'should return true for valid enum values');
    assert.equal(pred('baz').isValid, true, 'should return true for valid enum values');

});

test('enumValue(): validation errors', (assert) => {

    const pred = enumValue(TestEnum);

    assert.equal(pred('gak'), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for invalid enum values');
    assert.equal(pred('blah'), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for invalid enum values');
    assert.equal(pred('FOO'), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for case-sensitive mismatches');

});

test('enumValue(): invalid input types', (assert) => {

    const pred = enumValue(TestEnum);

    assert.equal(pred(42), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for numbers');
    assert.equal(pred(true), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for booleans');
    assert.equal(pred(null), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for null');
    assert.equal(pred(undefined), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for undefined');
    assert.equal(pred({}), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for objects');
    assert.equal(pred([]), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for arrays');

});

test('enumValue(): different enums', (assert) => {

    const statusPred = enumValue(StatusEnum);

    assert.equal(statusPred('active').isValid, true, 'should return true for valid status enum values');
    assert.equal(statusPred('inactive').isValid, true, 'should return true for valid status enum values');
    assert.equal(statusPred('pending').isValid, true, 'should return true for valid status enum values');
    assert.equal(statusPred('foo'), {isValid: false, errors: {root: 'must be a valid enum value'}}, 'should return false for values from different enum');

});

