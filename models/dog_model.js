/**
 * Created by TeleSoftas on 2016-08-09.
 */
var mongoose = require('mongoose');

var dogSchema = mongoose.Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Dog', dogSchema);