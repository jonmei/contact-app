var express = require('express');
var helmet = require('helmet');

var app = express();
app.use(helmet());
app.disable('x-powered-by');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use only for development mode
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

var contacts = require('./routes/contact.js')(app);

var server = app.listen(8001);