// orderProductRoutes.js

const express = require('express');
const router = express.Router();
const orderProductController = require('../controller/orderProduct.Controller');

// POST request to create order products
router.post('/', orderProductController.createOrderProducts);

module.exports = router;
