const Order = require('../models/order');

const order_index = (req, res) => {
  Order.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { orders: result, title: 'All orders' });
    })
    .catch(err => {
      console.log(err);
    });
}

const order_details = (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then(result => {
      res.render('details', { order: result, title: 'Order Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Order not found' });
    });
}

const order_create_get = (req, res) => {
  res.render('new-order', { title: 'Create a new order' });
}

const order_create_post = (req, res) => {
  const order = new Order(req.body);
  order.save()
    .then((result) => {
      res.redirect('/orders');
    })
    .catch((err) => {
      console.log(err);
    });
};

const order_delete = (req, res) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: 'orders' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  order_index, 
  order_details, 
  order_create_get, 
  order_create_post, 
  order_delete
}