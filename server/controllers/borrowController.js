const axios = require('axios');
const Book = require('../models/Book');
const User = require('../models/User');

const borrowBook = async (req, res) => {
    const { userId, isbn } = req.body;

    // Fetch book details from Google Books API
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const bookData = response.data.items[0].volumeInfo;

    // Check if the book is already available in the database
    let existingBook = await Book.findOne({ isbn: bookData.industryIdentifiers[0].identifier });
    // console.log( "existing book " ,existingBook);

    if (existingBook) { 
        if (existingBook.availableQuantity > 0) {
            existingBook.availableQuantity -= 1;
            existingBook.borrowed = true;
            existingBook.borrowDate = new Date();
            existingBook.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks later
            await existingBook.save();
            
            const user = await User.findById(userId);
            // console.log("user", user);
            user.borrowed_books.push(existingBook._id);
            user.no_borrowed_books += 1;
            await user.save();
            
            res.status(201).send("Book borrowed successfully");
        } else {
            res.status(400).send("Book not available");
        }
    } else {
        // Create a new Book entry in our database
        const newBook = new Book({
            title: bookData.title,
            author: bookData.authors.join(', '),
            isbn: bookData.industryIdentifiers[0].identifier,
            thumbnail: bookData.imageLinks.thumbnail,
            genre: bookData.categories,
            availableQuantity: 10, // Since it is being borrowed immediately
            user: userId,
            borrowed: true,
            borrowDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks later
        });

        await newBook.save();

        // Update user's account
        const user = await User.findById(userId);
        user.borrowed_books.push(newBook._id);
        user.no_borrowed_books += 1;
        await user.save();

        res.status(201).send("Book borrowed successfully"); 
    }
};

module.exports = { borrowBook };
