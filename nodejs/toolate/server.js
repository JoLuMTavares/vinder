const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require('mongoose');
const Laties = require('./toolatemodel.js');

// For the users to have the right login access
const Users = require("./userModel.js");

mongoose.connect('mongodb://localhost/toolate');

// This is to make shore only the logged user has access to the list of late comers
function auth(req, res, next) {

    if (req.session)
        return next();
    else
        return res.sendStatus(401);
        // return res.sendStatus(503);
}

// To make shore only the administrator has access to this operation
function admin(req, res, next) {

    if (req.session && req.session.user === "admin" && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
        // return res.sendStatus(503);
}

app.use(cookieParser());
app.use(session({

    secret : "mySecretKey",
    resave : true,
    saveUninitialized : true

}));


app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    return res.send({ toolate: '1.0' });
});

app.get('/laties', auth, function(req, res) {
    Laties.find({}, function(err, result) {
        if(err) {
            return res.send({ error: err });
        }

        if(!result) {
            return res.send({ error: 'some other error' })
        }

        return res.send(result);
    });
});

app.post('/laties', auth, function(req, res) {
    if(!req.body.name || !req.body.time || !req.body.date) {
        return res.send({ error: 'name, time and date needed' });
    }

    let newLaty = new Laties(req.body);
    newLaty.save(function(err, newRecord) {
        if(err) return res.send({ error: err });

        return res.send({ ...req.body, id: newRecord._id })
    });
});

app.delete('/laties/:id', admin, function(req, res) {
    Laties.findById(req.params.id, function(err, laty) {
        if(!laty)
            return res.send({ err: 'laty not found '});

        laty.remove(function(err) {
            if(err) return res.send(err);
            return res.send(laty);
        });
    });
});

app.post('/login', function(req, res) {
    if(!req.body.username || !req.body.password) 
        return res.send({ error: 'username password required' });
/*
    Users.find({}, function (err, usersList) {
        if (err) return res.send(err);

        usersList.forEach(currUser => {
            if (req.body.username == currUser.username && req.body.password == currUser.password) {
                req.session.user = currUser.username;
                currUser.lastLogDate = req.body.lastLogDate;

                currUser.save(function (err) {
                    if (err)  return res.send(err);  
                });

                if (currUser.username === "admin") {
                    req.session.admin = true;
                    req.session.x = 9;
                }
                else {
                    req.session.admin = false;
                    req.session.x = 4;
                }
    
                console.log(JSON.stringify(req.session));
    
                return res.send({error : 0, result : "Login successfull"});
            }
        });
        

    });
    
/*
    if(req.body.username === 'joao' && req.body.password === 'speed') {
        
        req.session.user = "joao";
        req.session.admin = true;
        req.session.x = 9;

        console.log(JSON.stringify(req.session));

        return res.send({error : 0, result : "Login successfull"});

    }    
    */

//    Users.where("username").equals("req.body.username")

    var query = {username : req.body.username , password : req.body.password};
    Users.findOne(query, function (err, currUser) {
        if (!currUser) return res.send({error : 3, result : "Error! Username or password incorrect"});
        currUser.lastLogDate = req.body.lastLogDate;

        currUser.save(function (err) {
            if (err)  return res.send(err);  
        });

        if (currUser.username === "admin") {
            req.session.admin = true;
            req.session.x = 9;
            console.log(JSON.stringify(req.session));
            return res.send({error : 0, result : "Login successfull"});
        }
        else {
            req.session.admin = false;
            req.session.x = 4;
            console.log(JSON.stringify(req.session));
            return res.send({error : 124, result : "Login successfull"});
        }

        

        
    });
});

app.get("/logout", function (req, res) {

    req.session.destroy();
    return res.send({error : 0, result : "Logged out." });
  
});
  

app.listen(3000);
