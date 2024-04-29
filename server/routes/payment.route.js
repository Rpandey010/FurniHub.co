// payment.route.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');

router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    const order = await paymentController.createOrder(amount, currency, receipt);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post('/verify-payment', async (req, res) => {
//   const { paymentId, orderId, amount, email, products } = req.body;
//   try {
//     const result = await paymentController.verifyPayment(paymentId, orderId, amount);
//     if (result) {
//       // Payment successful, send email and save payment details
//       // await paymentController.sendEmail(email, 'Payment Confirmation', 'Your payment was successful!');
//       // await paymentController.savePaymentDetails(orderId, paymentId, amount, req.body.products);
//       await paymentController.handleSuccessfulPayment(email, orderId, paymentId, amount, products);

//     }
//     res.json({ verified: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post('/verify-payment', async (req, res) => {
  const { paymentId, orderId, amount, email, products } = req.body;
  try {
    const result = await paymentController.verifyPayment(paymentId, orderId, amount);
    if (result) {
      // Payment successful, handle it
      await paymentController.handlePaymentSuccess(email, amount, orderId, paymentId, products);
    }
    res.json({ verified: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
