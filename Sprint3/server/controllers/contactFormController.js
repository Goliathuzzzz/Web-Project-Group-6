const ContactForm = require('../models/contactFormModel');
const mongoose = require('mongoose');

const getAllContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find({}).sort({ createdAt: -1 });
    res.status(200).json(contactForms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get contact forms' });
  }
};

const createContactForm = async (req, res) => {
  try {
    const newContactForm = await ContactForm.create({ ...req.body });
    res.status(201).json(newContactForm);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create contact form', error: error.message });
  }
};

const getContactFormById = async (req, res) => {
  const { contactFormId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactFormId)) {
    return res.status(400).json({ message: 'Invalid contact form ID' });
  }

  try {
    const contactForm = await ContactForm.findById(contactFormId);
    if (contactForm) {
      res.status(200).json(contactForm);
    } else {
      res.status(404).json({ message: 'Contact form not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contact form' });
  }
};

module.exports = {
  getAllContactForms,
  createContactForm,
  getContactFormById,
};