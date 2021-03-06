import { getCountries } from "./api-service";
import { populateSingleConversionHTML, populateDoubleConversionHTML } from "./dom-manipulation";
import iziToast from "izitoast";
import * as theDom from "./dom-elements";

/*
    All the interactions that concern the indexDB come from and are
    written in this file
*/
let showError = (message) => {
    iziToast.error({
        title: 'Error',
        message: message,
        timeout: 10000,
    });
}

let showWarning = (message) => {
    iziToast.warning({
        title: 'FYI',
        message: message,
        timeout: 10000,
    });
}

/*
    Ensure we're testing every major browser
    i.e Chrome, Mozilla, Safari, IE
*/
window._indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

/*
    Check if indexDB is supported, if not
    exit from the script/ give the user a useful message
*/
if (!window._indexedDB)
    showError("Your browser doesn't support a stable version of IndexedDB. The site will therefore not be available offline :(");


const hash = require('object-hash');
const DB_VERSION = 1;
const DB_NAME = "currency_converter";
export const request = _indexedDB.open(DB_NAME, DB_VERSION);


/*
    Generic error handler for all errors targeted at this database's
    requests!
*/
request.onerror = (event) => {
    showError(`Database error: ${event.target.errorCode}`);
};

/*
    when the version number is updated, the `request.onupgradeneeded`
     function will be triggered and a new action could be run
     under the switch statement
*/
export const indexDBSetup = (request) => {
    
    request.onupgradeneeded = (event) => {
        let db = event.target.result;
        
        switch(DB_VERSION) {
            case 1: {
                db.createObjectStore("countries", { keyPath: "currencyId" });
                db.createObjectStore("conversions", {});
                db.createObjectStore("metadata", {});
            }
            break;
        }
    };

    getCountries();
}

/*
    update the countries (ideally) in the case when the hash of all
    the countries retrieved is different. The hash is stored in indexDB
    under a different object store.
*/
let updateCountries = (countries, db, metaObjectStore) => {

    let countryObjectStore = db
        .transaction("countries", "readwrite")
        .objectStore("countries");

    // Store values in the newly created objectStore.
    for (let [key, value] of Object.entries(countries)){
        console.log(value)
        countryObjectStore.put(value);
    }

    metaObjectStore.put(hash(countries), "countries_hash");
}


/*
    add the countries from the network into indexDB
    for use when in offline mode
*/
export const populateCountries = (request, countries) => {

    let db = request.result;

    let metaObjectStore = db
        .transaction("metadata", "readwrite")
        .objectStore("metadata");

    let theHash = metaObjectStore
        .get('countries_hash');

    // toDo: if the hash of the countries are the same, do not
    // update the DB, the values will be exactly the same
    theHash.onsuccess = (event) => {
        if(!theHash.result || theHash.result != hash(countries))
            updateCountries(countries, db, metaObjectStore);
    };
 
}


/*
    add the conversions from the network into indexDB
    for use when in offline mode
*/
export const populateConversions = (request, conversion, info) => {

    let db = request.result;

    let conversionsObjectStore = db
        .transaction("conversions", "readwrite")
        .objectStore("conversions");

    conversionsObjectStore.put(info, conversion);

 
}


/*
    used to get countries from indexDB in the case
    the request on the network fails for some reason
*/
export const getCountries_indexdb = (request) => {
    
    let db = request.result;
    return db
        .transaction("countries", "readwrite")
        .objectStore("countries")
        .getAll();

}

/*
    used to get conversion from indexDB in the case
    the request on the network fails for some reason
*/
export const getConversions_indexdb = (request, conversion, initialCurrency) => {
    
    let db = request.result;

    let conversionsObjectStore = db
        .transaction("conversions", "readwrite")
        .objectStore("conversions");
        
    let theRateObject = conversionsObjectStore
        .get(conversion);

    theRateObject.onsuccess = () => {
        if(!theRateObject.result){
            showError("We don't have this conversion offline. Apologies");
            return ;
        }
        
        showWarning("This conversion has been done offline, it may not be up-to-date.");
        showWarning("Ensure you are connected to a network for the latest exgange rates!");
        let object = {}
        object[conversion] = theRateObject.result;
        populateSingleConversionHTML(object, initialCurrency, conversion);

    }

}

export const getDoubleConversions_indexdb = (request, conversion, conversion_two, initialCurrency) => {
    
    let db = request.result;

    let conversionsObjectStore = db
        .transaction("conversions", "readwrite")
        .objectStore("conversions");
        
    let theRateObjectOne = conversionsObjectStore
        .get(conversion);
    
    let theRateObjectTwo = conversionsObjectStore
        .get(conversion_two);
    
    let conversions = {};

    theRateObjectOne.onsuccess = () => {
        if(!theRateObjectOne.result){
            showError("We don't have this conversion offline. Apologies");
            return ;
        }

        conversions[conversion] = theRateObjectOne.result;
    }

    theRateObjectTwo.onsuccess = () => {
        if(!theRateObjectTwo.result){
            showError("We don't have this conversion offline. Apologies");
            return ;
        }

        conversions[conversion_two] = theRateObjectTwo.result;
    }

    /* 
        Try and apply the conversion every second for 5
        seconds, if one or all of the the conversions dont exist
        in the dictionary, then we don't have both offline and we stop the check
    */
    let count = 0;
    let conversionInterval = setInterval(() => {
        count++;

        if(conversions[conversion] && conversions[conversion_two]){

            showWarning("This conversion has been done offline, it may not be up-to-date.");
            showWarning("Ensure you are connected to a network for the latest exgange rates!");

            populateDoubleConversionHTML(conversions ,initialCurrency, conversion, conversion_two);
            clearInterval(conversionInterval);
        }

        if(count == 3){
            showError("One or both of your conversions don't appear to be offline");
            theDom.doubleGif.style.display = "none";
            clearInterval(conversionInterval);
        }
        
    }, 1000);

}
