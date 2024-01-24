const Order = require("../models/order");

module.exports = {
  createOrder: async (order) => {
    const result = await Order.create(order);
    return result;
  },
  MaxPriceOrder: async (start, end) => {
    return Order.find({ date: { $gte: new Date(start), $lte: new Date(end) } })
      .sort({ totalPrice: -1 })
      .limit(1);
  },
  top3Geners: async (start, end) => {
    return Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(Number(start)),
            $lte: new Date(Number(end)),
          },
        },
      },
      {
        $unwind: {
          path: "$items",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: {
          path: "$book",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$book.geners",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$book.geners",
          totalAmount: {
            $sum: "$items.amount",
          },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
  },
  IncomeByDates: async (start, end) => {
    return Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(Number(start)),
            $lte: new Date(Number(end)),
          },
        },
      },
      {
        $group: {
          _id: `total income by dates ${new Date(Number(start))} to ${new Date(
            Number(end)
          )}`,
          Income: { $sum: "$totalPrice" },
        },
      },
    ]);
  },
  top5AuthorsByDates: async (start, end) => {
    return Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(Number(start)),
            $lte: new Date(Number(end)),
          },
        },
      },
      {
        $unwind: {
          path: "$items",
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: {
          path: "$book",
        },
      },
      {
        $unwind: {
          path: "$book.authors",
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "book.authors",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $group: {
          _id: "$author.name",
          totalOrders: {
            $sum: "$items.amount",
          },
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
  },
};
