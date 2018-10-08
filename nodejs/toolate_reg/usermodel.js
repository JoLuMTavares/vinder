var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
	regDate : Date,
	lastLogDate : Date,
	active : Boolean
});

var Users = mongoose.model('users', userSchema);
module.exports = Users;