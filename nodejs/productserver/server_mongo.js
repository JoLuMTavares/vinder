// const mysql = require("mysql");

/*
let con = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "product_database"
}); */


const express = require("express");
const bodyParser = require("body-parser");

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;


const url = "mongodb://localhost:27017";



// const fs = require("fs");

const app = express();
app.use(bodyParser.json());

var randomString = require("randomstring");

var port = process.env.port || 3000;

// app.use(bodyParser.json());

// This function is just to check if the json file 
// is empty or not.
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

// Redirection. Better than writing all the options for all files
app.use("/", express.static(__dirname + "/public"));

/*
app.get("/", function (req, res) {
    return res.send({"crudap2" : "1.0"});
});
*/


app.get("/", function (req, res) {
    return res.send();
});


/*
// Local json file version
app.post("/products", function (req, res) { 
    
    if (!req.body.type || !req.body.product_price || !req.body.title || !req.body.product_description || !req.body.imgUrl)
        return res.send({error : "Missing one of the elements! Type, price, title and description are mandatory."});
    else if (req.body.type !== "book" && req.body.type !== "music" && req.body.type !== "movie")
        return res.send({error : "Invalid type! Only books, musics or movies accepted."});

    // 1. Read request
    let newProduct = {
        type        : req.body.type,
        price       : req.body.product_price,
        title       : req.body.title,
        description : req.body.product_description,
        image       : req.body.imgUrl,
        id          : randomString.generate(20)
    }

    // 2. Read the file
    fs.readFile(__dirname + "/products.json", function (err, data) {       

        if (err) {
            // res.status(statusCode >= 100 && statusCode < 600 ? err.code : 500);
            res.send({ error : err});
            // var createStream = fs.createWriteStream(__dirname + "/products.json", "[]", "utf-8");
            // createStream.end();
            
        }
 /*       if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
            res.header("Access-Control-Allow-Origin", "*");
        }
*
        // 3. Parse JSON. This calls a validation function
        let currProducts = validateJSON(data);

        // At the beginning: []
        // Later is : [{}, {}, {}, ...]
        
        
        // 4. Push the user into the array
        currProducts.push(newProduct);
        

        fs.writeFile(__dirname + "/products.json", JSON.stringify(currProducts), "utf-8",

            function () {
                if (err) 
                    return res.send({ error : err});
                
            }
        ); 
        
    });

    return res.send(newProduct);
    // return res.send({ message : "Product has been saved on the file."});
});
*/

// Database version
/*
app.post("/products", function (req, res) { 
    
    var type = 0;

    if (!req.body.type || !req.body.product_price || !req.body.title || !req.body.product_description || !req.body.imgUrl)
        return res.send({error : "Missing one of the elements! Type, price, title and description are mandatory."});
    else if (req.body.type !== "book" && req.body.type !== "music" && req.body.type !== "movie")
        return res.send({error : "Invalid type! Only books, musics or movies accepted."});

    if (req.body.type == "music")
        type = 2;
    else if (req.body.type == "book")
        type = 1;
    else type = 3;

    var target_query = "insert into product (title, price, description, image, type_id) values (?,?,?,?,?)";
 

    let productInfo = [req.body.title, req.body.product_price, req.body.product_description, req.body.imgUrl, type];

    con.query(target_query, productInfo, 
        function (err,  rows) {
            if(err) 
                throw err;

        console.log( rows.insertId );
        return res.send(rows);
        // console.log ( rows[2].username );
    });

    
});

// Json file version
/*
app.get("/products", function (req, res) {

    if (!req.query.category) {
        fs.readFile(__dirname + "/products.json", function (err, data) {

            if (err) 
                return res.send({ error : err});
    
            // 3. Parse JSON
            let currProducts = JSON.parse(data);
    
            // 4. Send the array to the user
            return res.send(currProducts);
    
        });
    }
    else {
        fs.readFile(__dirname + "/products.json", function (err, data) {

            var found = false;

            var products = [];

            let term = req.query.category.toLowerCase();

            if (err) 
                return res.send({ error : err});
    
            // 3. Parse JSON
            let currProducts = JSON.parse(data);
    
            // 4. Check for the product with the right term
            for (let index = 0; index < currProducts.length; index++) {
                
                let product = currProducts[index];

                if((product.type.toLowerCase().indexOf(term) !== -1)
                    || (product.description.toLowerCase().indexOf(term)  !== -1)) {
                    found = true;
                    products.push(product);         
                }
            }
            if (!found)
                return res.send("No product found with the indicated term.");
            else
                return res.send(products);
    
        });
    }    
});

*/


// MySQL database version
/*
app.get("/products", function (req, res) {

    if (req.query.category) {
        
        let type = req.query.category;
        
        let sql = "select * from product where type_id =" + type;
        con.query(sql, function (err,  data) {
            if(err) 
                throw err;

            console.log( data );
            // console.log ( rows[2].username );
            return res.send(data);
        });

    
        
    }
    else if (req.query.term) {
         // var found = false;
         let storedProducts = "";

         let sql = 'select * from product where lower(title) like lower("%'+ req.query.term + '%") or lower(description) like lower("%'+ req.query.term + '%")';

         con.query(sql, function (err,  rows) {
             if(err) 
                 throw err;
         
             console.log( rows );
             // console.log ( rows[2].username );
             // currProducts.push(rows.RowDataPacket);
             storedProducts = data;
         });
         
         // 4. Send the array to the user
         return res.send(storedProducts);
    }
    else {
        // var found = false;
        let storedProducts = "";
        con.query('select * from product', function (err,  data) {
            if(err) 
                throw err;
        
            console.log( data );
            // console.log ( rows[2].username );
            // currProducts.push(rows.RowDataPacket);
            storedProducts = data;
            return res.send(storedProducts);
        });
        

        
    }    
});

*/

