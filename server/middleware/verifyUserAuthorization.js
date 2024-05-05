// const Order = require('../model/order.model');

// const verifyUserAuthorization = async (req, res, next) => {
//   try {
//     // Extract user ID from JWT token
//     const userId = req.user.id;

//     // Extract order ID from request parameters or body
//     const orderId = req.params.orderId || req.body.orderId;

//     // Check if the user has permission to access the order
//     const order = await Order.findOne({ _id: orderId, user: userId });

//     if (!order) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }

//     // Pass user and order details to the next middleware or route handler
//     req.order = order;
//     next();
//   } catch (error) {
//     console.error('Error verifying user authorization:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = verifyUserAuthorization;
