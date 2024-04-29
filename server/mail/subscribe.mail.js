const nodemailer = require('nodemailer');

const sendSubscriptionEmail = async (email) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'furnihub.co@gmail.com',
      pass: 'ilgmcjpdivdpnuis'
    }
  });

  let mailOptions = {
        from: 'furnihub.co@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f8f9fa;
                }
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1, h2, p {
                  color: #333;
                }
                .cta-button {
                  display: inline-block;
                  color: #fff;
                  background-color: #007bff; /* Change button color here */
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
                  font-weight: bold;
                  transition: background-color 0.3s ease;
                }
                .cta-button:hover {
                  background-color: #0056b3; /* Change button hover color here */
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2 style="color: #007bff;">Subscription Confirmation</h2>
                <h1>Welcome to FurniHub!</h1>
                <p>Thank you for subscribing to our newsletter!</p>
                <p>We're excited to have you on board. To show our appreciation, we're offering you a <strong style="color: #007bff;">20% discount</strong> on your first purchase. Use the code <strong style="color: #007bff;">WELCOME20</strong> at checkout.</p>
                <p>Start shopping now and discover our wide range of products!</p>
                <a href="https://www.pornhub.com/" class="cta-button">Shop Now</a>
              </div>
            </body>
          </html>
        `
      };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'An error occurred while sending email' };
  }
};

module.exports = { sendSubscriptionEmail };
