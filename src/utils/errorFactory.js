import { join, lowerCase } from "lodash";
export const errorBuilder = (errorSet,properity , isUnSensetiveCase = true) => {
    if (errorSet) {
        if (!properity)
            return '';
        let pureErrorsResult = {};
        for (let [key, value] of Object.entries(errorSet)) {
            let _key = key;
            if (isUnSensetiveCase) {
                _key = lowerCase(_key);
            } 
            pureErrorsResult[_key] = join(value, ',');
        }
        const propStatus = isUnSensetiveCase ? lowerCase(properity) : properity;
        return pureErrorsResult[propStatus] ?? '';
    }
    return '';
}