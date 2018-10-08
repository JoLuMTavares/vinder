function sayHallo() {
    console.log("Hallo");
}

function sayWorld() {
    console.log("World");
}

module.exports = {
    sayHallo = sayHallo,
    sayWorld = sayWorld
}