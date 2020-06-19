import { StringMap } from '../../devices/models/stringMap';

export const getDuplicateNames = (models: StringMap<{ name: string}>): Set<string> => {
    const duplicateNames: Set<string> = new Set<string>();
    const allNames: Set<string> = new Set<string>();

    Object.keys(models).forEach(key => {
        if (!models[key].name) {
            return;
        }

        if (allNames.has(models[key].name)) {
            duplicateNames.add(models[key].name);
        } else {
            allNames.add(models[key].name);
        }
    });

    return duplicateNames;
};

const dictionaryEntryRegex = new RegExp(`^[A-Za-z0-9\-:+%_*?!(),=@;']{0,128}$`);
export const validDictionaryEntry = (value: string): boolean => {
    return dictionaryEntryRegex.test(value);
};

const twinPathEntryRegex = new RegExp(`^[A-Za-z0-9\-:+%_*?!().,=@;^']{0,128}$`);
export const validTwinPathEntry = (value: string): boolean => {
    return twinPathEntryRegex.test(value);
};

export const hasEmptyPathSegment = (value: string): boolean => {
    return value.match(/([.])\1/) ? true : false;
};

const integerEntryRegex = new RegExp(`^[0-9]+$`);
export const isInteger = (value: string): boolean => {
    return integerEntryRegex.test(value);
};

export const setHasValidationErrors = (set: Array<{ key: string}>, errors: StringMap<string | undefined>): boolean => {
    for (const entry of set) {
        if (errors[entry.key]) {
            return true;
        }
    }

    return false;
};
