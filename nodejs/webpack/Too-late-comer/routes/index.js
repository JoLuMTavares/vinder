var express = require('express');
var router = express.Router();

// Importing mongoose
var mongoose=require('mongoose');

const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const url=  'mongodb://localhost:27017/toolatecomer';

// Making the connection
mongoose.connect(url);

// Calling the elements Schema
var ElementModel=require('../elementModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Too Late Comer' });
});

// This function gives the right set of objects
// This is due to the date and time format
function setAbusers(mdbres) {

  var newElementsSet = [];


  mdbres.forEach(element => {
    
    let dateTime = element.date;

    let theSet = dateTime.toString().split(" ");

    let date = "" + theSet[0] + ", " + theSet[1] + " " + theSet[2] + " " + theSet[3];

    let time = theSet[4];

    let difference = parseInt(element.difference);

    newElementsSet.push({_id : element._id, name : element.name, date :  date, time : time, difference : difference});
  }); 

  return newElementsSet;
}

// This is to make shore only the logged user has access to the list of late comers
function auth(req, res, next) {

  if (req.session && req.session.user === "joao" && req.session.admin)
      return next();
  else
      return res.sendStatus(401);
      // return res.sendStatus(503);
}

router.get("/login", function (req, res) {
   
  if (!req.query.username || !req.query.password) 
      res.send("Username and password required.");
  else if (req.query.username === "joao" && req.query.password === "speed") 
  {
      req.session.user = "joao";
      req.session.admin = true;

      ElementModel.find(function(err, mdbres){

        if(err)
            return res.send(err);

        console.log(mdbres);

        var finalObject = setAbusers(mdbres);

        res.render('latecomers', {elements : finalObject});
      });

      // res.send({error : 0, result : "Logged in."});
      // console.log(JSON.stringify(req.session));
      
  }
});


router.get("/logout", function (req, res) {

  req.session.destroy();
  // res.send({error : 0, result : "Logged out." });
  res.redirect("/");

});

router.get("/latecomers",  auth, function (req, res) {
   
  res.send("This is secret area.");

});


router.post('/insert', function(req, res, next) {

  var insDate = req.body.date;
  var insTime = req.body.time;

  var dateTime = "" + insDate + " " + insTime;
  console.log(dateTime);

  let timeSplit = String(insTime).split(":");

  let firstPart = parseInt(timeSplit[0]);

  let secndPart = parseInt(timeSplit[1]);

  let currMin = firstPart * 60 + secndPart;

  let calDiff = currMin - 555;
  
  var abuser = {name : req.body.name, date : dateTime, difference :  calDiff};

  var newElement = new ElementModel(abuser);

  newElement.save(function(err){
      if(err)
          return res.send(err);

      console.log('user ' + req.body.name + ' has been saved successfully');
      // return res.send({ newProduct: req.body});
      // res.redirect("/latecomers");
      ElementModel.find(function(err, mdbres){

        if(err)
            return res.send(err);

        console.log(mdbres);

        var finalObject = setAbusers(mdbres);

        res.render('latecomers', {elements : finalObject});
      });
  });
});


router.get("/delete", function (req, res) {
   
  if (!req.query.id)
      return res.send("No id inserted! Cannot remove.");
      ElementModel.findById(req.query.id, function (err, target) {
        
        if (!target)
            return res.send(err , "Abuser not found!");

        console.log(target);
        target.remove(function(err){
            if(err)
                return res.send(err);
        
            console.log('The abuser is gone.');
            // return res.send(target);
            ElementModel.find(function(err, mdbres){

              if(err)
                  return res.send(err);
      
              console.log(mdbres);
      
              var finalObject = setAbusers(mdbres);
      
              res.render('latecomers', {elements : finalObject});
            });
        });
    });

});

module.exports = router;
