// email.service.js
const nodemailer = require('nodemailer');

// Creating a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service
  auth: {
    user: 'furnihub.co@gmail.com',
    pass: 'ilgmcjpdivdpnuis'
  },
});

// Function to send a payment success email
async function sendPaymentSuccessEmail(to, amount, orderId) {
  try {
    // Email subject
    const subject = 'Payment Successful';

    // Email body (HTML formatted with CSS)
    const html = `
      <html>
        <head>
          <style>
            /* CSS styles for email body */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Successful</h1>
            <p>Thank you for shopping with us! We hope you enjoy our service.</p>
            <p>Your payment of <strong>${amount}</strong> was successfully processed.</p>
            <p>Order ID: <strong>${orderId}</strong></p>
          </div>
        </body>
      </html>
    `;

    // Sending email
    await transporter.sendMail({
      from: 'furnihub.co@gmail.com', // Sender's email address
      to: to, // Recipient's email address
      subject: subject,
      html: html, // Use HTML formatting for the email body
    });

    console.log('Payment success email sent successfully');
  } catch (error) {
    console.error('Failed to send payment success email:', error);
  }
}

module.exports = { sendPaymentSuccessEmail };
