const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const Laties = require('./toolatemodel.js');
const Users = require('./usermodel.js');

// For the activation user
const Activation = require('./activationmodel.js');

/*

 ++++++++++++++++ Random String generation ++++++++++++++++ 
    Direct with the randomstring module

*/
var randomstring = require("randomstring");


// For the mail sending 
const sendMail = require("./nodemailermodel.js");

/*

 ++++++++++++++++ Password Encryption ++++++++++++++++ 
    Crucial for security

*/
const bcrypt = require("bcrypt");

// task:
//
// 1. protect routes: only let users read, write and delete laties
//    when they are 'jan' and admin
// 2. create a post method /logout, that destroys the session

mongoose.connect('mongodb://localhost/toolate');
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey',
    resave: true,
    saveUnitialized: true
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    return res.send({ toolate: '1.0' });
});

function auth(req, res, next) {
    if(req.session && req.session.admin === true) {
        return next();
    }
    else {
        return res.send(401);
    }    
}

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

app.delete('/laties/:id', auth, function(req, res) {
    Laties.findById(req.params.id, function(err, laty) {
        if(!laty)
            return res.send({ err: 'laty not found '});

        laty.remove(function(err) {
            if(err) return res.send(err);
            return res.send(laty);
        });
    });
});

/* ++++++++++ The initial user registry process ++++++++++ 

    It's important to first check if all elements were inserted.
    Then the passwords need to match. After that the information
    is temporarily stored on another collection. Then an email
    is sent to the user. This one will have to click on the
    confirmation link to finish the account activation.

*/
app.post('/register', function (req, res) {
    // Checking the inserted information
    if(!req.body.username || !req.body.password || !req.body.registerDate)
        return res.send({ error: 'One or more fields missing!' });
         
    // Also important to check if the user already exists
    Users.findOne({username : req.body.username}, function (err, user) {
        if (user)
            return res.send({ error: 1 });

        // Continuing if no existent user is found...        

        // New string generation just for the activation code
        let newCode = randomstring.generate(24); // 24 characters

        // Generating an encrypted hash for the password
        // This way no hacker gets the password, since it's hashed.

        bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
            console.log('Hashed password: ' + hashedPassword); 

            // New activation user object creation
            let newActivation = new Activation({activCode : newCode, activUsername : req.body.username, 
                activPassword : hashedPassword, activDate : req.body.registerDate});
        
            console.log(newActivation);
            // Saving the object on the "activation" collection
            // Then sending the activation code and the target email
            newActivation.save(function(err, newRecord) {
                if(err) return res.send({ error: err });

                // Sending the email with the activation link
                sendMail.sendMail(newRecord.activUsername, 
                            "no-reply. Account activation",
                            `Thanks for your registration.<br> 
                                
                            Please verify your account by clicking on the following : <a href=http://localhost:3000/?activate=${newRecord.activCode}>http://localhost:3000/?activate=${newRecord.activCode}</a><br><br>
                
                            Please, do not reply to this email.<br>
                
                            If you didn't ask for this email, we apologize for the inconvinience.<br><br>
                
                            With best regards,<br><br><br>
                
                            The Too Late Site`       
                );

                return res.send({error : 0});
            });

        });

        
    });

    

});

app.get('/activate', function (req, res) {
    // Checking the inserted information
    if(!req.query.code)
        return res.send({ error: 'One or more fields missing!' });

    let actQuery = { activCode : req.query.code};   
        
    Activation.findOne(actQuery, function (err, user) {
        if(err) return res.send({ error: err });

        let newDate = new Date();

        let newUser = new Users({username : user.activUsername, password : user.activPassword, 
                             regDate : newDate, lastLogDate : newDate, active : true});

        console.log(newUser);
        newUser.save(function(err, theNewUser) {
            if(err) return res.send({ error: err });

            req.session.user = theNewUser.username;
            
            return res.send({...theNewUser, error : 0});
            
        });
        
    });
    
});

app.post('/login', function(req, res) {
    if(!req.body.username || !req.body.password) 
        return res.send({ error: 'username password required' });

    // 1. find usr pwd combo on db
    Users.findOne({username : req.body.username},

        function (err, user) {
            if (err)
            return res.send({error : "User not found!"});

            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    console.log("Passwords match.");
                     // 2. create a session
                    req.session.user = req.body.username;
                    req.session.admin = true;

                    user.lastLogDate = new Date();

                    user.save(function(err, loggedUser) {
                        if(err) return res.send({ error: err });

                        return res.send({...user, error : 0});

                    });
                    
                }
                   
                else
                    return res.send({error : "Passwords don't match"});
                //    console.log("Passwords don't match.");
              });

           
        });

        

});

app.post('/logout', function(req, res) {
    if(req.session) {
        req.session.destroy();
        return res.send({ error: 0 });
    }
});

app.listen(3000);
