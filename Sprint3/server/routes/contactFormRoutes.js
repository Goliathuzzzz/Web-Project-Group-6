const express = require('express');
const router = express.Router();
const {
  getAllContactForms,
  createContactForm,
  getContactFormById,
  deleteContactForm,
} = require('../controllers/contactFormController');
const { authenticateToken } = require('../middleware/auth');


// GET /contact
router.get('/', authenticateToken, getAllContactForms);

// GET /contact/<id>
router.get('/:contactFormId', authenticateToken, getContactFormById);

// POST /contact
router.post('/', createContactForm);

// DELETE /contact/<id>
router.delete('/:contactFormId', authenticateToken, deleteContactForm);

module.exports = router;
