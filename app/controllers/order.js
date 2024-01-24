const Order = require("../models/order");
const {
  isEnoughToSupply,
  decreaseQuantity,
  getBookPrice,
} = require("../services/book");
const {
  createOrder,
  MaxPriceOrder,
  top3Geners,
  IncomeByDates,
  top5AuthorsByDates,
} = require("../services/order");
module.exports = {
  createOrder: async (req, res) => {
    try {
      const items = req.body.items;
      let total = 0;
      promiseArr = items.map((i) => isEnoughToSupply(i.bookId, i.amount));
      const arr = await Promise.all(promiseArr);
      const falseItems = arr.filter((item) => item === false);
      if (falseItems.length > 0) {
        return res.status(400).json({ message: "no quantity to supply" });
      }
      for (let j = 0; j < items.length; j++) {
        i = items[j];
        await decreaseQuantity(i.bookId, i.amount);
        total += (await getBookPrice(i.bookId)) * i.amount;
      }

      await Promise.all(promiseArr);
      const newOrder = await createOrder({
        items: items,
        totalPrice: total,
      });
      res.json(newOrder);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getMaxPrice: async (req, res) => {
    const { start, end } = req.query;

    try {
      const order = await MaxPriceOrder(parseInt(start), parseInt(end));
      if (!order) return res.status(404).json({ error: "not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  top3Geners: async (req, res) => {
    try {
      const { start, end } = req.query;
      if (!start || !end)
        return res
          .status(400)
          .json({ error: "start/end has not been entered" });
      const top3 = await top3Geners(start, end);
      if (!top3)
        return res
          .status(400)
          .json({ error: "couldn't find top 3 generes for specific dates" });
      res.json(top3);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  IncomeByDates: async (req, res) => {
    try {
      const { start, end } = req.query;
      if (!start || !end)
        return res
          .status(400)
          .json({ error: "start/end has not been entered" });
      const income = await IncomeByDates(start, end);
      if (!income)
        return res
          .status(400)
          .json({ error: "couldn't find income for specific dates" });
      res.json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  top5AuthorsByDates: async (req, res) => {
    try {
      const { start, end } = req.query;
      if (!start || !end)
        return res
          .status(400)
          .json({ error: "start/end has not been entered" });
      const authors = await top5AuthorsByDates(start, end);
      if (!authors)
        return res.status(400).json({
          error: "couldn't find top 5 selling authors for specific dates",
        });
      res.json(authors);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
