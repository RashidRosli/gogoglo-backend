const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { amount, currency, success_url, cancel_url } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "myr",
            product_data: {
              name: "Travel Booking",
              description: "Payment for your booking",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: success_url || `${req.headers.origin}/success`,
      cancel_url: cancel_url || `${req.headers.origin}/booking`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;