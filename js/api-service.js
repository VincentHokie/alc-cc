import { request, populateCountries, getCountries_indexdb } from "./indexdb";
import { populateDropdown, generateCurrencyDropDownHTMLOutput, generateCurrencyDropDownHTMLOutputFromArray } from "./dom-manipulation";
import { plotGraphOne, plotGraphTwo } from "./chartjs-plot";

const axios = require('axios');
const baseUrl = 'https://free.currencyconverterapi.com/api/v5/';

export const getCountries = () => {
    axios.get(`${baseUrl}countries`)
    .then((response) => {
        populateDropdown(generateCurrencyDropDownHTMLOutput(response.data.results));
        populateCountries(request, response.data.results);
    })
    .catch((error) => {
        let data = getCountries_indexdb(request);
        data.onsuccess = (info) => {
            populateDropdown(generateCurrencyDropDownHTMLOutputFromArray(info.target.result));
        }
    });
}

export const makeSingleConversion = (converison_one) => {

    let currencyFromInput = document.getElementById("currency_from_input");
    let initalCurrency = currencyFromInput.value;

    let converison_one_result = document.getElementById("conversion_one_result");
    let exchangeRate = document.getElementById("exchange_rate");
    let dateStart = document.getElementById("dateStart");

    axios.get(`${baseUrl}convert?q=${converison_one}&compact=ultra&date=${dateStart.value}`)
    .then((response) => {
        converison_one_result.innerHTML = initalCurrency*response.data[converison_one][dateStart.value];
        exchangeRate.value = response.data[converison_one][dateStart.value];
    })
    .catch((error) => {
        console.log(error);
        converison_one_result.innerHTML = initalCurrency*response.data[converison_one][dateStart.value];
    });
}

export const makeDoubleConversion = (converison_one, converison_two) => {

    let converison_two_url;
    if (converison_two)
        converison_two_url = `,${converison_two}`

    let currencyFromInput = document.getElementById("double_currency_from_input");
    let initalCurrency = currencyFromInput.value;

    let converison_one_result = document.getElementById("double_conversion_one_result");
    let converison_two_result = document.getElementById("double_conversion_two_result");
    let dateStart = document.getElementById("dateStart");

    let exchangeRateOne = document.getElementById("double_exchange_rate_one");
    let exchangeRateTwo = document.getElementById("double_exchange_rate_two");

    axios.get(`${baseUrl}convert?q=${converison_one}${converison_two ? converison_two_url : "" }&compact=ultra&date=${dateStart.value}`)
    .then((response) => {

        converison_one_result.innerHTML = initalCurrency*response.data[converison_one][dateStart.value];
        converison_two_result.innerHTML = initalCurrency*response.data[converison_two][dateStart.value];

        exchangeRateOne.value = response.data[converison_one][dateStart.value];
        exchangeRateTwo.value = response.data[converison_two][dateStart.value];
    })
    .catch((error) => {
        converison_one_result.innerHTML = initalCurrency*response.data[converison_one][dateStart.value];
        converison_two_result.innerHTML = initalCurrency*response.data[converison_two][dateStart.value];

        exchangeRateOne.value = response.data[converison_one][dateStart.value];
        exchangeRateTwo.value = response.data[converison_one][dateStart.value];
    });
}

let graphHelper = (data, converison_one, converison_two) => {
    let dates = [];
    let datasetOne = [];
    let datasetTwo = [];

    for ([key, value] of Object.entries(data[converison_one])){
        dates.push(key);
        datasetOne.push(value);
    }

    for ([key, value] of Object.entries(data[converison_two]))
        datasetTwo.push(value);

    return [dates, datasetOne, datasetTwo, converison_one, converison_two];

}

export const getHistoricalData = (converison_one, converison_two) => {

    let converison_two_url;
    if (converison_two)
        converison_two_url = `,${converison_two}`

    let dateStart = document.getElementById("dateStart");
    let dateEnd = document.getElementById("dateEnd");

    axios.get(`${baseUrl}convert?q=${converison_one}${converison_two ? converison_two_url : "" }&compact=ultra&date=${dateStart.value}&endDate=${dateEnd.value}`)
    .then((response) => {
        let graphHelperReturn = graphHelper(response.data, converison_one, converison_two);
        plotGraphOne(graphHelperReturn[0], graphHelperReturn[1], graphHelperReturn[3]);
        plotGraphTwo(graphHelperReturn[0], graphHelperReturn[2], graphHelperReturn[4]);
    })
    .catch((error) => {
        alert("Im sorry, something went wrong. If you're offline, this feature does not work offline yet. Stay tuned.")
    });
}