let anchorFooter = () => {
    let height = window.innerHeight;
    document
        .getElementById("center-body")
        .style
        .minHeight = `${height-140}px`;
}

let occupyFullHeight = () => {
    let height = window.innerHeight;
    document
        .getElementById("app")
        .style
        .minHeight = `${height}px`;
    document
        .getElementsByTagName("body")[0]
        .style
        .minHeight = `${height}px`;
}

export const screenSetup = () => {
    anchorFooter();
    occupyFullHeight();
}