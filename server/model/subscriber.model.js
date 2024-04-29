const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true // Ensure each email is unique
    }
  });

module.exports = mongoose.model('Subscriber', subscriberSchema);