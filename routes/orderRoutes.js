const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/new-order', orderController.order_create_get);
router.get('/', orderController.order_index);
router.post('/', orderController.order_create_post);
router.get('/:id', orderController.order_details);
router.delete('/:id', orderController.order_delete);

module.exports = router;