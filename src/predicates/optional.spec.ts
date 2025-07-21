import {test} from 'kizu';
import {optional} from './optional';
import {string} from './string';
import {object} from './object';
import {Infer} from '..';

test('pred should make wrapped pred optional', (assert) => {

    const pred = optional(string());

    assert.equal(pred('hi'), true, 'returns true for valid string');
    assert.equal(pred(undefined), true, 'returns true for undefined');

    // let's test the type inference

    const validator = object({
        name: string(),
        age: optional(string()), // age is optional
    });

    type T = Infer<typeof validator>;

    function doStuff(input: T): void {

        input; // input is of type {name: string, age?: string}

    }

    doStuff({name: 'John', age: '30'}); // valid
    doStuff({name: 'John'}); // valid

});
