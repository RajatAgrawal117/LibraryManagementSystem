const express = require('express');
const router = express.Router();
const { borrowBook } = require('../controllers/borrowController');
const {auth, isUser} = require("../middleware/auth");
const {returnBook} = require("../controllers/returnController");

// Borrow a book
router.post('/borrow', auth , isUser , borrowBook);
router.post('/return', auth , isUser , returnBook);

module.exports = router;
