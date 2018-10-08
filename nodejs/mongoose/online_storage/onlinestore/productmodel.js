var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productSchema= new Schema({
  product_name: {required : true, type : String},
  price: {required : true, type : String},
  category: {required : true, type : String}
});



//now assign schema to model
var Product=mongoose.model('products',productSchema);

module.exports=Product;