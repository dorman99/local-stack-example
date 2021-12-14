const greeting = (event) => {
    console.log("HELLO FROM HANDLER");
    console.log(event);
    return event;
}

module.exports = {
    greeting
}