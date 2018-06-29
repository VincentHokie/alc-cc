/*
    All the interactions that concern the indexDB come from and are
    written in this file
*/

const hash = require('object-hash');
const DB_VERSION = 1;
const DB_NAME = "currency_converter";
export const request = indexedDB.open(DB_NAME, DB_VERSION);

/*
    Check if indexDB is supported, if not
    exit from the script/ give the user a useful message
*/
if (!window.indexedDB)
    window.alert("Your browser doesn't support a stable version of IndexedDB. The site will therefore not be available offline :(");

/*
    Generic error handler for all errors targeted at this database's
    requests!
*/
request.onerror = (event) => {
    alert("Database error: " + event.target.errorCode);
};

/*
    when the version number is updated, the `request.onupgradeneeded`
     function will be triggered and a new action could be run
     under the switch statement
*/
export const indexDBSetup = (request) => {

    request.onupgradeneeded = (event) => {
        let db = event.target.result;
        
        switch(expression) {
            case 1: {
                db.createObjectStore("countries", { keyPath: "currencyId" });
                db.createObjectStore("metadata", {});
            }
            break;
        }
    };
}

/*
    update the countries (ideally) in the case when the hash of all
    the countries retrieved is different. The hash is stored in indexDB
    under a different object store.
*/
let updateCountries = (countries, countryObjectStore) => {
    // Store values in the newly created objectStore.
    for (let [key, value] of Object.entries(countries)){
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

    let countryObjectStore = db
        .transaction("countries", "readwrite")
        .objectStore("countries");

    let theHash = metaObjectStore
        .get('countries_hash');

    // toDo: if the hash of the countries are the same, do not
    // update the DB, the values will be exactly the same
    theHash.onsuccess = () => {
        if (theHash.result == hash(countries))
            return true;
    };

    updateCountries(countries, countryObjectStore);

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
