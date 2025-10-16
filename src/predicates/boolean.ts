import {Pred, ValidationResult} from '..';

export function boolean(): Pred<boolean> {

    return (value: unknown): ValidationResult<boolean> => {

        if (typeof value !== 'boolean') {

            return {
                isValid: false,
                errors: {root: 'must be a boolean'},
            };

        }

        return {
            isValid: true,
            value: value as boolean,
        };

    };

}
