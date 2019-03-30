// const express = require('express');
// const router = express.Router();
// const ContactController = require('../controllers/addressBook1');

module.exports = (app) => {
    const contactBookController = require('../controllers/addressBook1');

    app.route('/addressBook').get(contactBookController.list).post(contactBookController.post);

    app.route('/addressBook/:contactId').get(contactBookController.get);

    // router.get('/:contactId', ContactController.to_get_contact);
    // router.put('/:contactId', ContactController.to_update_contact);
    // router.delete('/:contactId', ContactController.to_delete_contact);
};