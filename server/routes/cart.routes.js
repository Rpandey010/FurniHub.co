const express = require("express");
const router = express.Router();
const cartController = require('../controller/cart.controller');

// Endpoint for adding product to cart
router.post('/addtocart', cartController.addToCart);

// Endpoint for removing product from cart
router.post('/removefromcart', cartController.removeFromCart);

// Endpoint for getting user's cart
router.post('/getcart', cartController.getCart);

module.exports = router;
