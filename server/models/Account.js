const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    no_borrowed_books: {
        type: Number,
        default: 0
    },
    no_reserved_books: {
        type: Number,
        default: 0
    },
    no_returned_books: {
        type: Number,
        default: 0
    },
    no_lost_books: {
        type: Number,
        default: 0
    },
    fine_amount: {
        type: Number,
        default: 0
    },
    borrowed_books: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    }],
    reserved_books: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    }]
});

module.exports = mongoose.model('Account', accountSchema);
