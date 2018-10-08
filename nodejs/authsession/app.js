const express = require("express");
const session = require("express-session");

// If not installed first, it doesn't exist
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(session({

    secret : "mySecretKey",
    resave : true,
    saveUninitialized : true

}));


app.get("/login", function (req, res) {
   
    if (!req.query.username || !req.query.password) 
        res.send("Username and password required.");
    else if (req.query.username === "hello" && req.query.password === "world") 
    {
        req.session.user = "hello";
        req.session.admin = true;

        res.send({error : 0, result : "Logged in."});
        console.log(JSON.stringify(req.session));
    }
});

app.get("/logout", function (req, res) {

    req.session.destroy();
    res.send({error : 0, result : "Logged out." });

});

function auth(req, res, next) {

    if (req.session && req.session.user === "hello" && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
        // return res.sendStatus(503);
}

// Create any content route
app.get("/content",  auth, function (req, res) {
   
    res.send("This is secret area.");

});

app.listen(3000);
console.log("App running at port 3000.");
