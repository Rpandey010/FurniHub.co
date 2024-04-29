// payment.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Define _id field explicitly
  name: String,
  price: Number,
  quantity: Number
});

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  products: [productSchema], // Use the productSchema for products array
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
