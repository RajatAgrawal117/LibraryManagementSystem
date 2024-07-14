const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    thumbnail: String,
    genre: [String],
    availableQuantity: { type: Number, default: () => 10 },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    borrowed: { 
        type: Boolean, 
        default: false 
    },
    borrowDate: Date,
    dueDate: Date
});

module.exports = mongoose.model('Book', bookSchema);
