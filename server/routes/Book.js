const express = require('express');
const router = express.Router();

const { addBook, updateBook, deleteBook, getBooks } = require('../controllers/bookController');

// Add a book
router.post('/book', addBook);

// Update a book
router.put('/book/:id', updateBook);

// Delete a book
router.delete('/book/:id', deleteBook);

// Get all books
router.get('/books', getBooks);

module.exports = router;