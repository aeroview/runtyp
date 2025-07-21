import {test} from 'kizu';
import {object} from './object';
import {ValidationError} from '..';
import {number} from './number';
import {string} from './string';
import {optional} from './optional';

// eslint-disable-next-line max-lines-per-function
test('pred should return true if all predicates pass', (assert) => {

    // simple
    const pred = object({
        name: string(),
        age: number(),
    });

    assert.equal(pred({
        name: 'John',
        age: 42,
    }), true);

    // nested
    const nestedPred = object({
        name: string(),
        age: number(),
        address: object({
            line1: string(),
            line2: optional(string()),
            city: string(),
            state: string({len: {min: 2, max: 2}}),
            zip: string({len: {min: 5, max: 5}}),
        }),
    });

    assert.equal(nestedPred({
        name: 'John',
        age: 42,
        address: {
            line1: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zip: '62701',
        },
    }), true);

});

test('pred should throw ValidationError with both errors if both fail', (assert) => {

    const pred = object({
        name: string(),
        age: number(),
    });

    assert.throws(
        () => pred({name: 42, age: 'John'}),
        new ValidationError({
            name: 'must be a string',
            age: 'must be a number',
        })
    );

});

test('pred should throw if non-object passed as schema', (assert) => {

    assert.throws(
        // @ts-ignore
        () => object(Math.PI),
        new Error('invalid schema, must be object')
    );

});

test('pred should throw if non-object passed to pred as value', (assert) => {

    const pred = object({
        name: string(),
        age: number(),
    });

    assert.throws(
        () => pred(Math.PI),
        new ValidationError({
            root: 'must be an object with keys name, age',
        })
    );

});

test('nested validation errors should contain key.subkey as key', (assert) => {

    const nestedPred = object({
        name: string(),
        age: number(),
        address: object({
            line1: string(),
            line2: optional(string()),
            city: string(),
            state: string({len: {min: 2, max: 2}}),
            zip: string({len: {min: 5, max: 5}}),
        }),
    });

    assert.throws(
        () => nestedPred({
            name: 'John',
            age: 42,
            address: {
                line1: 5,
                state: 'IL',
                zip: '627041',
            },
        }),
        new ValidationError({
            'address.line1': 'must be a string',
            'address.city': 'must be a string',
            'address.zip': 'must be at most 5 characters',
        })
    );

});

test('should throw if any unknown keys are present', (assert) => {

    const pred = object({
        name: string(),
        age: number(),
    });

    assert.throws(
        () => pred({
            name: 'John',
            age: 42,
            blub: 'gurgle',
        }),
        new ValidationError({
            blub: 'unknown key',
        })
    );

});

test('should not throw if any unknown keys are present and allowUnknownKeys is true', (assert) => {

    const pred = object({
        name: string(),
        age: number(),
    }, {allowUnknownKeys: true});

    assert.equal(
        pred({
            name: 'John',
            age: 42,
            blub: 'gurgle',
        }),
        true
    );

});
