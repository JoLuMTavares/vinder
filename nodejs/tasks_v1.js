/*

    Task 1:

    Create a module countdown.js that counts from 20 to 0.
    Import it to this file and use it.

    Task 2:
    Create a module introduction.js that exports a function
    with one parameter userInfo. UserInfo should consist of
    firstName, lastName, email and birthYear.

    When calling the function "introduction", the module 
    should print out a text like:
        "Hi. My name is FIRSTNAME LASTNAME and my email is
         EMAIL. I was born in BIRTHYEAR".

    Task 3:
    
    Create a module that exports the following class:

        class Person {

            constructor(firstname, lastname, email, yearOfBirth) {
                this.firstname = firstname;
                this.lastname = lastname;
                this.email = email;
                this.yearOfBirth = yearOfBirth;
            }
        }
Create 3 different Persons
*/

// Task 1
var countd = require("./countdown.js").countdown;

countd();


// Task 2
var intro = require("./introduction.js");

intro.introduction({fName: "Joao", lName: "Tavares", email: "joaoluis.tavares@gmail.com", bYear: 1981});

// Task 3
var person = require("./person.js");


p = new person("Joao", "Tavares", "joaoluis.tavares@gmail.com", 1981);
console.log('​First person', p);

p2 = new person("Mary", "Stinger", "mary.thefirst@gmail.com", 1984);
console.log('​Second person', p2);

p3 = new person("Pablo", "Lewis", "pablo.super@gmail.com", 1991);
console.log('Third person', p3);

