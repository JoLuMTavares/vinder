import { Router } from 'express';
var router = Router();

import { MongoClient as _MongoClient } from 'mongodb';
const MongoClient = _MongoClient;
const url=  'mongodb://127.0.0.1:27017/';


/* GET home page. */
router.get('/products', function(req, res, next) {
 MongoClient.connect(url,function(err,db){
   if(err) return res.send({error:err});

   const dbo = db.db('onlinestore');

       dbo.collection('products').find({}).toArray(function(err,dbres){
           if(err) return res.send({error:err});
           db.close();
           console.log(dbres);
           return res.render('products',{
              title:'Express v. 1.0 ',
              products_array : dbres
             });
       });
   });

});

export default router;