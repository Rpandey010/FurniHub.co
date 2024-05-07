const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');

// Create a new product
router.post("/addproduct", productController.createProduct);

// Remove a product
router.post("/removeproduct", productController.removeProduct);

// Get all products
router.get("/allproducts", productController.getAllProducts);

// Get new collections
router.get("/newcollections", productController.getNewCollections);

// Get popular products in women's category
router.get("/popularinwomen", productController.getPopularInWomen);

// Search for a product
router.get("/search", productController.searchProductByName);

// Get all products by user email ID
router.get("/allproductsbyuser", productController.getAllProductsByUser); // Add this route

router.put("/updateproduct", productController.updateProduct);

module.exports = router;
