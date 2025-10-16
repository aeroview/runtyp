import {test} from 'kizu';
import {uuid} from './uuid';

test('uuid(): valid inputs', (assert) => {

    assert.equal(uuid()('323b360f-4271-45ec-88f8-aaacda4e07c8'), {isValid: true, value: '323b360f-4271-45ec-88f8-aaacda4e07c8'}, 'should return true for valid UUIDs');
    assert.equal(uuid()('806f0d3d-3a7b-45c0-9fac-8290d4eee792').isValid, true, 'should return true for valid UUIDs');
    assert.equal(uuid()('f87475ac-ed47-4db1-b725-1711523bf71e').isValid, true, 'should return true for valid UUIDs');
    assert.equal(uuid()('00000000-0000-4000-8000-000000000000').isValid, true, 'should return true for valid UUIDs');
    assert.equal(uuid()('ffffffff-ffff-4fff-bfff-ffffffffffff').isValid, true, 'should return true for valid UUIDs');

});

test('uuid(): invalid input types', (assert) => {

    assert.equal(uuid()(42), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for numbers');
    assert.equal(uuid()(true), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for booleans');
    assert.equal(uuid()(null), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for null');
    assert.equal(uuid()(undefined), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for undefined');
    assert.equal(uuid()({}), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for objects');
    assert.equal(uuid()([]), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for arrays');
    assert.equal(uuid()(() => {}), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for functions');

});

test('uuid(): invalid string formats', (assert) => {

    assert.equal(uuid()('aefadsfasdfasdf'), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for random strings');
    assert.equal(uuid()('not-a-uuid'), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for invalid format');
    assert.equal(uuid()('12345678-1234-1234-1234-123456789012').isValid, true, 'should return true for valid UUID format (even if not v4)');
    assert.equal(uuid()('323b360f-4271-45ec-88f8'), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for incomplete UUID');
    assert.equal(uuid()('323b360f-4271-45ec-88f8-aaacda4e07c8-extra'), {isValid: false, errors: {root: 'must be a valid uuid'}}, 'should return false for UUID with extra characters');

});

test('uuid(): edge cases', (assert) => {

    assert.equal(uuid()('').isValid, false, 'should return false for empty strings');
    assert.equal(uuid()(' ').isValid, false, 'should return false for whitespace');
    assert.equal(uuid()('323b360f-4271-45ec-88f8-aaacda4e07c8 ').isValid, false, 'should return false for UUID with trailing space');
    assert.equal(uuid()(' 323b360f-4271-45ec-88f8-aaacda4e07c8').isValid, false, 'should return false for UUID with leading space');

});
