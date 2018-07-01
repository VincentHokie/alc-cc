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
    theDom.historyCurrencyToTwo.innerHTML = htmlOutput;

    theDom.singleGif.style.display = "none";
    theDom.doubleGif.style.display = "none";
    theDom.historyGif.style.display = "none";
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

export const populateSingleConversionHTML = (data, initalCurrency, converison_one) => {
    let exRate = data[converison_one][theDom.dateStart.value];
    theDom.singleExchangeRate.value = exRate;
    theDom.singleConverisonOneResult.value = initalCurrency*exRate;
    theDom.singleGif.style.display = "none";
}

export const populateDoubleConversionHTML = (data, initalCurrency, converison_one, converison_two) => {

    //ensure we dont always try to get todays conversion rate, this may throw an error
    // if the conversion rate is from yesterday or before
    
    let exRateOne = data[converison_one][theDom.dateStart.value];
    let exRateTwo = data[converison_two][theDom.dateStart.value];

    theDom.doubleConverisonOneResult.value = initalCurrency*exRateOne;
    theDom.doubleConverisonTwoResult.value = initalCurrency*exRateTwo;

    theDom.doubleExchangeRateOne.value = exRateOne;
    theDom.doubleExchangeRateTwo.value = exRateTwo;
    theDom.doubleGif.style.display = "none";
}
