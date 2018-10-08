//InsertMany
/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
if (err) throw err;


var dbo = db.db("testdb");
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


//////_id case

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("testdb");
var myobj = [
{ _id: 154, name: 'Chocolate Heaven'},
{ _id: 155, name: 'Tasty Lemon'},
{ _id: 156, name: 'Vanilla Dream'}
];
dbo.collection("products").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log(res);
db.close();
});
});

*/

/////Find one
/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("testdb");
dbo.collection("customers").findOne({}, function(err, result) {
if (err) throw err;
console.log(result.name);
db.close();
});
});

*/

//// Find All

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("testdb");
dbo.collection("customers").find({}).toArray(function(err, result)
{
if (err) throw err;
console.log(result);
db.close();
});
});