var express = require('express');
var router = express.Router();

// Here is the main difference. Calling product model.
var Product=require('../productmodel');

// Importing mongoose
var mongoose=require('mongoose');

const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const url=  'mongodb://localhost:27017/onlinestore';

// Making the connection
mongoose.connect(url);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express'});

   //read statement
    Product.find(function(err, mdbres){

        if(err)
            return res.send(err);

        console.log(mdbres);
        return res.render("index", {title : "Mongoose Operations", products : mdbres});

    });
 
 });

 router.post('/insert', function(req, res, next) {
    var newProduct = new Product(req.body);

    newProduct.save(function(err){
        if(err)
            return res.send(err);
  
        console.log('user ' + req.body.product_name + ' has been saved successfully');
        // return res.send({ newProduct: req.body});
        res.redirect("/");
    });
 });

 

router.get("/delete", function (req, res) {
   
  if (!req.query.id)
      return res.send("No id inserted! Cannot remove.");
    Product.findById(req.query.id, function (err, product) {
        
        if (!product)
            return res.send(err , "Product not found!");

        product.remove(function(err){
            if(err)
                return res.send(err);
        
            console.log('User ' + req.body.name + ' has been successfully removed.');
            // return res.send(product);
            res.redirect("/");
        });
    });

});

// When Edit option is selected. Just a page redirection
router.get("/edit", function (req, res) {



    let mongoId = null;
    try {
        mongoId = new mongo.ObjectId(req.query.id);
    }
    catch(err) {
        return res.send({error : err});
    }

    Product.findById(mongoId ,function(err, mdbres){

        if(err)
            return res.send(err);

        console.log(mdbres);
        return res.render('updateProduct',{
            ID : mdbres._id,
            name : mdbres.product_name,
            price : mdbres.price,
            category : mdbres.category
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


    Product.findById(req.query._id, function (err, product) {

        for (key in req.query) 
            product[key] = req.query[key];

        
        product.save(function(err){
            if(err)
                return res.send(err);
    
            console.log('user ' + req.body.product_name + ' has been saved successfully');
            // return res.send({ newProduct: req.body});
            res.redirect("/");
        });
    });

});

module.exports = router;
