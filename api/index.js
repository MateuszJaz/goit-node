const express = require('express');
const router = express.Router();
const validate = require('../utils/validators/validator');
const ctrlContact = require('../controller/controller');

router.get('/contacts', ctrlContact.get);

router.get('/contacts/:contactId', ctrlContact.getById);

router.post('/contacts', validate.createContact, ctrlContact.addContact);

router.put(
  '/contacts/:contactId',
  validate.updateContact,
  ctrlContact.updateContact
);

router.patch(
  '/contacts/:contactId/favorite',
  validate.updateStatus,
  ctrlContact.updateContact
);

router.delete('/contacts/:contactId', ctrlContact.deleteContact);

module.exports = router;
