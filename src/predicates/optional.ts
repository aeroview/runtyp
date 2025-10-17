import {Pred, ValidationResult} from '..';

export function optional<T>(predicate: Pred<T>): Pred<T|undefined> {

    return (value: any): ValidationResult<T|undefined> => {

        if (value === undefined) return {isValid: true, value: undefined};
        return predicate(value);

    };

}
