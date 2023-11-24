const mongoose = require('mongoose');
var uuid = require('node-uuid');


const OrderSchema = new mongoose.Schema({
  order_id: { type: String, default: uuid.v1 },
  customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
  },
  order_items: [{
    product_id: { type: String },
    quantity: { type: Number },
  }],
  order_date: { type: Date, default: Date.now },
  cart_total_price: { type: mongoose.Types.Decimal128 },
  status: { type: String, default: 'Open' },
});



  module.exports = mongoose.model("Order", OrderSchema);