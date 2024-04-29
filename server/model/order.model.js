const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  billingAddress: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    pincode: { type: String, required: true },
    country: { type: String, required: true }
  },
  shippingAddress: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    pincode: { type: String, required: true },
    country: { type: String, required: true }
  },
  orderId: { type: String, required: true }, // Add orderId field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
