import {test} from 'kizu';
import {ValidationError} from '..';
import {enumValue} from './enumValue';

enum TestEnum {
    Foo = 'foo',
    Bar = 'bar',
    Baz = 'baz'
}
const expectedErr = new ValidationError({
    root: 'must be a valid enum value',
});

test('pred should return true if value is a valid value of the enum', (assert) => {

    const pred = enumValue(TestEnum);

    assert.equal(pred('foo'), true, 'foo');
    assert.equal(pred('bar'), true, 'bar');
    assert.equal(pred('baz'), true, 'baz');

});

test('pred should throw ValidationError for invalid value', (assert) => {

    const pred = enumValue(TestEnum);

    assert.throws(() => pred('gak'), expectedErr, 'gak');
    assert.throws(() => pred('blah'), expectedErr, 'blah');

});

