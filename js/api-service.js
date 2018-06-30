import { request, populateCountries, getCountries_indexdb, populateConversions, getConversions_indexdb, getDoubleConversions_indexdb } from "./indexdb";
import {
    populateDropdown,
    generateCurrencyDropDownHTMLOutput,
    generateCurrencyDropDownHTMLOutputFromArray,
    populateSingleConversionHTML,
    populateDoubleConversionHTML } from "./dom-manipulation";
import { plotGraphOne, plotGraphTwo } from "./chartjs-plot";
import * as theDom from "./dom-elements";

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

    let initalCurrency = theDom.singleCurrencyFromInput.value;

    axios.get(`${baseUrl}convert?q=${converison_one}&compact=ultra&date=${theDom.dateStart.value}`)
    .then((response) => {
        populateSingleConversionHTML(response.data, initalCurrency, converison_one);
        populateConversions(request, converison_one, response.data[converison_one]);
    })
    .catch((error) => {
        getConversions_indexdb(request, converison_one, initalCurrency);
    });
}

export const makeDoubleConversion = (converison_one, conversion_two) => {

    let converison_two_url;
    if (conversion_two)
        converison_two_url = `,${conversion_two}`

    let initialCurrency = theDom.doubleCurrencyFromInput.value;

    axios.get(`${baseUrl}convert?q=${converison_one}${conversion_two ? converison_two_url : "" }&compact=ultra&date=${theDom.dateStart.value}`)
    .then((response) => {
        populateDoubleConversionHTML(response.data, initialCurrency, converison_one, conversion_two);
        populateConversions(request, converison_one, response.data[converison_one]);
        populateConversions(request, conversion_two, response.data[conversion_two]);

    })
    .catch((error) => {
        getDoubleConversions_indexdb(request, converison_one, conversion_two, initialCurrency);
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

    axios.get(`${baseUrl}convert?q=${converison_one}${converison_two ? converison_two_url : "" }&compact=ultra&date=${theDom.dateStart.value}&endDate=${theDom.dateEnd.value}`)
    .then((response) => {
        let graphHelperReturn = graphHelper(response.data, converison_one, converison_two);
        plotGraphOne(graphHelperReturn[0], graphHelperReturn[1], graphHelperReturn[3]);
        plotGraphTwo(graphHelperReturn[0], graphHelperReturn[2], graphHelperReturn[4]);
    })
    .catch((error) => {
        alert("Im sorry, something went wrong. If you're offline, this feature does not work offline yet. Stay tuned.")
    });
}