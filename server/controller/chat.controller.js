// const Chat = require('../model/chat.model');
// const Product = require('../model/product.model');

// exports.createChat = async (req, res) => {
//   const { productId, userId, sellerId } = req.body;

//   try {
//     const chat = new Chat({ productId, userId, sellerId, messages: [] });
//     await chat.save();
//     res.json({ success: true, chat });
//   } catch (error) {
//     console.error('Error creating chat:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // exports.sendMessage = async (req, res) => {
// //   const { productId, senderId, message } = req.body;

// //   try {
// //     const chat = await Chat.findOne({ productId: productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'Chat not found' });
// //     }

// //     chat.messages.push({ senderId, message });
// //     await chat.save();
// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error sending message:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// // exports.sendMessage = async (req, res) => {
// //   const { productId, senderId, message } = req.body;

// //   try {
// //     const chat = await Chat.findOne({ productId: productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'Chat not found' });
// //     }

// //     chat.messages.push({ senderId, message });
// //     await chat.save();
// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error sending message:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// // chat.controller.js
// exports.sendMessage = async (req, res) => {
//   const { productId, senderId, message } = req.body;

//   try {
//     const chat = await Chat.findOne({ productId });
//     if (!chat) {
//       return res.status(404).json({ success: false, message: 'Chat not found' });
//     }

//     chat.messages.push({ senderId, message });
//     await chat.save();
//     res.json({ success: true, messages: chat.messages });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getMessages = async (req, res) => {
//   const { productId } = req.query;

//   try {
//     const chat = await Chat.findOne({ productId: productId });
//     if (!chat) {
//       return res.status(404).json({ success: false, message: 'Chat not found' });
//     }

//     res.json({ success: true, messages: chat.messages });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // Fetch chat messages for a specific product
// // exports.getMessagesForProduct = async (req, res) => {
// //   const { productId } = req.params;

// //   try {
// //     // Find the product by productId to ensure it exists
// //     const product = await Product.findOne({ id: productId });
// //     if (!product) {
// //       return res.status(404).json({ success: false, message: 'Product not found' });
// //     }

// //     // Find the chat messages related to the specific product
// //     const chat = await Chat.findOne({ productId: productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'No chat found for this product' });
// //     }

// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error fetching messages for product:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };
// // chat.controller.js
// // exports.getMessagesForProduct = async (req, res) => {
// //   const { productId } = req.params;

// //   try {
// //     const chat = await Chat.findOne({ productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'No chat found for this product' });
// //     }

// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error fetching messages for product:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Uncommented and updated functions to use exports

// // exports.createChat = async (req, res) => {
// //   const { productId, userId, sellerId, initialMessage } = req.body;
// //   try {
// //     const response = await fetch('http://localhost:4000/api/chat/create', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         productId,
// //         userId,
// //         sellerId,
// //         message: initialMessage, // First message
// //       }),
// //     });

// //     const chat = await response.json();
// //     console.log('Chat created:', chat);
// //     res.json(chat); // Send the created chat object as response
// //   } catch (error) {
// //     console.error('Error creating chat:', error);
// //     res.status(500).send('Error creating chat');
// //   }
// // };

// // exports.sendMessage = async (req, res) => {
// //   const { productId, senderId, message } = req.body;

// //   try {
// //     const chat = await Chat.findOne({ productId: productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'Chat not found' });
// //     }

// //     chat.messages.push({ senderId, message });
// //     await chat.save();
// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error sending message:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // exports.getMessages = async (req, res) => {
// //   const { productId } = req.query;

// //   try {
// //     const chat = await Chat.findOne({ productId: productId });
// //     if (!chat) {
// //       return res.status(404).json({ success: false, message: 'Chat not found' });
// //     }

// //     res.json({ success: true, messages: chat.messages });
// //   } catch (error) {
// //     console.error('Error fetching messages:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Example Usage:
// // createChat(1, 'user124', 'seller456', 'Hello, I am interested in this product.');

// // fetchChat(1, 'user124', 'seller456');

// // addMessage('60c72b2f4f1c4c4d8c8b4567', 'user123', 'Is this product still available?');

const Chat = require("../model/chat.model");
const Product = require("../model/product.model");
const multer = require("multer");
const path = require("path");

exports.createChat = async (req, res) => {
  const { productId, userId, sellerId } = req.body;

  try {
    const chat = new Chat({ productId, userId, sellerId, messages: [] });
    await chat.save();
    res.json({ success: true, chat });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.sendMessage = async (req, res) => {
//   const { productId, senderId, message } = req.body;

//   try {
//     const chat = await Chat.findOne({ productId: productId });
//     if (!chat) {
//       return res.status(404).json({ success: false, message: 'Chat not found' });
//     }

//     chat.messages.push({ senderId, message });
//     await chat.save();
//     res.json({ success: true, messages: chat.messages });
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
//new send message
exports.sendMessage = async (req, res) => {
  const { productId, senderId, message, replyTo } = req.body;

  try {
    const chat = await Chat.findOne({ productId: productId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    chat.messages.push({ senderId, message, replyTo });
    await chat.save();
    res.json({ success: true, messages: chat.messages });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.getMessages = async (req, res) => {
//   const { productId } = req.params; // Changed from req.query to req.params

//   try {
//     const chat = await Chat.findOne({ productId: productId });
//     if (!chat) {
//       return res.status(404).json({ success: false, message: 'Chat not found' });
//     }

//     res.json({ success: true, messages: chat.messages });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.getMessages = async (req, res) => {
  console.log("Received productId:", req.query.productId); // Log the productId to confirm it's being sent correctly
  const { productId } = req.query;

  try {
    const chat = await Chat.findOne({ productId });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.json({ success: true, messages: chat.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
