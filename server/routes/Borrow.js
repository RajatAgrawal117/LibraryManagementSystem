const express = require('express');
const router = express.Router();
const { borrowBook } = require('../controllers/borrowController');
const {auth, isUser} = require("../middleware/auth");

// Borrow a book
router.post('/borrow', auth , isUser , borrowBook);

module.exports = router;
