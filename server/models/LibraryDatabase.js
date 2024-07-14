const mongoose = require('mongoose');

const libraryDatabaseSchema = new mongoose.Schema({
    list_of_books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('LibraryDatabase', libraryDatabaseSchema);
