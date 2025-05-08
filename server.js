require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./src/routes/paymentRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const accountRoutes = require("./src/routes/accountRoutes");
const { connectDB } = require("./src/config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/payments", paymentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => {
  res.send("Gogoglo Travel Backend is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});