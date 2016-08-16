var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    telephone: Number
});

module.exports = mongoose.model('Contact', contactSchema);