const express = require('express');
const router = express.Router();
const subscribeMail = require('../mail/subscribe.mail');

// POST /subscribe
// Subscribe to the newsletter
router.post('/', async (req, res) => {
  const { email } = req.body;

  // Validate email (optional)

  try {
    const result = await subscribeMail.sendSubscriptionEmail(email);

    if (result.success) {
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
