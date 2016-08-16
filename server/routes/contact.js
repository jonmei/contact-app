var _ = require("lodash");
var Contact = require('../models/contact_model.js');

// In case you need caching, uncomment these two lines and set the redis server address
// var redis = require('redis');
// var cache = require('express-redis-cache')({ client: require('redis').createClient(6379, '127.0.0.1') });

module.exports = function(app) {

    /* Create */
    app.post('/contact', function(req, res) {
        var newContact = new Contact(req.body);
        if(_.isEmpty(req.body)) {
            res.json({ info: 'error json cannot be empty'});
            return;
        }
        if(!req.body.name) {
            res.json({ info: 'error name is required'});
        }
        newContact.save(function(err, data){
            if(err){
                res.json({info: 'error during find contact', error: err });
                return;
            }
            res.json({info: 'contact created successfully', id: data._id});
        });

    });

    /* Read */
    app.get('/contact', function(req, res) {
        var query = req.query;
        Contact.find(req.query, function(err, contacts){
            if(err){
                res.json({info: 'error during find contact', error: err });
                return;
            }
            res.json({info: 'contacts found successfully', data: contacts });
        })
    });
    app.get('/contact/:id', function(req, res) {
        Contact.findById(req.params.id, function(err, contact) {
            if(err){
                res.json({info: 'error during find contacts', error: err });
                return;
            }
            if(contact){
                res.json({info: 'error during find contacts', data: contact });
            } else {
                res.json({info: 'contact not found'});
            }
        });
    });

    /* Update */
    app.put('/contact/:id', function(req, res) {
        Contact.findById(req.params.id, function(err, contact) {
            if(err){
                res.json({info: 'error during find contacts', error: err });
                return;
            }
            if(contact){
                _.merge(contact, req.body);
                contact.save(function(err) {
                    if(err){
                        res.json({info: 'error during contact update', error: err });
                        return;
                    }
                    res.json({info: 'contact updated successfully'});
                })
            } else {
                res.json({info: 'contact not found'});
            }
        });
    });

    /* Delete */
    app.delete('/contact/:id', function(req, res) {
        Contact.findByIdAndRemove(req.params.id, function(err){
            if(err) {
                res.json({info: 'error during remove contact', error: err });
                return;
            }
            res.json({info: 'contact removed successfully'});
        });
    });
};
