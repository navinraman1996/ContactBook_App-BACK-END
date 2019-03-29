'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let contactSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true }
})



// const mongoose = require('mongoose');

// const contactSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     fname: { type: String, required: true },
//     lname: { type: String, required: true },
//     email: { type: String, required: true },
//     number: { type: Number, required: true }
// });

module.exports = mongoose.model('Contact', contactSchema);