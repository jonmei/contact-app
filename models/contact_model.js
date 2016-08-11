var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: String,
    surname: String,
    telephone: Number,
    image: String,
});

module.exports = mongoose.model('Contact', contactSchema);