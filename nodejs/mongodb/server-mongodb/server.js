/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
if (err) throw err;


var dbo = db.db("test");
var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
];
dbo.collection("customers").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});

});

*/

/*

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    dbo.collection("customers").find().toArray(function (err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
});

/*
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    dbo.collection("cars").find().toArray(function (err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
});

*/

/*
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    // var query = {address : "Park Lane 38"};
    dbo.collection("customers").find({}, { projection : {_id : 0, name : 1, address : 1}}).toArray(function (err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
});
*

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var query = "C";
    // In this case the "^" means any data starting with the indicated string. It's
    // different from a data that contains a String. If the given string is not at the
    // beginning, it doesn't count.
    dbo.collection("customers").find({address : new RegExp("^" + query,'i')}).toArray(function (err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
});


var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var mysort = {name : 1};
    dbo.collection("customers").find().sort(mysort).toArray(function (err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
});

*



var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var query = {address : "Mountain 21"};
    dbo.collection("customers").deleteOne(query, function (err, result) {
        if(err) throw err;
        console.log("1 element deleted.");
        db.close();
    });
});


*

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var myquery = {address : /^M/};
    dbo.collection("customers").deleteMany(myquery, function (err, obj) {
        if(err) throw err;
        console.log(obj.result.n + " element(s) deleted.");
        db.close();
    });
});

*/

/*
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var myquery = {address : "Valley 345"};
    var newValues = {$set : {name : "Mickey", address : "Canyon 123"}};
    dbo.collection("customers").updateOne(myquery, newValues, function (err, obj) {
        if(err) throw err;
        console.log("1 element(s) updated.");
        db.close();
    });
});

*

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    var myquery = {address : /^S/};
    var newValues = {$set : {name : "Minnie"}};
    dbo.collection("customers").updateMany(myquery, newValues, function (err, res) {
        if(err) throw err;
        console.log(res.result.nModified + "element(s) updated.");
        db.close();
    });
});

*

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    dbo.collection("customers").find().limit(5).toArray(function (err, res) {
        if(err) throw err;
        console.log(res);
        db.close();
    });
});

*

orders
{
    _id: 1, product_id : 154, status : 1 // NOT WORKING HERE, ONLY ON ROBO
}

*/

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, { useNewUrlParser: true },  function (err, db) {
    if(err)  throw err;
    var dbo = db.db("test");
    dbo.collection("orders").aggregate([
        { $lookup : 
            {
                from : "product_v2",
                localField :  "product_id",
                foreignField : "_id",
                as : "orderdetails"
            }
        }
    ]).toArray(function (err, res) {
        if(err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});
