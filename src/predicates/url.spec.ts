import {test} from 'kizu';
import {url} from './url';

test('url(): valid inputs - no localhost', (assert) => {

    const pred = url();

    assert.equal(pred('http://blah.com'), {isValid: true, value: 'http://blah.com'}, 'should return true for http URLs');
    assert.equal(pred('https://blah.com'), {isValid: true, value: 'https://blah.com'}, 'should return true for https URLs');
    assert.equal(pred('http://blah.com/blah').isValid, true, 'should return true for http with path');
    assert.equal(pred('https://blah.com/blah').isValid, true, 'should return true for https with path');
    assert.equal(pred('http://blah.com/blah?foo=bar&baz=qux#quux').isValid, true, 'should return true for http with path, query and hash');
    assert.equal(pred('https://blah.blah.com/blah?foo=bar').isValid, true, 'should return true for https with path and query');

});

test('url(): valid inputs - localhost allowed', (assert) => {

    const pred = url({allowLocalhost: true});

    assert.equal(pred('http://blah.com').isValid, true, 'should return true for http URLs');
    assert.equal(pred('https://blah.com').isValid, true, 'should return true for https URLs');
    assert.equal(pred('http://blah.com/blah').isValid, true, 'should return true for http with path');
    assert.equal(pred('https://blah.com/blah').isValid, true, 'should return true for https with path');
    assert.equal(pred('http://blah.com/blah?foo=bar&baz=qux#quux').isValid, true, 'should return true for http with path, query and hash');
    assert.equal(pred('https://blah.blah.com/blah?foo=bar').isValid, true, 'should return true for https with path and query');
    assert.equal(pred('http://localhost').isValid, true, 'should return true for localhost');
    assert.equal(pred('http://localhost/path').isValid, true, 'should return true for localhost with path');
    assert.equal(pred('http://localhost/path?foo=bar&baz=qux#quux').isValid, true, 'should return true for localhost with path, query and hash');
    assert.equal(pred('http://localhost:3000/path?foo=bar&baz=qux#quux').isValid, true, 'should return true for localhost with port, path, query and hash');

});

test('url(): valid inputs - protocol optional', (assert) => {

    const pred = url({requireProtocol: false});

    assert.equal(pred('http://blah.com').isValid, true, 'should return true for http URLs');
    assert.equal(pred('https://blah.com').isValid, true, 'should return true for https URLs');
    assert.equal(pred('blah.com').isValid, true, 'should return true for domain only');
    assert.equal(pred('blah.com/blah').isValid, true, 'should return true for domain with path');
    assert.equal(pred('blah.com/blah?foo=bar&baz=qux#quux').isValid, true, 'should return true for domain with path, query and hash');
    assert.equal(pred('blah.blah.com/blah?foo=bar').isValid, true, 'should return true for subdomain with path and query');

});

test('url(): valid inputs - protocol optional, localhost allowed', (assert) => {

    const pred = url({allowLocalhost: true, requireProtocol: false});

    assert.equal(pred('http://blah.com').isValid, true, 'should return true for http URLs');
    assert.equal(pred('https://blah.com').isValid, true, 'should return true for https URLs');
    assert.equal(pred('blah.com').isValid, true, 'should return true for domain only');
    assert.equal(pred('blah.com/blah').isValid, true, 'should return true for domain with path');
    assert.equal(pred('blah.com/blah?foo=bar&baz=qux#quux').isValid, true, 'should return true for domain with path, query and hash');
    assert.equal(pred('blah.blah.com/blah?foo=bar').isValid, true, 'should return true for subdomain with path and query');
    assert.equal(pred('http://localhost').isValid, true, 'should return true for localhost with protocol');
    assert.equal(pred('localhost').isValid, true, 'should return true for localhost without protocol');
    assert.equal(pred('localhost/path').isValid, true, 'should return true for localhost without protocol with path');
    assert.equal(pred('localhost:3000/path?foo=bar&baz=qux#quux').isValid, true, 'should return true for localhost without protocol with port, path, query and hash');

});

test('url(): invalid input types', (assert) => {

    const pred = url();

    assert.equal(pred(42), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for numbers');
    assert.equal(pred(true), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for booleans');
    assert.equal(pred(null), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for null');
    assert.equal(pred(undefined), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for undefined');
    assert.equal(pred({}), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for objects');
    assert.equal(pred([]), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for arrays');

});

test('url(): invalid URL formats - no localhost', (assert) => {

    const pred = url();

    assert.equal(pred('false'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for invalid strings');
    assert.equal(pred('localhost'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for localhost without protocol');
    assert.equal(pred('file://blah'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for file protocol');
    assert.equal(pred('http://blah.'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for invalid domain');
    assert.equal(pred('http://localhost'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for localhost when not allowed');
    assert.equal(pred('localhost:3000'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for localhost with port when not allowed');

});

test('url(): invalid URL formats - protocol optional', (assert) => {

    const pred = url({requireProtocol: false});

    assert.equal(pred('false'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for invalid strings');
    assert.equal(pred('file://blah'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for file protocol');
    assert.equal(pred('blah.'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for invalid domain');
    assert.equal(pred('localhost'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for localhost when not allowed');
    assert.equal(pred('localhost:3000'), {isValid: false, errors: {root: 'must be a valid URL'}}, 'should return false for localhost with port when not allowed');

});

test('url(): edge cases', (assert) => {

    const pred = url();

    assert.equal(pred('').isValid, false, 'should return false for empty strings');
    assert.equal(pred(' ').isValid, false, 'should return false for whitespace');
    assert.equal(pred('http://').isValid, false, 'should return false for incomplete URLs');
    assert.equal(pred('https://').isValid, false, 'should return false for incomplete URLs');

});
