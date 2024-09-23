const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  messages: [
    {
      senderId: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      replyTo: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the message being replied to
        ref: 'Chat.messages', // Reference to the chat messages
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model('Chat', ChatSchema);
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//     senderId: String,
//     text: String,
//     timestamp: {
//         type: Date,
//         default: Date.now
//     }
// });

// const chatSchema = new Schema({
//     productId: Number,
//     userId: String,
//     sellerId: String,
//     messages: [messageSchema]
// });

// module.exports = mongoose.model('Chat', chatSchema);
