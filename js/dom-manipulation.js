import * as theDom from "./dom-elements";

export const populateDropdown = (htmlOutput) => {
    theDom.currencyFrom.innerHTML = htmlOutput;
    theDom.currencyTo.innerHTML = htmlOutput;
    theDom.doubleCurrencyFrom.innerHTML = htmlOutput;
    theDom.doubleCurrencyToOne.innerHTML = htmlOutput;
    theDom.doubleCurrencyToTwo.innerHTML = htmlOutput;

    theDom.historyCurrencyFromOne.innerHTML = htmlOutput;
    theDom.historyCurrencyFromTwo.innerHTML = htmlOutput;
    theDom.historyCurrencyToOne.innerHTML = htmlOutput;
    theDom.historyCurrencyToOne.innerHTML = htmlOutput;
}

export const generateCurrencyDropDownHTMLOutput = (currency) => {
    let options = '';
    for (let [key, value] of Object.entries(currency))
        options += `<option value='${value.currencyId}'>${value.currencyName}</option>`;
    return options;
}

export const generateCurrencyDropDownHTMLOutputFromArray = (currency) => {
    let options = '';
    for (let cur of currency)
        options += `<option value='${cur.currencyId}'>${cur.currencyName}</option>`;
    return options;
}
