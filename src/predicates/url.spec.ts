import {test} from 'kizu';
import {ValidationError} from '..';
import {url} from './url';

test('pred should return true for valid urls (no localhost)', (assert) => {

    const pred = url();

    assert.equal(pred('http://blah.com'), true, 'http://blah.com');
    assert.equal(pred('https://blah.com'), true, 'https://blah.com');
    assert.equal(pred('http://blah.com/blah'), true, 'http with path');
    assert.equal(pred('https://blah.com/blah'), true, 'https with path');
    assert.equal(pred('http://blah.com/blah?foo=bar&baz=qux#quux'), true, 'http with path, query and hash');
    assert.equal(pred('https://blah.blah.com/blah?foo=bar'), true, 'https with path and query');

});

test('pred should return true for valid urls (localhost allowed)', (assert) => {

    const pred = url({allowLocalhost: true});

    assert.equal(pred('http://blah.com'), true, 'http://blah.com');
    assert.equal(pred('https://blah.com'), true, 'https://blah.com');
    assert.equal(pred('http://blah.com/blah'), true, 'http with path');
    assert.equal(pred('https://blah.com/blah'), true, 'https with path');
    assert.equal(pred('http://blah.com/blah?foo=bar&baz=qux#quux'), true, 'http with path, query and hash');
    assert.equal(pred('https://blah.blah.com/blah?foo=bar'), true, 'https with path and query');
    assert.equal(pred('http://localhost'), true, 'localhost');
    assert.equal(pred('http://localhost/path'), true, 'localhost with path');
    assert.equal(pred('http://localhost/path?foo=bar&baz=qux#quux'), true, 'localhost with path, query and hash');
    assert.equal(pred('http://localhost:3000/path?foo=bar&baz=qux#quux'), true, 'localhost with port, path, query and hash');

});

test('pred should return true for valid urls (protocol optional)', (assert) => {

    const pred = url({requireProtocol: false});

    assert.equal(pred('http://blah.com'), true, 'http://blah.com');
    assert.equal(pred('https://blah.com'), true, 'https://blah.com');
    assert.equal(pred('blah.com'), true, 'domain only');
    assert.equal(pred('blah.com/blah'), true, 'domain with path');
    assert.equal(pred('blah.com/blah?foo=bar&baz=qux#quux'), true, 'domain with path, query and hash');
    assert.equal(pred('blah.blah.com/blah?foo=bar'), true, 'subdomain with path and query');

});

test('pred should return true for valid urls (protocol optional, localhost allowed)', (assert) => {

    const pred = url({allowLocalhost: true, requireProtocol: false});

    assert.equal(pred('http://blah.com'), true, 'http://blah.com');
    assert.equal(pred('https://blah.com'), true, 'https://blah.com');
    assert.equal(pred('blah.com'), true, 'domain only');
    assert.equal(pred('blah.com/blah'), true, 'domain with path');
    assert.equal(pred('blah.com/blah?foo=bar&baz=qux#quux'), true, 'domain with path, query and hash');
    assert.equal(pred('blah.blah.com/blah?foo=bar'), true, 'subdomain with path and query');
    assert.equal(pred('http://localhost'), true, 'localhost with protocol');
    assert.equal(pred('localhost'), true, 'localhost without protocol');
    assert.equal(pred('localhost/path'), true, 'localhost without protocol with path');
    assert.equal(pred('localhost:3000/path?foo=bar&baz=qux#quux'), true, 'localhost without protocol with port, path, query and hash');

});

// eslint-disable-next-line max-lines-per-function
test('pred should throw ValidationError for invalid url', (assert) => {

    const pred = url();
    const expectedErr = new ValidationError({
        root: 'must be a valid URL',
    });

    assert.throws(
        () => pred(42),
        expectedErr,
    );
    assert.throws(
        () => pred('false'),
        expectedErr,
    );
    assert.throws(
        () => pred('localhost'),
        expectedErr,
    );
    assert.throws(
        () => pred('file://blah'),
        expectedErr,
    );
    assert.throws(
        () => pred('http://blah.'),
        expectedErr,
    );
    assert.throws(
        () => pred('http://localhost'),
        expectedErr,
    );
    assert.throws(
        () => pred('localhost:3000'),
        expectedErr,
    );

});

test('pred should throw ValidationError for invalid url (protocol optional)', (assert) => {

    const pred = url({requireProtocol: false});
    const expectedErr = new ValidationError({
        root: 'must be a valid URL',
    });

    assert.throws(
        () => pred(42),
        expectedErr,
    );
    assert.throws(
        () => pred('false'),
        expectedErr,
    );
    assert.throws(
        () => pred('file://blah'),
        expectedErr,
    );
    assert.throws(
        () => pred('blah.'),
        expectedErr,
    );
    assert.throws(
        () => pred('localhost'),
        expectedErr,
    );
    assert.throws(
        () => pred('localhost:3000'),
        expectedErr,
    );

});
