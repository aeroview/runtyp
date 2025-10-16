/* eslint-disable max-lines-per-function */
import {InferShape, Pred, ValidationResult} from '..';

type ObjectOptions = {
    allowUnknownKeys?: boolean
};

export function object<T extends Record<string, Pred<any>>>(
    schema: T,
    options?: ObjectOptions
): Pred<InferShape<T>> {

    if (typeof schema !== 'object') throw new Error('invalid schema, must be object');

    return (value: unknown): ValidationResult<InferShape<T>> => {

        if (typeof value !== 'object' || !value) {

            return {isValid: false, errors: {root: `must be an object with keys ${Object.keys(schema).join(', ')}`}};

        }

        // go through each key in the schema
        const errors: Record<string, string> = Object.entries(schema)
            .reduce<Record<string, string>>((acc, [key, predicate]) => {

            const result = predicate((value as Record<string, unknown>)[key]);

            if (!result.isValid && Object.keys(result.errors).length === 1 && result.errors.root) {

                // root error
                acc[key] = result.errors.root;

            } else if (!result.isValid) {

                // nested errors
                Object.entries(result.errors).forEach(([subKey, subMessage]) => {

                    acc[`${key}.${subKey}`] = subMessage;

                });

            }

            return acc;

        }, {});

        // go through each key in the value
        if (!options?.allowUnknownKeys) {

            Object.keys(value as Record<string, unknown>).forEach((key) => {

                if (!schema[key]) {

                    errors[key] = 'unknown key';

                }

            });

        }

        if (Object.keys(errors).length > 0) {

            return {
                isValid: false,
                errors,
            };

        }

        return {
            isValid: true,
            value: value as InferShape<T>,
        };

    };

}
