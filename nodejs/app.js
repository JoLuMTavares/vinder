var greet1 = require("./greet1.js");

function test() {
    console.log("Just another test...");
}

test();

greet1();

var greet2 = require("./greet2.js");

greet2.greet(); // It must be called this way. Otherwise the function is not recognized

// Now a direct assignment of the function located on the other file

var greet2b = require("./greet2.js").greet;

greet2b();

var greet3 = require("./greet3.js");

var g3 = new greet3();

var greet4 = require("./greet4.js");

greet4.sayHallo();
greet4.sayWorld();

