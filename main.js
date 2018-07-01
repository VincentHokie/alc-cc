import { screenSetup } from "./js/screen-setup";
import { makeSingleConversion, makeDoubleConversion, getHistoricalData } from "./js/api-service";
import { request, indexDBSetup } from "./js/indexdb";
import * as theDom from "./js/dom-elements";

window.onload = () => {

    // show the single converter first always
    theDom.singleContainer.style.display = "block";
    theDom.dateEndContainer.style.display = "none";
    theDom.singleMenu.classList.toggle("selected");
    theDom.dateStart.valueAsDate = new Date();

}

/*
    menu manupulation to create a SPA feel
*/

let hideAllContainers = () => {
    for (const contain of theDom.spaContainers)
        contain.style.display = "none";
}

let toggleSelectedMenu = (removed, added) => {
    removed[0].classList.toggle("selected");
    added.classList.toggle("selected");
}

theDom.singleMenu.addEventListener("click", () => {
    hideAllContainers();
    theDom.singleContainer.style.display = "block";
    theDom.dateEndContainer.style.display = "none";

    toggleSelectedMenu(document.getElementsByClassName("selected"), theDom.singleMenu);
});

theDom.doubleMenu.addEventListener("click", () => {
    hideAllContainers();
    theDom.doubleContainer.style.display = "block";
    theDom.dateEndContainer.style.display = "none";

    toggleSelectedMenu(document.getElementsByClassName("selected"), theDom.doubleMenu);
});

theDom.historyMenu.addEventListener("click", () => {
    hideAllContainers();
    theDom.historyContainer.style.display = "block";
    theDom.dateEndContainer.style.display = "inline-block";

    toggleSelectedMenu(document.getElementsByClassName("selected"), theDom.historyMenu);
});




if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}

screenSetup();
indexDBSetup(request);

/*
    Handle the api interactions on button clicks
*/
theDom.singleConversion.addEventListener("click", () => {
    let curFrom = theDom.currencyFrom[theDom.currencyFrom.selectedIndex].value;
    let currTo = theDom.currencyTo[theDom.currencyTo.selectedIndex].value;
    makeSingleConversion(`${curFrom}_${currTo}`)
});

theDom.doubleConversion.addEventListener("click", () => {

    let curFrom = theDom.doubleCurrencyFrom[theDom.doubleCurrencyFrom.selectedIndex].value;
    let currToOne = theDom.doubleCurrencyToOne[theDom.doubleCurrencyToOne.selectedIndex].value;
    let currToTwo = theDom.doubleCurrencyToTwo[theDom.doubleCurrencyToTwo.selectedIndex].value;
    makeDoubleConversion(`${curFrom}_${currToOne}`, `${curFrom}_${currToTwo}`)
});


history_graph.addEventListener("click", () => {

    let curFromOne = theDom.historyCurrencyFromOne[theDom.historyCurrencyFromOne.selectedIndex].value;
    let curFromTwo = theDom.historyCurrencyFromTwo[theDom.historyCurrencyFromTwo.selectedIndex].value;
    let currToOne = theDom.historyCurrencyToOne[theDom.historyCurrencyToOne.selectedIndex].value;
    let currToTwo = theDom.historyCurrencyToTwo[theDom.historyCurrencyToTwo.selectedIndex].value;

    getHistoricalData(`${curFromOne}_${currToOne}`, `${curFromTwo}_${currToTwo}`);
});
