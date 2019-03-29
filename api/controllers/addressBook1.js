const Contact = require('../models/contact');
const mongoose = require('mongoose');

const contactService = require('../services/contact_services');

exports.list = function (resquest, response) {
    const resolve = (docs) => {

        const resp = {
            count: docs.length,
            contacts: docs.map(doc => {
                return{
                    fname: doc.fname,
                    lname: doc.lname,
                    email: doc.email,
                    number: doc.number,
                    _id: doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/addressBook/' + doc._id
                    } 
                }
            })
        };

        response.status(200);
        response.json(resp);
    };
    contactService.search({}).then(resolve)
};

exports.post = function(request,response) {
    const resolve = (result) => {
        console.log(result);
        response.status(201).json({
            message: 'Created contact successfully',
            createdContact: {
                fname: result.fname,
                lname: result.lname,
                email: result.email,
                number: result.number,
                _id: result._id,
                request: {
                    type:'GET',
                    url: 'http://localhost:3000/addressBook/' + result._id
                }
            }
        });
    };
    const new_contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        fname: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        number: request.body.number
    });
    contactService.save(new_contact).then(resolve);
};

exports.get = function(request,response) {

    console.log(request.params.contactId);
    const resolve = (contact) => {
        response.status(200).json({
            contact: contact,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/addressBook/'
            }
        });
    };
    contactService.get(request.params.contactId).then(resolve);
};


exports.put = function(request,response) {

    console.log(request.params.contactId);
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    const resolve = (result) => {
        response.status(200).json({
            message: 'Contact updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/addressBook/' + id
            }
        });
    };
    contactService.update(request.params.contactId,updateOps).then(resolve);
};

exports.delete = function(request,response) {

    console.log(request.params.contactId);

    const resolve = (result) => {
        response.status(200).json({
            message: 'Contact deleted',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/addressBook/',
                body: { fname: 'String', lname: 'String', email: 'String', number: 'Number'}
            }
        });
    };
    contactService.deleteOne(request.params.contactId).then(resolve)
};








exports.to_update_contact = (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Contact.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Contact updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/addressBook/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.to_delete_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Contact deleted',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/addressBook/',
                body: { fname: 'String', lname: 'String', email: 'String', number: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}