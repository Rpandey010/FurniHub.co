// auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require('../controller/auth.controller');

// Define routes for authentication

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/auth/google', authController.googleLogin);

module.exports = router;
