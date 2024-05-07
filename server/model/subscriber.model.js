// Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
