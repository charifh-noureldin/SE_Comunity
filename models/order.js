const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  // file: {
  //   type: binData,
  //   required: false
  // },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;