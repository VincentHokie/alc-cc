import * as theDom from "./dom-elements";

const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ ;
const dateRegexTwo = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/ ;

const minFromValue = "0";

let dateFormatValidation = (date) => {
    if(dateRegex.test(date) || dateRegexTwo.test(date)){
        if(dateRegexTwo.test(date)){
            let parts = date.split('-');
            return new Date(parts[0], parts[1] - 1, parts[2])
        }

        let parts = date.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0])
    }
    
    return false;
}

let dateRangeValidation = (date, endDate) => {

    let diff = Math.abs(date.getTime() - endDate.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if(diffDays > 8) 
        return false;

    return true;

}

let dateHistoryValidation = (date) => {

    let myDate = new Date();

    if(
        (date.getFullYear() < myDate.getFullYear() && date.getFullYear() == (myDate.getFullYear() - 1) &&  date.getMonth() == myDate.getMonth() && date.getDate() == myDate.getDate()) ||
        (date.getFullYear() == myDate.getFullYear() &&  date.getMonth() <= myDate.getMonth() && date.getDate() <= myDate.getDate())
    )
        return true;
        
    return false;

}

export const conversionDateValidation = (date) => {
    let validDate = dateFormatValidation(date);
    let valid = true;

    if(!validDate){
        theDom.dateError.innerHTML = "The date needs to be of the format dd/mm/yyyy";
        valid = false;
    }
    
    if(!dateHistoryValidation(validDate)){
        theDom.dateError.innerHTML = "The date cannot be older than a year or in the future";
        valid = false;
    }

    if(valid)
        theDom.dateError.innerHTML = "";

    return valid;
}


export const historyDateValidation = (date, endDate) => {
    let validDate = dateFormatValidation(date);
    let validDateTwo = dateFormatValidation(endDate);

    let valid = true;

    if(validDate > validDateTwo){
        theDom.dateError.innerHTML = "'Date' must be before 'Date End'.";
        valid = false;
    }

    if(!validDate || !validDateTwo){
        theDom.dateError.innerHTML = "Both the dates need to be of the format dd/mm/yyyy.";
        valid = false;
    }
    
    if(!dateRangeValidation(validDate, validDateTwo)){
        theDom.dateError.innerHTML += " The date range can't be more than 8 days apart";
        valid = false;
    }

    if(valid)
        theDom.dateError.innerHTML = "";

    return valid;
}