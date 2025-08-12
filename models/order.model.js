const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      // unitPrice: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enums: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  CreatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("OrdersCollection", orderSchema);
