const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const OrderItemSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  amount: Number,
});

const orderSchema = new Schema({
  items: [OrderItemSchema],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);
module.exports = Order;
