const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'

  }]
  // file: {
  //   type: Buffer,
  //   contentType: String,
  //   required: false
  // },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;