const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publication: String,
  genre: {
    type:String,
    required:true
  },
  quantity: {
    type: Number,
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
