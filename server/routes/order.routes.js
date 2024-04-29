// routes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');

// Route to save an order
router.post('/', orderController.saveOrder);

module.exports = router;
