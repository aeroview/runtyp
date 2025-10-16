import {Pred, ValidationResult} from '..';

export function number(opts?: {
    range?: {min: number, max: number}
}): Pred<number> {

    return (value: unknown): ValidationResult<number> => {

        if (typeof value !== 'number') {

            return {isValid: false, errors: {root: 'must be a number'}};

        }

        if (opts?.range && (value < opts.range.min || value > opts.range.max)) {

            return {isValid: false, errors: {root: `must be between ${opts.range.min} and ${opts.range.max}`}};

        }

        return {isValid: true, value: value as number};

    };

}
