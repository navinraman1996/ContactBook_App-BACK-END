const Contact = require('../models/contact');
const mongoose = require('mongoose');

exports.contacts_get_all = (req, res, next) => {
    Contact.find()
    .select('fname lname email number _id')
    .exec()
    .then(docs => {
        // const response = { 
        //     // count: docs.length,
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
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// exports.contacts_get_byid = (req, res, next) => {
//     Contact.find()
//     .select('fname lname email number _id')
//     .exec()
//     .then(docs => {
//         const response = {
//             count: docs.length,
//             contacts: docs.map(doc => {
//                 return{
//                     fname: doc.fname,
//                     lname: doc.lname,
//                     email: doc.email,
//                     number: doc.number,
//                     _id: doc._id,
//                     request:{
//                         type: 'GET',
//                         url: 'http://localhost:3000/addressBook/id' + doc._id
//                     } 
//                 }
//             })
//         };
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// }

exports.contact_create = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        number: req.body.number
    });
    contact
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
}

exports.to_get_contact = (req, res, next) => { 
    const id = req.params.contactId;
    Contact.findById(id)
    .select('fname lname email number _id')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                contact: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/addressBook/'
                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided Id'});
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

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