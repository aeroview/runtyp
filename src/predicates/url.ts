import {Pred, ValidationError} from '..';

const regexWithoutLocalhost = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?(#\S*)?$/;
const regexWithoutLocalhostOptional = /^((http|https):\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?(#\S*)?$/;
const regexWithLocalhost = /^(http|https):\/\/((([\w-]+\.)+[\w-]+)|(localhost))(:\d+)?(\/[\w-./?%&=]*)?(#\S*)?$/;
const regexWithLocalhostOptional = /^((http|https):\/\/)?(((?:[\w-]+\.)+[\w-]+)|(localhost))(:\d+)?(\/[\w-./?%&=]*)?(#\S*)?$/;

export function url(options?: {
    allowLocalhost?: boolean
    requireProtocol?: boolean
}): Pred<string> {

    return (value: unknown): value is string => {

        if (typeof value !== 'string') {

            throw new ValidationError({root: 'must be a valid URL'});

        }

        const requireProtocol = options?.requireProtocol ?? true;
        const allowLocalhost = options?.allowLocalhost ?? false;

        let tester: RegExp;

        if (allowLocalhost) {

            tester = requireProtocol ? regexWithLocalhost : regexWithLocalhostOptional;

        } else {

            tester = requireProtocol ? regexWithoutLocalhost : regexWithoutLocalhostOptional;

        }

        if (tester.test(value)) {

            return true;

        } else {

            throw new ValidationError({root: 'must be a valid URL'});

        }

    };

}
