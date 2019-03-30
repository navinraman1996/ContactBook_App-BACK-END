const Contact = require('../models/contact').default;
const mongoose = require('mongoose');

const contactService = require('../services/contact_services');

/**
 * function for getting all the contacts from the database
 * 
 * @param request: catch will take it
 * @param response : then will ctach it
 */
exports.list = function (resquest, response) {
    const resolve = (docs) => {

        // const resp = {
        //     count: docs.length,
        //     contacts: docs.map(doc => {
        //         return{
        //             fname: doc.fname,
        //             lname: doc.lname,
        //             email: doc.email,
        //             number: doc.number,
        //             _id: doc._id,
        //             request:{
        //                 type: 'GET',
        //                 url: 'http://localhost:3000/addressBook/' + doc._id
        //             } 
        //         }
        //     })
        // };

        response.status(200);
        response.json(docs);
    };
    contactService.search({}).then(resolve)
};

/**
 * function to post a data to the database
 * 
 * @param request: catch will take it
 * @param response : then will ctach it
 */
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

/**
 * function to get a specific data from the database
 * 
 * @param request: catch will take it
 * @param response : then will ctach it
 */
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

/**
 * function to update an data to the database
 * 
 * @param request: catch will take it
 * @param response : then will ctach it
 */
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

/**
 * function to delete a data in the database
 * 
 * @param request: catch will take it
 * @param response : then will ctach it
 */
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