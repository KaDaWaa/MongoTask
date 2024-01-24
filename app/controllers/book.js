const Author = require("../models/author");
const {
  createBooks,
  deleteBook,
  getAllBooksByAuthor,
  getAllBooks,
  getAllBooksByValue,
  getAllBooksByGenre,
  getAllBooksByYearRange,
  getAllBooksByCountry,
} = require("../services/book");

module.exports = {
  createBooks: async (req, res) => {
    try {
      const books = req.body;
      const newBooks = await createBooks(books);
      res.json(newBooks);
    } catch {
      console.log(err);
      res.status(500).send(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const id = req.params;
      const deletedBook = await deleteBook(id);
      if (!deletedBook) return res.status(404).json({ error: "not found" });
      res.json(deletedBook);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllBooksByQuery: async (req, res) => {
    const { genre, author, value, startY, endY, country, pageN } = req.query;

    try {
      let allBooks;
      if (author) {
        allBooks = await getAllBooksByAuthor(pageN, author);
      } else if (genre) {
        allBooks = await getAllBooksByGenre(pageN, genre);
      } else if (value) {
        allBooks = await getAllBooksByValue(pageN, value);
      } else if (startY && endY) {
        allBooks = await getAllBooksByYearRange(pageN, startY, endY);
      } else if (country) {
        allBooks = await getAllBooksByCountry(pageN, country);
      } else {
        allBooks = await getAllBooks(pageN);
      }
      if (!allBooks)
        return res.status(404).json({ error: "not found or no queries" });
      res.json(allBooks);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
