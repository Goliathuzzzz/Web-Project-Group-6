const express = require('express');
const router = express.Router();
const {
  getAllContactForms,
  createContactForm,
  getContactFormById,
} = require('../controllers/contactFormController');

// GET /contact
router.get('/', getAllContactForms);

// GET /contact/<id>
router.get('/:contactFormId', getContactFormById);

// POST /contact
router.post('/', createContactForm);

module.exports = router;
