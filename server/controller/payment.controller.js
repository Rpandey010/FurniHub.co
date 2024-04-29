// payment.controller.js
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const Payment = require('../model/payment.model');
const { sendPaymentSuccessEmail } = require('../mail/payment.mail');
// const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = require('./config');

const razorpay = new Razorpay({
    key_id: 'rzp_test_8ajPrNjHnqmPfp', 
    key_secret: 'UBe885walN9XxMjzoq9oLMJT', 
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
      user: 'furnihub.co@gmail.com', 
      pass: 'ilgmcjpdivdpnuis', 
    },
  });

async function createOrder(amount, currency, receipt) {
  try {
    const options = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: receipt,
    };
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error('Failed to create order');
  }
}

async function verifyPayment(paymentId, orderId, amount, products) {
    try {
        const payment = await razorpay.payments.fetch(paymentId);
        if (payment.order_id !== orderId) {
            throw new Error('Order ID does not match');
        }
        if (payment.amount !== amount *100) {
            throw new Error('Amount does not match');
        }

        // Payment verification successful
        return true;
    } catch (error) {
        throw new Error(`Payment verification failed: ${error.message}`);
    }
}


// async function sendEmail(to, subject, text) {
//   try {
//     await transporter.sendMail({
//       from: 'furnihub.co@gmail.com',
//       to: to,
//       subject: subject,
//       text: text,
//     });
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//   }
// }

async function savePaymentDetails(orderId, paymentId, amount, products) {
  try {
    let sanitizedProducts = [];
    if (Array.isArray(products)) {
      // If products is an array, sanitize it
      sanitizedProducts = products.map(product => {
        const { name, price, quantity } = product;
        return { name, price, quantity }; // Include name, price, and quantity in the sanitized product object
      });
    } else {
      // If products is not an array, log a warning and set sanitizedProducts to an empty array
      console.warn('Products are not in the expected format. Expected an array.');
    }
  
    const payment = new Payment({
      orderId: orderId,
      paymentId: paymentId,
      amount: amount,
      products: sanitizedProducts, // Use sanitized products array
      createdAt: new Date(),
    });
    await payment.save();
    console.log('Payment details saved to MongoDB');
  } catch (error) {
    console.error('Failed to save payment details:', error);
  }
}

// // Function to handle payment success
// async function handlePaymentSuccess(to, amount, orderId, paymentId, products) {
//   try {
//     // Sending payment success email
//     await sendPaymentSuccessEmail(to, amount);
//     // Saving payment details
//     await savePaymentDetails(orderId, paymentId, amount, products);
//     console.log('Payment success handling completed');
//   } catch (error) {
//     console.error('Failed to handle payment success:', error);
//   }
// }
// Function to handle payment success
async function handlePaymentSuccess(email, amount, orderId, paymentId, products) {
  try {
    // Sending payment success email
    await sendPaymentSuccessEmail(email, amount, orderId); // Pass orderId here
    // Saving payment details
    await savePaymentDetails(orderId, paymentId, amount, products);
    console.log('Payment success handling completed');
  } catch (error) {
    console.error('Failed to handle payment success:', error);
  }
}

// module.exports = { createOrder, verifyPayment, sendEmail, savePaymentDetails };
module.exports = { createOrder, verifyPayment, handlePaymentSuccess };
