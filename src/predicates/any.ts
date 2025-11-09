import {Pred, ValidationResult} from '..';

export function any(): Pred<any> {

    return (value: unknown): ValidationResult<any> => ({
        isValid: true,
        value,
    });

}

