import {test} from 'kizu';
import {predicates as p, Infer} from '.';

test('test Infer type and type gaurd functionality', (assert) => {

    /**
     * The following would throw TypeScript errors if the type gaurd and
     * Infer type are not working correctly.
     */

    const predicate = p.object({
        name: p.string(),
        age: p.number(),
    });

    type T = Infer<typeof predicate>;
    type ExpectedType = {
        name: string
        age: number
    };

    const input: T = {
        name: 'John',
        age: 30,
    };

    if (predicate(input)) {

        const foo: ExpectedType = input;

        assert.equal(foo, input);

    }

});
