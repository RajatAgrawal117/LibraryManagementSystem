const Book = require('../models/Book');
const User = require('../models/User');

const returnBook = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }

        // Check if the user has borrowed this book
        const borrowedBookIndex = user.borrowed_books.indexOf(bookId);
        if (borrowedBookIndex === -1) {
            return res.status(400).send("This book was not borrowed by the user");
        }

        // Update book quantity
        book.availableQuantity += 1;
        book.borrowed = false;
        book.borrowDate = null;
        book.dueDate = null;
        await book.save();

        // Update user's borrowed books list and count
        user.borrowed_books.splice(borrowedBookIndex, 1);
        user.no_borrowed_books -= 1;
        await user.save();

        res.status(200).send("Book returned successfully");
    } catch (error) {
        console.error("Error returning book:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { returnBook };
