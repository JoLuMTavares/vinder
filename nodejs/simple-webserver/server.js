const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");



const app = express();

var port = process.env.port || 3000;

app.use(bodyParser.json());


app.get("/", function (req, res) {
   
    // 1. Object -> 1500
    // 2. String -> HTML
    res.send("<h2>Hallo World</h2>");

});

app.get("/public/:username", function (req, res) {
   
    res.send("You requested the user " + req.params.username);

});

app.post("/user", function (req, res) {

    if (!req.body.username || !req.body.email || !req.body.password)
        return res.send({error : "Missing one of the elements!" + 
        "Username, email and password must be given."});
    
    // 1. Read request
    let newUser = {
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password
    }

    let newUserStr = JSON.stringify(newUser);

/*
    fs.writeFile(__dirname + "/users.json", newUserStr, "utf-8", function (err) {
        
        if(err)
            return res.send({error : err});

        return res.send({message : "User has been saved"});

    });
*/

    // 2. Read file
    fs.readFile(__dirname + "/users.json", function (err, data) {
       
        if (err)
            return res.send({error : err});

            // 3. Parse JSON
            let user = JSON.parse(data);

            // At the beginning: []
            // Later is : [{}, {}, {}, ...]
            let users = [];

            // 4. Push the user into the array
            users.push(user);

            // 5. Stringify the users
            // 6. writeFile
            fs.writeFile(__dirname + "/users.json", JSON.stringify(users), "utf-8",
        
                function () {
                    if (err) 
                        return res.send({ error : err});
                    return res.send({ message : "user has been saved"});
                }
            ); 

    });


    console.log(newUserStr);
    // return res.send({message : "User created"});
    
});


app.get("/user", function (req, res) {

    return res.send({users : []});
    
});


app.listen(port);