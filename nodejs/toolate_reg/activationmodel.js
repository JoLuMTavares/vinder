var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activSchema = new Schema({
    activCode     : String,
    activUsername : String,
    activPassword : String,
    activDate     : Date
});

var Activation = mongoose.model('activation', activSchema);
module.exports = Activation;