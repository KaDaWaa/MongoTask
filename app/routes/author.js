const controller = require('../controllers/author');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.patch('/:id', cacheNoStore, controller.updateAuthor);
router.post('/', cacheNoStore, controller.createAuthor);


module.exports = router;