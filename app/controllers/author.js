const { createAuthor, updateAuthor } = require("../services/author");

module.exports = {
  createAuthor: async (req, res) => {
    try {
      const author = req.body;
      const newAuthor = await createAuthor(author);
      res.json(newAuthor);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateAuthor: async (req, res) => {
    const { id } = req.params;
    const newAuthorFields = req.body;
    try {
      const updatedAuthor = await updateAuthor(id, newAuthorFields);

      if (!updatedAuthor) return res.status(404).json({ error: "not found" });

      res.json(updatedAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
