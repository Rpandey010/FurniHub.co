// subscribe.route.js
const express = require('express');
const router = express.Router();
const subscribeMail = require('../mail/subscribe.mail');
const Subscription = require('../model/subscriber.model'); // Import the Subscription model

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return res.status(400).send('This email is already subscribed.');
    }

    // Send subscription confirmation email
    const result = await subscribeMail.sendSubscriptionEmail(email);

    if (result.success) {
      // Save subscription data to MongoDB only after email has been sent successfully
      await Subscription.create({ email }); // Create a new subscription document

      res.status(200).send(result.message);
    } else {
      res.status(500).send(result.message);
    }
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('An error occurred while subscribing');
  }
});

module.exports = router;
