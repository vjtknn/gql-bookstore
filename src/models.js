const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  authorId: [String],
  pages: Number,
  publishDate: Date,
  publisher: String,
  status: String
});

const Book = new mongoose.model("Book", bookSchema);

module.exports = { Book };
