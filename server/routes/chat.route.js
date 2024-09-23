// const express = require('express');
// const router = express.Router();
// const chatController = require('../controller/chat.controller');

// // Route to create a new chat
// router.post('/create', chatController.createChat);

// // Route to send a message
// router.post('/send', chatController.sendMessage);

// // Route to get all messages for a chat
// router.get('/messages', chatController.getMessages);

// module.exports = router;

const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");

// Route to create a new chat
router.post("/create", chatController.createChat);

// Route to send a message
router.post("/send", chatController.sendMessage);
router.get("/messages", chatController.getMessages);
router.get("/product/:productId/messages", chatController.getMessages);

// chat.route.js
// router.get('/product/:productId/messages', chatController.getMessagesForProduct);

// Route to get all messages for a specific product
// router.get('/product/:productId/messages', chatController.getMessagesForProduct);  // Using productId here

module.exports = router;
