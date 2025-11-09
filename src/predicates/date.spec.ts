import {test} from 'kizu';
import {date} from './date';

test('date(): valid Date objects', (assert) => {

    const validDate = new Date('2023-01-01');

    assert.equal(date()(validDate), {isValid: true, value: validDate}, 'should return true for valid Date objects');
    assert.equal(date()(new Date()).isValid, true, 'should return true for current date');
    assert.equal(date()(new Date(0)).isValid, true, 'should return true for epoch date');
    const farFuture = new Date('2099-12-31');

    assert.equal(date()(farFuture).isValid, true, 'should return true for far future dates');
    const farPast = new Date('1900-01-01');

    assert.equal(date()(farPast).isValid, true, 'should return true for far past dates');

});

test('date(): invalid input types', (assert) => {

    assert.equal(date()(null), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for null');
    assert.equal(date()(undefined), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for undefined');
    assert.equal(date()({}), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for objects');
    assert.equal(date()([]), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for arrays');
    assert.equal(date()(true), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for booleans');
    assert.equal(date()(() => {}), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for functions');
    assert.equal(date()('2023-01-01'), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for strings by default');
    assert.equal(date()(1672531200000), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for timestamps by default');

});

test('date(): invalid date values', (assert) => {

    const invalidDate = new Date('invalid');

    assert.equal(date()(invalidDate), {isValid: false, errors: {root: 'must be a valid date'}}, 'should return false for invalid Date objects');

});

test('date(): allowString option', (assert) => {

    assert.equal(date({allowString: true})('2023-01-01').isValid, true, 'should return true for valid date strings when allowString is true');
    assert.equal(date({allowString: true})('2023-01-01T12:00:00Z').isValid, true, 'should return true for ISO date strings when allowString is true');
    assert.equal(date({allowString: true})('1970-01-01').isValid, true, 'should return true for epoch date string when allowString is true');
    assert.equal(date({allowString: true})('invalid-date-string'), {isValid: false, errors: {root: 'must be a valid date'}}, 'should return false for invalid date strings');
    assert.equal(date({allowString: true})(1672531200000), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for timestamps when only allowString is true');

});

test('date(): allowTimestamp option', (assert) => {

    assert.equal(date({allowTimestamp: true})(1672531200000).isValid, true, 'should return true for valid timestamps when allowTimestamp is true');
    assert.equal(date({allowTimestamp: true})(0).isValid, true, 'should return true for epoch timestamp when allowTimestamp is true');
    assert.equal(date({allowTimestamp: true})(NaN), {isValid: false, errors: {root: 'must be a valid date'}}, 'should return false for NaN when allowTimestamp is true');
    assert.equal(date({allowTimestamp: true})('2023-01-01'), {isValid: false, errors: {root: 'must be a Date object'}}, 'should return false for strings when only allowTimestamp is true');

});

test('date(): allowString and allowTimestamp options', (assert) => {

    assert.equal(date({allowString: true, allowTimestamp: true})('2023-01-01').isValid, true, 'should return true for date strings when both options are true');
    assert.equal(date({allowString: true, allowTimestamp: true})(1672531200000).isValid, true, 'should return true for timestamps when both options are true');
    const validDate = new Date('2023-01-01');

    assert.equal(date({allowString: true, allowTimestamp: true})(validDate), {isValid: true, value: validDate}, 'should return true for Date objects when both options are true');

});

