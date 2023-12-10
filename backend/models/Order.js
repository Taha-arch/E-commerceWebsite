const mongoose = require("mongoose");
var uuid = require("node-uuid");

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, default: uuid.v1 },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  order_items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number },
      product_name: { type: String, default: null },
    },
  ],
  cart_total_price: { type: mongoose.Types.Decimal128 },
  address: { type: String },
  city: { type: String },
  postal_code: { type: Number },
  PaymentMethod: { type: String, default: "Cash On Delivery" },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: "PROCESSING" },
})

module.exports = mongoose.model("Order", OrderSchema);
