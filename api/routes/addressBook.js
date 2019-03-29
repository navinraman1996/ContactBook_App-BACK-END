const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/addressBook');

router.get('/', ContactController.contacts_get_all);

router.get('/', ContactController.contacts_get_byid);

router.post("/", ContactController.contact_create);

router.get('/:contactId', ContactController.to_get_contact);

router.put('/:contactId', ContactController.to_update_contact);

router.delete('/:contactId', ContactController.to_delete_contact);

module.exports = router;
 