const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/new-order', orderController.order_create_get);
router.get('/index', orderController.order_index);
router.get('/orders', orderController.order_get_all);
router.post('/orders', orderController.order_create_post);
router.get('/orders/:id', orderController.order_details);
router.delete('/orders/:id', orderController.order_delete);

module.exports = router;