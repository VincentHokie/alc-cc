
export const plotGraphOne = (dates, datasetOne, converison_one) => {

    let config = {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: converison_one.replace("_", " vs "),
                backgroundColor: "#851e3e",
                borderColor: "#851e3e",
                data: datasetOne,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Exchange rate 8 day history'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Exchange Rate'
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById('canvas_one').getContext('2d');
    window.myLine = new Chart(ctx, config);

}


export const plotGraphTwo = (dates, datasetTwo, converison_two) => {

    let config = {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: converison_two.replace("_", " vs "),
                fill: false,
                backgroundColor: "#051e3e",
                borderColor: "#051e3e",
                data: datasetTwo,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Exchange rate 8 day history'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Exchange Rate'
                    }
                }]
            }
        }
    };

    let ctx = document.getElementById('canvas_two').getContext('2d');
    window.myLine = new Chart(ctx, config);

}
