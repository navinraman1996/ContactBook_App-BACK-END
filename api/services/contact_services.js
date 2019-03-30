'use strict';
/**
 * service for contact book
 */
const Contact = require('../models/contact').default;
const mongoose = require('mongoose');

// searching for the exact parameters in the data fields
exports.search = function(params) {
    const promise = Contact.find()
    .select('fname lname email number _id')
    .exec();

    return promise;
};

// save function for saving a contact in the database
exports.save = function(contact) {

    const newContact = new Contact(contact);
    const promise = newContact.save();
    return promise; 
};

// get function to get a contact from the database
exports.get = function(contactId) {

    const promise = Contact.findById(contactId).exec();
    return promise;
};

// update function to update a contact to the database
exports.update = function(params) {
    const promise = Contact.update({_id: id}, {$set: updateOps}).exec();
    return promise;
}

// delete function to delete a contact to the database
exports.delete = function(params) {
    const promise = Contact.deleteOne({_id: contactId});
    return promise;
}