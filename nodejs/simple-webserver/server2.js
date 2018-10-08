const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

var port = process.env.port || 3000;

app.use(bodyParser.json());

// Redirection. Better than writing all the options for all files
app.use("/", express.static(__dirname + "/public"));

app.get("/search", function (req, res) {
    if (req.query.q)
        return res.send({"The value of q is" : req.query.q})
    return res.send({error : "No q was given."});
});

/*
NOT NEEDED ANYMORE
app.get("/index.html", function (req, res) {
   
    // 1. Object -> 1500
    // 2. String -> HTML
    fs.readFile(__dirname + "/public/index.html", "utf-8", function (err, data) {
       return res.send(data); 
    });
});

app.get("/jquery.js", function (req, res) {
   
    fs.readFile(__dirname + "/public/jquery.js", "utf-8", function (err, data) {
        return res.send(data); 
    });

});
*/

app.listen(port);