const mongoose = require("mongoose") ;

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require : true,
    },
    email: {
        type: String,
        unique: true,
        require : true
    },
    firstname: {
        type: String,
        // require : true
    },
    lastname: {
        type: String,
        // require : true
    },
    password: {
        type: String,
        require : true
    },
    accountType: {
        type: String,
        enum: ["Admin", "User", "Libarian"],
        required: true,
    },
    // account : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Account'
    // },
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
    history_borrowed_books: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    }],
    reserved_books: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book' 
    }]
});

module.exports = mongoose.model('User', userSchema);