// Mongodb version
app.get("/product", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) return res.send({error : err});

        const  dbo = db.db('productsdb');

        if (!req.query.category && !req.query.term) {
            dbo.collection('product').find().toArray(function (err, dbres) {
                if (err) return res.send({error : err});
                db.close();
                return res.send(dbres);
            });
        }
        else if (req.query.category) {
            let catId = null;
            try {
                catId = parseInt(req.query.category);
            }
            catch(err) {
                return res.send({error : err});
            }
            dbo.collection('product').find({'type_id' : catId}).toArray(function (err, dbres) {
                if (err) return res.send({error : err});

                db.close();
                return res.send(dbres);
            });
        }
        else if (req.query.term) {
            let search = {
                $or: [
                        {title: new RegExp(req.query.term,'i')}, 
                        {description: new RegExp(req.query.term,'i')}
                     ]
                };
            dbo.collection('product').find(search).toArray(function (err, dbres) {
                if (err) return res.send({error : err});

                db.close();
                return res.send(dbres);
            });
        }
    });
});


// POST - MongoDB version
app.post("/product", function (req, res) {
    if (!req.body.title || !req.body.price || !req.body.description || !req.body.image || !req.body.type_id) 
        return res.send({ error : "Missing information!"});
    
     MongoClient.connect(url, function (err, db) {
         if(err) return res.send({error : err});

         var dbo = db.db("productsdb");
         var newProduct = {
             title       : req.body.title,
             price       : req.body.price,
             description : req.body.description,
             image       : req.body.image,
             type_id     : req.body.type_id
         };
 
         dbo.collection("product").insertOne(newProduct, function (err, dbres) {
             if (err) return res.send({error : err});
 
             db.close();
             return res.send({error : 0, insertedId : dbres.insertedId});
         });
 
     });
 
 });

// JSON File version
/*
app.delete("/product", function (req, res) {

    var found = false;

    // 1. Checking the id was given
    if(!req.query.id)
        return res.send("No given id! You must give the id of the product you want deleted.");

    // 2. Reading the file
    fs.readFile(__dirname + "/products.json", function (err, data) {

        // If the file does not exist
        if (err) 
            return res.send({ error : err});

        // 3. Parse JSON
        let currProducts = JSON.parse(data);

        // Important to check if the file is not empty
        if (currProducts.length > 0) {

            // 4. Checking the product with the right id
            for (let index = 0; index < currProducts.length; index++) {
                const element = currProducts[index];
                
                // 5. If there's a match, the element is removed from the array
                if (element.id === req.query.id) {
                    found = true;
                    currProducts.pop(element);
                    break;                   
                }
            }
            // 6. Writing again on the file
            fs.writeFile(__dirname + "/products.json", JSON.stringify(currProducts), "utf-8",

                function () {
                    if (err) 
                        return res.send({ error : err});
                    
                }
            );
            // 7. Sending the Response
            if (found)
                return res.send("The product was removed from the file.");
            return res.send("Product not found!");
        }
        else
            // The file is empty
            return res.send("There are no stored products.");
    });
    
});

*/

// MySQL database version
/*
app.delete("/product", function (req, res) {

    // 1. Checking the id was given
    if(!req.query.id)
        return res.send("No given id! You must give the id of the product you want deleted.");

    let sql = "delete from product where id = ?";

    con.query(sql, [req.query.id], 
    
        function (err,  rows) {
            if(err) 
                throw err;
    
            console.log( rows );
        }
    );
    
});
*/

// PUT MongoDB version
app.put("/product/:id", function (req, res) {
   
    MongoClient.connect(url, function (err, db) {
        if(err) return res.send({error : err});

        var dbo = db.db("productsdb");

        let mongoId = null;
        try {
            mongoId = new mongo.ObjectId(req.params.id);
        }
        catch(err) {
            return res.send({error : err});
        }

        let newValues = { $set : req.body };

        dbo.collection("product").updateOne({"_id" : mongoId}, newValues, function (err, dbres) {
            if (err) return res.send({error :  err});
            
            db.close();
            return res.send(dbres);
        });

        

    });
});

// DELETE MongoDB version

app.delete("/product", function (req, res) {
   
    if (!req.query.id)
        return res.send("No id inserted! Cannot remove.");

    MongoClient.connect(url, function (err, db) {
        if(err) return res.send({error : err});

        var dbo = db.db("productsdb");

        let mongoId = null;
        try {
            mongoId = new mongo.ObjectId(req.query.id);
        }
        catch(err) {
            return res.send({error : err});
        }

        dbo.collection("product").deleteOne({"_id" : mongoId}, function (err, dbres) {
            if (err) return res.send({error :  err});
            
            db.close();
            return res.send(dbres);
        });

    });

});




app.listen(port);