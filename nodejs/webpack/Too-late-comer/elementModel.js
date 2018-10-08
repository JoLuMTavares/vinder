var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var elementSchema= new Schema({
  name: {required : true, type : String},
  date: {required : true, type : Date},
  difference: {required : true, type : String}
});



//now assign schema to model
var ElementModel=mongoose.model('abusers',elementSchema);

module.exports=ElementModel;