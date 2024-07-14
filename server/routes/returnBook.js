const express = require('express');
const router = express.Router();
const { returnBook } = require('../controllers/returnController');

router.post('/return', returnBook);

module.exports = router;
