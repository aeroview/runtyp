import {test} from 'kizu';
import {any} from './any';

test('any(): accepts any value', (assert) => {

    assert.equal(any()(true), {isValid: true, value: true}, 'should return true for boolean true');
    assert.equal(any()(false), {isValid: true, value: false}, 'should return true for boolean false');
    assert.equal(any()(42), {isValid: true, value: 42}, 'should return true for numbers');
    assert.equal(any()('hello'), {isValid: true, value: 'hello'}, 'should return true for strings');
    assert.equal(any()(null), {isValid: true, value: null}, 'should return true for null');
    assert.equal(any()(undefined), {isValid: true, value: undefined}, 'should return true for undefined');
    assert.equal(any()({}), {isValid: true, value: {}}, 'should return true for objects');
    assert.equal(any()([]), {isValid: true, value: []}, 'should return true for arrays');

    const fn = (): void => {};
    const result1 = any()(fn);

    assert.equal(result1.isValid, true, 'should return true for functions');
    if (result1.isValid) {

        assert.equal(result1.value, fn, 'should preserve function reference');

    }

    const date = new Date();
    const result2 = any()(date);

    assert.equal(result2.isValid, true, 'should return true for Date objects');
    if (result2.isValid) {

        assert.equal(result2.value, date, 'should preserve Date reference');

    }

});

test('any(): preserves value', (assert) => {

    const obj = {foo: 'bar'};
    const result = any()(obj);

    assert.equal(result.isValid, true, 'should be valid');
    if (result.isValid) {

        assert.equal(result.value, obj, 'should preserve the exact object reference');

    }

});

