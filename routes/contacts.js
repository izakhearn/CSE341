const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');

router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getOneContact);

module.exports = router;