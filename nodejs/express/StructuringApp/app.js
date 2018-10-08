var fs = require("fs");

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var port = process.env.port || 3000;

// var urlEncodedParser = bodyParser.urlencoded({extended : false});

// Api Controller

var apiController = require("./controllers/apiController");
var htmlController = require("./controllers/htmlController");

var jsonParser = bodyParser.json();

// var users = [];


function validateJSON(body) {
    try {
      var data = JSON.parse(body);
      // if came to here, then valid
      return data;
    } catch(e) {
      // failed to parse
      return null;
    }
}

app.use(jsonParser);

app.use("/assets", express.static(__dirname+"/public"));

app.set("view engine", "ejs");

app.use("/", function (req, res, next) {
    
    console.log("Request Url: " + req.url);
    next();

});

apiController(app);
htmlController(app);

app.listen(port);
