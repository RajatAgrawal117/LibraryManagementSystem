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
    account : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
});

module.exports = mongoose.model('User', userSchema);