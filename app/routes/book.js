const controller = require("../controllers/book");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.delete("/:id", cacheNoStore, controller.deleteBook);
router.post("/", cacheNoStore, controller.createBooks);
router.get("/", controller.getAllBooksByQuery);

module.exports = router;
