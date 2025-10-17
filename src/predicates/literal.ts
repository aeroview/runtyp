import {Pred, ValidationResult} from '..';

export function literal<T extends any>(expected: T): Pred<T> {

    return (value: unknown): ValidationResult<T> => {

        if (value !== expected) {

            return {
                isValid: false,
                errors: {root: `must be ${expected}`},
            };

        }

        return {
            isValid: true,
            value: value as T,
        };

    };

}
