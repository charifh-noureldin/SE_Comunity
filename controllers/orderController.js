const Order = require('../models/order');
const User = require('../models/user');
const Comment = require('../models/comment');

const order_details = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    // const user = await User.findById(order.user);
    // const comments = await Comment.find({ order: req.params.id });
    res.render('details', { order: order, title: 'Order details' , user: req.user, comments: order.comments});
  } catch (err) {
    res.render('404', { title: 'Order not found' });
  }
};

// const order_update = async (req, res, data) => {
//   try {
//     const order = await Order.findOneAndUpdate({ _id: req.params.id },
//       {
//         $set: {
//           description: data.description,
//         }
//       }, { useFindAndModify: false });
//     // res.redirect('/orders');
//     // const user = await User.findById(order.user);
//     // const comments = await Comment.find({ order: req.params.id });
//     res.json({ redirect: '/orders'});
//   } catch (err) {
//     res.render('404', { title: 'Order not found' });
//   }
// };


const order_create_get = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('new-order', { title: 'Create order', users: users });
  } catch (err) {
    res.render('404', { title: 'Order not found' });
  }
};

const order_create_post = async(req, res) => {
  try { 
    const newOrdre = await Order.create(req.body);
    res.redirect('/orders');
  } catch (err) {
    res.render('new-order', { title: 'Create a new order' });
  }
};

const order_delete = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/orders' });
  } catch (err) {
    res.render('404', { title: 'Order not found' });
  }
};

const order_get_all = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render('orders', { orders: orders, title: 'Orders' });
  } catch (err) {
    res.render('404', { title: 'Order not found' });
  }
};

// const add_comment = (req, res) => {
//   const comment = new Comment({
//     studentid: User.findById(req.body.studentid),
//     comment: req.body.comment
//   });
//   comment.save((err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     Order.findById(req.params.id, (err, order) => { 
//       if (err) {
//         console.log(err);
//       }
//       order.comments.push(comment);
//       order.save();
//       res.redirect('/orders/' + req.params.id);
//       });
//     });
//     res.redirect('/orders/' + req.params.id);
//   }
  


module.exports = {
  order_details, 
  order_create_get, 
  order_create_post, 
  order_delete,
  order_get_all,
  // order_update,
  // add_comment,
}