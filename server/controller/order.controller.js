// order.controller.js

const Order = require('../model/order.model');
const { sendEmailWithOrderHistory } = require('../mail/order.mail');
const Users = require('../model/user.model');

exports.saveOrder = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body

    const { products, billingAddress, shippingAddress, orderId, fullName, emailID } = req.body;

    const order = new Order({
      products,
      billingAddress,
      shippingAddress,
      orderId,
      fullName,
      emailID
    });

    await order.save();

    res.status(201).json({ message: 'Order saved successfully!' });
  } catch (error) {
    console.error('Error saving order:', error); // Log any errors that occur
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { fullName, emailID } = req.query; 
    if (!fullName || !emailID) {
      return res.status(400).json({ error: 'Full name and email ID are required.' });
    }
    const orders = await Order.find({ fullName, emailID }).sort('-createdAt');

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the provided full name and email ID.' });
    }
        sendEmailWithOrderHistory(fullName, emailID, orders);

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Users.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ success: false, message: "Email ID not found." });
      }
      return res.json({ success: true, message: "Email ID found." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
  }
};

