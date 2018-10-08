var fs = require("fs");

var express = require("express");

var app = express();

var port = process.env.port || 3000;

app.listen(port);

var fileList = function () {

    var list = [];

    var content;

    return {
        readFile : function (file) {
            fs.readFile(file, 'utf8', function(err, data) {  
                if (err) throw err;
                console.log(data);
                content = data;
            });

            return content;
        },

        readFolder : function (path) {
            fs.readdir(path, function (err, files) {
                files.forEach(function(file) {
                    list.push(file);
                });
            });
            return list;
        }
        
    }
}

filesList = fileList();



app.use("/assets", express.static(__dirname+"/public"));

app.use("/", function (req, res, next) {
    
    console.log("Request Url: " + req.url);
    next();

});

app.get("/", function (req, res) {
    
    res.send("<html><head><link href='assets/style.css' type='text/css' rel='stylesheet'></head><body><h1>Hello world!</h1></body></html>");

});

app.get("/api", function (req, res) {

    res.json({firstname: "John", lastname : "Doe"});
    
});

app.get("/person/:id", function (req, res) {
    
    res.send("<html><head></head><body><h1>Person: " + req.params.id + "</h1></body></html>");

});








app.get("/get", function (req, res) {
    var resCont = "<html><head></head><body><h1>The files:</h1>";

    /*
  
  
    var fileList =  fs.readFile("/home/devugees/Desktop/nodejs/express/files/", function (err, content) {
                        if (err) return callback(err)
                        callback(null, content)
                    });

*/

    var filesSet = filesList.readFolder("/home/devugees/Desktop/nodejs/express/files/");

    for (let i = 0; i < fileList.length; i++) {

        var fileContent = filesList.readFile("/home/devugees/Desktop/nodejs/express/files/" + filesSet[i]);

        resCont += "<p>File content: "+ fileContent +"</p>";
    }

    resCont += "</body></html>";

   /*
    var file1 = fs.readFile("/home/devugees/Desktop/nodejs/express/files/" + fileList[0], "utf-8");

    var file2 = fs.readFile("/home/devugees/Desktop/nodejs/express/files/" + fileList[1], "utf-8");

    var file3 = fs.readFile("/home/devugees/Desktop/nodejs/express/files/" + fileList[2], "utf-8");

    res.send("<html><head></head><body><h1>The files:</h1><p>First one: "+ file1 +"</p>" +
    "<p>Second one: "+ file2 +"</p><p>Last one: "+ file3 +"</p></body></html>");

    */

    res.send(resCont);

});

/*
app.get("/post", function (req, res) {
    
    let userInfo = {
        "name" : "Joao",
        "age"  : 36,
        "car"  : "Ferrari 250 GTE"
    }

    let dataToWrite = JSON.stringify(userInfo);

    fs.writeFileSync("/home/devugees/Desktop/nodejs/express/files/users.json", dataToWrite);    

    res.send("<html><head></head><body><h1>File successfully created</h1></body></html>");

});
*/

app.post("/:filename", function (req, res) {
    
    let userInfo = {
        "name" : "Joao",
        "age"  : 36,
        "car"  : "Ferrari 250 GTE"
    }

    let dataToWrite = JSON.stringify(userInfo);

    let theFile = __dirname + "/home/devugees/Desktop/nodejs/express/files/" + req.params.filename;

    fs.writeFile(theFile, dataToWrite, (err) => {

        if (err)
            return res.send({error : err});

        return res.send({error : 0});
    });

});

/*

function readContent(callback) {
    fs.readFile("/home/devugees/Desktop/nodejs/express/files/", function (err, content) {
        if (err) return callback(err)
        callback(null, content)
    });
}

readContent(function (err, content) {
    console.log(content)
});

*

app.get("/delete", function (req, res) {

    // First getting the list of files
    // var fileList2  = fs.readdir("/home/devugees/Desktop/nodejs/express/files/");
    var filePath = "/home/devugees/Desktop/nodejs/express/files/";

    var fileList2 = 

    

    // Now with a cicle checking if the file is a json

    for (let i = 0; i < fileList2.length; i++) {

        var currFile = fileList2[i];

        // Getting the file type just by the split function
        var fileType = String(currFile).split(".");

        // If the file is found, it's deleted then
        if (fileType[1] === "json") {
            fs.unlink("/home/devugees/Desktop/nodejs/express/files/" + currFile);
            res.send("<html><head></head><body><h1>File successfully deleted</h1></body></html>");
            return;
        }  
    }
    res.send("<html><head></head><body><h1>There are no json files</h1></body></html>");
    
});

*/

app.delete("/:filename", function(req, res) {

    if (!req.params.filename) {
        return res.send({error : "You need to specify the filename!"});
    }


    let theFile = __dirname + "/home/devugees/Desktop/nodejs/express/files/" + req.params.filename;

    fs.unlink(theFile, function(err) {

        if (err)
            return res.send({error : err});

        return res.send({error : 0});
    });

});