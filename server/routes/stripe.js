const express = require("express");

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "USD",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log(stripeRes);
      }
    }
  );
});

router.post("/payment-sheet", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 200,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
