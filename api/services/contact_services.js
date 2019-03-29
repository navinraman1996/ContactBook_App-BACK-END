'use strict';
const Contact = require('../models/contact');
const mongoose = require('mongoose');

exports.search = function(params) {
    const promise = Contact.find()
    .select('fname lname email number _id')
    .exec();

    return promise;
};

exports.save = function(contact) {

    const newContact = new Contact(contact);
    const promise = newContact.save();
    return promise; 
};

exports.get = function(contactId) {

    const promise = Contact.findById(contactId).exec();
    return promise;
};

exports.update = function(params) {
    const promise = Contact.update({_id: id}, {$set: updateOps}).exec();
    return promise;
}

exports.delete = function(params) {
    const promise = Contact.deleteOne({_id: contactId});
    return promise;
}