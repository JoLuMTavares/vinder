var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	username: String,
    password: String, 
    lastLogDate : Date
});

var Users = mongoose.model('users', usersSchema);
module.exports = Users;