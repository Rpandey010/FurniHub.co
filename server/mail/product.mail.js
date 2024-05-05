const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'furnihub.co@gmail.com',
    pass: 'ilgmcjpdivdpnuis'
  }
});

const sendNewProductEmail = (emailID, productData) => { // Accept emailID as a parameter
  const mailOptions = {
    from: 'furnihub.co@gmail.com',
    to: emailID,
    subject: 'New Product Listed',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <h1 style="color: #333; margin-bottom: 20px;">Hello,</h1>
        <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <p style="color: #666; margin-bottom: 15px;">A new product has been successfully listed:</p>
          <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li><strong>Name:</strong> ${productData.name}</li>
            <li><strong>Category:</strong> ${productData.category}</li>
            <li><strong>Price:</strong> ${productData.new_price}</li>
            <li><strong>Address:</strong> ${productData.address}</li>
          </ul>
          <p style="color: #666; margin-bottom: 0;">Thank you!</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #666; margin-top: 10px;">🎉 Congratulations! Your new product has been successfully listed! 🎉</p>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendNewProductEmail };
