const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/gogogloDB";
    try {
        await mongoose.connect(mongoURI); // Removed deprecated options
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, default: "customer" },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["tour", "hotel", "flight"], required: true },
    details: mongoose.Schema.Types.Mixed,
    totalPrice: Number,
    discount: Number,
    couponCode: String,
    paymentMethod: String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

const tourSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    duration: String,
    availability: Boolean,
    policies: [String],
});

const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    availability: Boolean,
    policies: [String],
});

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    departure: String,
    arrival: String,
    price: Number,
    availability: Boolean,
});

const User = mongoose.model("User", userSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Tour = mongoose.model("Tour", tourSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Flight = mongoose.model("Flight", flightSchema);

module.exports = { connectDB, User, Booking, Tour, Hotel, Flight };