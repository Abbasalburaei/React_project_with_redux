import { includes } from "lodash";
import {useTranslation} from "react-i18next";
export function GetMessages(){
    const { t: trans } = useTranslation(['errors']);
    const messages = {
    "any.required":trans("errors:field_required"),    
        "string.base": trans("errors:type_input_field"),
        "string.email": trans("errors:email_input_field"),
        "string.empty": trans("errors:empty_field"),
        "string.min": trans("errors:min_input_field"),
        "string.max": trans("errors:max_input_field"),
        "string.pattern.base": trans("errors:flag_input_field"),
        "object.base": trans("errors:file_input_field"),
        "binary.max": trans("errors:file_max_input_field"),
        "date.base": trans("errors:date_input_field"),
        "any.only": trans("errors:password-not-matched"),
        "number.base": trans("errors:number_input_field"),
        "number.positive": trans("errors:number_pos_input_field"),
        "number.min": trans("errors:number_min_input_field"),
        "number.max": trans("errors:number_max_input_field"),
        "string.length": trans("errors:flag_length_field")
    }
    return messages;
}
export function formValidate(schema,data){  
const {error,value} =   schema.validate(data,{abortEarly:false});
if(!error) return null;
const errors ={};
for(let item of error.details){
    if(item.type != 'object.unknown')
        errors[item.path[0]] = item.message;
}
return errors;
}

export const GetMessage = (resource , key) => {
    const { t: trans } = useTranslation([resource]);
    return trans(`${resource}:${key}`);
}


export function validateProperty({name,value},schema){
const obj = {[name]:value};
const {error} = schema.validate(obj,{abortEarly:false});
return error ? error.details[0].message : null;
}

export const removeUnspecificError = (errorList, values = []) => {
    let errorResult = {};
    const lowerValues = values.map(item => {
        return item.toLowerCase()
    });
    Object.assign(errorResult, errorList);
    if (errorList) {
        for (let index = 0; index < Object.keys(errorList).length; index++) {
            const key = Object.keys(errorList)[index];
            if (includes(lowerValues, key.toLowerCase())) {
                continue;
            } else {
                delete errorResult[key];
            }
        }
    }
    return errorResult;
};


export const checkFileExtension = (extensions = [], fileName) => {

    return includes(extensions, fileName.split('.').pop().toLowerCase());
}