const bcrypt = require("bcrypt");

let password = "halloworld";

// Sign up
bcrypt.hash(password, 10, function (err, hashedPassword) {
   console.log('Hashed password: ' + hashedPassword); 

   // Login
   bcrypt.compare('halloworld', password, hashedPassword, function (err, result) {
     if (result)
        console.log("Passwords match.");
     else
        console.log("Passwords don't match.");
   });

});

