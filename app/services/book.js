const Author = require("../models/author");
const Book = require("../models/book");

module.exports = {
  createBooks: async (books) => {
    const result = await Book.create(books);
    return result;
  },
  deleteBook: async (id) => {
    return Book.deleteOne({ _id: id });
  },
  getAllBooks: async (pageN) => {
    return Book.find({})
      .skip(pageN * 10)
      .limit(10);
  },
  getAllBooksByAuthor: async (pageN, authorId) => {
    return Book.find({ authors: authorId })
      .skip(pageN * 10)
      .limit(10);
  },
  getAllBooksByValue: async (pageN, value) => {
    return Book.find({ title: { $regex: value, $options: "i" } })
      .skip(pageN * 10)
      .limit(10);
  },
  getAllBooksByGenre: async (pageN, genre) => {
    return Book.find({ geners: genre })
      .skip(pageN * 10)
      .limit(10);
  },
  getAllBooksByYearRange: async (pageN, startY, endY) => {
    return Book.find({ publishingYear: { $gte: startY, $lte: endY } })
      .skip(pageN)
      .limit(10);
  },
  getAllBooksByCountry: async (pageN, country) => {
    const authorsInCountry = await Author.find({ country });
    const authorsIds = authorsInCountry.map((a) => a._id);
    return Book.find({ authors: { $in: authorsIds } })
      .skip(pageN)
      .limit(10);
  },
  isEnoughToSupply: async (bookId, amount) => {
    console.log(bookId);
    const book = await Book.findById(bookId);
    console.log(book.quantity + " " + amount + " " + (amount <= book.quantity));
    return amount <= book.quantity;
  },
  decreaseQuantity: async (bookId, amount) => {
    return Book.findByIdAndUpdate(bookId, {
      $inc: { quantity: -amount },
    });
  },
  getBookPrice: async (bookId) => {
    const book = await Book.findById(bookId);
    return book.price;
  },
};
