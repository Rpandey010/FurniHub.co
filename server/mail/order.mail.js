// order.mail.js

const nodemailer = require('nodemailer');

exports.sendEmailWithOrderHistory = (fullName, emailID, orders) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'furnihub.co@gmail.com',
      pass: 'ilgmcjpdivdpnuis'
    },
  });

  const mailOptions = {
    from: 'furnihub.co@gmail.com',
    to: emailID,
    subject: 'Your Order History',
    html: `
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style-type: none;
          margin-bottom: 8px;
        }
        .order-details {
          margin-bottom: 20px;
        }
      </style>
      <h1 style="font-family: Arial, sans-serif;">Hello ${fullName},</h1>
      <p style="font-family: Arial, sans-serif;">Here is your order history:</p>
      ${orders.map(order => `
        <div class="order-details" style="font-family: Arial, sans-serif; border: 1px solid #dddddd; padding: 10px;">
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Products:</strong></p>
          <ul>
            ${order.products.map(product => `
              <li>
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Quantity:</strong> ${product.quantity}</p>
              </li>
            `).join('')}
          </ul>
          <p><strong>Billing Address:</strong> ${order.billingAddress.address1}, ${order.billingAddress.city}, ${order.billingAddress.country}</p>
          <p><strong>Shipping Address:</strong> ${order.shippingAddress.address1}, ${order.shippingAddress.city}, ${order.shippingAddress.country}</p>
          <p><strong>Total Price:</strong> $${calculateTotalPrice(order)}</p>
        </div>
      `).join('')}
      <p style="font-family: Arial, sans-serif;">Thank you for shopping with us!</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

function calculateTotalPrice(order) {
  return order.products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
}
