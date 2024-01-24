const controller = require("../controllers/order");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.post("/createOrder", controller.createOrder);
router.get("/getMaxPriceOrder", controller.getMaxPrice);
router.get("/getTop3Geners", controller.top3Geners);
router.get("/getIncomeByDates", controller.IncomeByDates);
router.get("/getTop5AuthorsByDates", controller.top5AuthorsByDates);
module.exports = router;
