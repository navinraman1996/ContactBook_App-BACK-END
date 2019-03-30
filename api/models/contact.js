'use strict';
/**
 * model js for contact database
 * 
 * creating the schema for the contact book
 * and generating an unique id for all contact
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let contactSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true }
})

//passing the contact and the scontact book schema
module.exports = mongoose.model('Contact', contactSchema);