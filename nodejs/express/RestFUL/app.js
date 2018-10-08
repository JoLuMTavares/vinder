var fs = require("fs");

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var port = process.env.port || 3000;

var urlEncodedParser = bodyParser.urlencoded({extended : false});

var jsonParser = bodyParser.json();

var users = [];


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

// render index.ejs template (ejs) from the folder views
app.get("/", function (req, res) {
    
    res.render("index");

});

app.get("/api", function (req, res) {

    res.json({firstname: "John", lastname : "Doe"});
    
});

// Render person ejs template from the folder views and pass the data to the template
app.get("/person/:id", function (req, res) {
    
    let givenID = parseInt(req.params.id);
    fs.readFile(__dirname + "/users.json", function (err, data) {

        var found = false;

        var finalUser;

        //let term = req.query.category.toLowerCase();

        if (err) 
            return res.send({ error : err});

        // 3. Parse JSON
        users = JSON.parse(data);

        // 4. Check for the product with the right term
        for(user in users) {
            if(users[user].id == givenID) {
                found = true;
                finalUser = users[user]; 
                break;        
            }
        }
        if (!found)
            return res.send("No user found with the indicated id.");
        else
            return res.render("person", {ID : finalUser.id, name : finalUser.name, password : finalUser.password,
                                    profession : finalUser.profession});

    });

});



app.get("/listUsers", function (req, res) {

    fs.readFile(__dirname + "/users.json", function (err, data) {

        if (err) 
            return res.send({ error : err});

        // 3. Parse JSON
        users = JSON.parse(data);

        // 4. Send the array to the user
        // return res.send(users);
        return res.render("index", {usersList : users});

    });

});

app.post("/addUser",  function (req, res) {
   var newUser;
    // res.send("Thank you.");

    console.log(req.body.name); // It is name property
    console.log(req.body.password);  // It is name property
    console.log(req.body.profession);  // It is name profession


    if ((!req.body.name || !req.body.password || !req.body.profession))
        return res.send({error : "Missing information! Name, password and profession must be given."});

   

    // 1. Read the file
    fs.readFile(__dirname + "/users.json", function (err, data) {       

        if (err) {
            res.send({ error : err});

            
        }
 
        // 2. Parse JSON. This calls a validation function
        let currUsers = validateJSON(data);

        // At the beginning: []
        // Later is : [{}, {}, {}, ...]

        // This is the proper way to get the length of an object
        // It's not like the array "length" property
        var size = Object.keys(currUsers).length;

        let newID = ++size;


         // 3. New user created
        newUser = {
            name        : req.body.name,
            password         : req.body.password,
            profession       : req.body.profession,
            id               : newID
        }
        
        
        // 4. Push the user into the array
        currUsers["user"+newID] = newUser;
        

        fs.writeFile(__dirname + "/users.json", JSON.stringify(currUsers), "utf-8",

            function () {
                if (err) 
                    return res.send({ error : err});
                
            }
        ); 
        
    });

    return res.send("The user was created.");

});

app.post("/personjson", jsonParser, function (req, res) {
   
    // res.send("Thank you for the JSON data.");

    console.log(req.body.firstname); // It is data property
    console.log(req.body.lastname);  // It is data property    

});

app.post("/api/person", function (req, res) {

    // Save to the database
    
});

app.delete("/deleteUser/:id", function (req, res) {

    // Delete from the database
    var found = false;

    // 1. Checking the id was given
    if(!req.params.id)
        return res.send("No given id! You must give the id of the user you want deleted.");

    // 2. Reading the file
    fs.readFile(__dirname + "/users.json", function (err, data) {

        // If the file does not exist
        if (err) 
            return res.send({ error : err});

        // 3. Parse JSON
        let currUsers = JSON.parse(data);

        var size = Object.keys(currUsers).length;

        // Important to check if the file is not empty
        if (size > 0) {

            // 4. Checking the product with the right id
            for (user in currUsers) {
                // const element = currProducts[index];
                
                // 5. If there's a match, the element is removed from the array
                if (parseInt(currUsers[user].id) === parseInt(req.params.id)) {
                    found = true;
                    delete currUsers[user];
                    break;                   
                }
            }
            // 6. Writing again on the file
            fs.writeFile(__dirname + "/users.json", JSON.stringify(currUsers), "utf-8",

                function () {
                    if (err) 
                        return res.send({ error : err});
                    
                }
            );
            // 7. Sending the Response
            if (found)
                return res.send("The user was removed from the file.");
            return res.send("User not found!");
        }
        else
            // The file is empty
            return res.send("There are no users.");
    });
    
});

/*
app.get("/api", function (req, res) {

    res.json({firstname: "John", lastname : "Doe"});
    
});
*/

app.listen(port);
