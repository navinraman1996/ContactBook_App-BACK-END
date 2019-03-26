const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
    Contact.find()
    .select('fname lname email number _id')
    .exec()
    .then(docs => {
        const response = {
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
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post("/", (req, res, next) => {
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
            createdContact: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
});

router.get('/:contactId', (req, res, next) => { 
    const id = req.params.contactId;
    Contact.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found for provided Id'});
        }
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.put('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Contact.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    Contact.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
 