const Order = require('../model/order.model');

// Function to save an order
exports.saveOrder = async (req, res) => {
  try {
    const { products, billingAddress, shippingAddress, orderId } = req.body; // Include orderId from request body

    // Create a new order instance
    const order = new Order({
      products,
      billingAddress,
      shippingAddress,
      orderId // Include orderId in the order data
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order saved successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
