// routes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');

// Route to save an order
router.post('/', orderController.saveOrder);

// Route to fetch order history
router.get('/history', orderController.getOrderHistory);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const verifyUserAuthorization = require('../middleware/verifyUserAuthorization');
// const orderController = require('../controller/order.controller');

// // Save an order route
// router.post('/', verifyUserAuthorization, orderController.saveOrder);

// // Get order history route
// router.get('/history', verifyUserAuthorization, orderController.getOrderHistory);

// // Other routes...

// module.exports = router;
