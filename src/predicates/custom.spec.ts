import {test} from 'kizu';
import {custom} from './custom';

test('custom(): valid inputs', (assert) => {

    assert.equal(custom(() => true, 'always true')(true), {isValid: true, value: true}, 'should return true when predicate returns true');
    assert.equal(custom(() => true, 'always true')(42).isValid, true, 'should return true when predicate returns true');
    assert.equal(custom(() => true, 'always true')('string').isValid, true, 'should return true when predicate returns true');

});

test('custom(): validation errors', (assert) => {

    assert.equal(custom(() => false, 'always false')('whatever'), {isValid: false, errors: {root: 'always false'}}, 'should return false with custom error message');
    assert.equal(custom(() => false, 'custom error')(42), {isValid: false, errors: {root: 'custom error'}}, 'should return false with custom error message');
    assert.equal(custom(() => false, 'validation failed')(null), {isValid: false, errors: {root: 'validation failed'}}, 'should return false with custom error message');

});

test('custom(): edge cases', (assert) => {

    assert.equal(custom((val) => val === 0, 'must be zero')(0), {isValid: true, value: 0}, 'should return true for zero when predicate checks for zero');
    assert.equal(custom((val) => val === 0, 'must be zero')(1), {isValid: false, errors: {root: 'must be zero'}}, 'should return false for non-zero when predicate checks for zero');
    assert.equal(custom((val) => Array.isArray(val), 'must be array')([]).isValid, true, 'should return true for arrays when predicate checks for arrays');
    assert.equal(custom((val) => Array.isArray(val), 'must be array')({}), {isValid: false, errors: {root: 'must be array'}}, 'should return false for objects when predicate checks for arrays');

});
