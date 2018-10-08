var express = require('express');
var router = express.Router();

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url=  'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express'});

  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if(err) return res.send({error:err});
 
    const dbo = db.db('onlinestore');
 
        dbo.collection('products').find({}).toArray(function(err,dbres){
            if(err) return res.send({error:err});
            db.close();
            console.log(dbres);
            return res.render('index',{
               title:'Express v. 1.0 ',
               products: dbres
              });
        });
    });
 
 });

 router.post('/insert', function(req, res, next) {
    // if (!req.body.product_name || !req.body.product_price || !req.body.product-category) 
    //   return res.send({ error : "Missing information!"});

    MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
      if(err) return res.send({error : err});

      var dbo = db.db("onlinestore");     

      dbo.collection("products").insertOne(req.body, function (err, dbres) {
          if (err) return res.send({error : err});
          db.close();
          res.redirect("/");
      });

    });
 });

router.get("/delete", function (req, res) {
   
  if (!req.query.id)
      return res.send("No id inserted! Cannot remove.");

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if(err) return res.send({error : err});

      var dbo = db.db("onlinestore");

      let mongoId = null;
      try {
          mongoId = new mongo.ObjectId(req.query.id);
      }
      catch(err) {
          return res.send({error : err});
      }

      dbo.collection("products").deleteOne({_id : mongoId}, function (err, dbres) {
          if (err) return res.send({error :  err});
          
          db.close();
          // return res.render(dbres);
          res.redirect("/");
      });

  });

});

// When Edit option is selected. Just a page redirection
router.get("/edit", function (req, res) {


  MongoClient.connect(url,{ useNewUrlParser: true }, function(err,db){
    if(err) return res.send({error:err});
 
    const dbo = db.db('onlinestore');

    let mongoId = null;
    try {
        mongoId = new mongo.ObjectId(req.query.id);
    }
    catch(err) {
        return res.send({error : err});
    }
 
    dbo.collection('products').findOne({_id : mongoId}, function(err,dbres){
        if(err) return res.send({error:err});
        db.close();
        console.log(dbres);
        // res.redirect("/update");
        return res.render('updateProduct',{
            ID : dbres._id,
            name : dbres.product_name,
            price : dbres.price,
            category : dbres.category
        });
    });
  });
});

/* Inserting the updated product
  Even though, the form on the "updateProduct.ejs" has "PUT" on the method identification,
  the app.js interprets it as "GET" method. Therefore it must be here as "router.get".
  Inside this function, the values must be correctly specified.
  Using req.body doesn't work, since the information comes as a query by the "/update"
  (ex: /update?_id=xxxxxxxx&product_name=xxxxxxxxx&price=xxxxxxxxxx&category=xxxxxxxx).
  So each element is separated by the "&". We need to get those separately.
*/
router.get("/update", function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
    if(err) return res.send({error : err});

    var dbo = db.db("onlinestore");     

    let mongoId = null;
    try {
        // The firs element - -> the product id, so we
        // get the right element on the database
        mongoId = new mongo.ObjectId(req.query._id);
    }
    catch(err) {
        return res.send({error : err});
    }

    // Just a query to stay as the firs parameter of "updateOne"
    let myquery = {"_id" : mongoId};

    // Here is where all the elements are set to each key. Then these are sent
    // as the new values to the database (second parameter of "updateOne")
    let newValues = {$set : {product_name : req.query.product_name, price : req.query.price, category :  req.query.category}};
    //Finally sending the update to the database
    dbo.collection("products").updateOne(myquery, newValues, function (err, dbres) {
        if (err) return res.send({error : err});
        db.close();
        res.redirect("/");
    });

  });
});

module.exports = router;
