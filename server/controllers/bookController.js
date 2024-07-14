const axios = require('axios');
const Book = require('../models/Book');

const addBook = async (req, res) => {
    const { isbn, quantity } = req.body;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const bookData = response.data.items[0].volumeInfo;
    const newBook = new Book({
        title: bookData.title,
        author: bookData.authors.join(', '),
        ISBN: isbn,
        publisher: bookData.publisher,
        year: bookData.publishedDate,
        genre: bookData.categories.join(', '),
        quantity: quantity,
    });
    await newBook.save();
    res.status(201).send("Book added successfully");
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    await Book.findByIdAndUpdate(id, updatedData, { new: true });
    res.send("Book updated successfully");
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.send("Book deleted successfully");
};

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

module.exports = { addBook, updateBook, deleteBook, getBooks };
