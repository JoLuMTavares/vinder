var fs = require("fs");

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var port = process.env.port || 3000;

var urlEncodedParser = bodyParser.urlencoded({extended : false});

var jsonParser = bodyParser.json();

app.use("/assets", express.static(__dirname+"/public"));

app.set("view engine", "ejs");

app.use("/", function (req, res, next) {
    
    console.log("Request Url: " + req.url);
    next();

});

app.get("/", function (req, res) {
    
    res.render("index");

});

app.get("/api", function (req, res) {

    res.json({firstname: "John", lastname : "Doe"});
    
});

app.get("/person/:id", function (req, res) {
    
    res.render("person", {
                    ID   : req.params.id,
                    Qstr : req.query.qstr
                   
                });

});

app.post("/person", urlEncodedParser, function (req, res) {
   
    res.send("Thank you.");

    console.log(req.body.firstname);
    console.log(req.body.lastname);

});

app.post("/personjson", jsonParser, function (req, res) {
   
    res.send("Thank you for the JSON data.");

    console.log(req.body.firstname); // It is data property
    console.log(req.body.lastname);  // It is data property

});

app.get("/api", function (req, res) {

    res.json({firstname: "John", lastname : "Doe"});
    
});


app.listen(port);
