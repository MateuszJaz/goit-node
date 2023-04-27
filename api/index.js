const express = require('express');
const router = express.Router();
const validate = require('../utils/validator');
const contactController = require('../controller/controller.js');
const auth = require('../config/authMiddleware.js');
const Contact = require('../service/schemas/contact.js');
const paginatedResults = require('../utils/pagination.js');

router.get('/', auth, paginatedResults(Contact), contactController.get);

router.get('/:contactId', contactController.getById);

router.post('/', auth, validate.createContact, contactController.addContact);

router.delete('/:contactId', contactController.deleteContact);

router.put(
  '/:contactId',
  validate.updateContact,
  contactController.updateContact
);

router.patch(
  '/:contactId/favorite',
  validate.updateStatus,
  contactController.updateContactStatus
);

module.exports = router;
