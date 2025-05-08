const express = require("express");
const { Booking } = require("../config/db");
const router = express.Router();

router.post("/save-booking", async (req, res) => {
  const { type, details, totalPrice, discount, couponCode, paymentMethod } = req.body;

  try {
    const booking = new Booking({
      type,
      details,
      totalPrice,
      discount,
      couponCode,
      paymentMethod,
      status: "pending",
    });

    await booking.save();
    console.log("Booking Saved:", booking);
    res.status(201).json({ message: "Booking saved successfully", bookingId: booking._id });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

module.exports = router;