var fs = require("fs");

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

module.exports = function (app) {
    


    //render person.ejs template from the folder views and pass data to template.
    app.get('/api/person/:id',function(req,res){
        //get that person data from the database
        res.json({firstName : "Joao", lastName : "Tavares"});
    });


    app.get('/api/person',jsonParser, function(req,res){
    //save to the database
    });

    app.get('/api/person/:id',jsonParser, function(req,res){
        //delete from the database
    });

}