const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { User } = require("../config/db");
const router = express.Router();

// Configure nodemailer (unchanged)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Register User (unchanged)
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    try {
        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            role: "customer",
        });

        await user.save();
        console.log("User Registered:", user);

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login User (with extra logging)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", { email, password });

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        console.log("Stored hash:", user.password);
        console.log("Input password:", password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1h" }
        );
        console.log("Generated Token:", token); // Added for debugging

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

// Forgot Password and Reset Password routes (unchanged)
router.post("/forgot-password", async (req, res) => {
    console.log("Received POST /forgot-password:", req.body);
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${resetToken}`;
        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Reset Your Password - Your App Name",
            html: `...`, // Your existing HTML (unchanged)
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Password reset email sent successfully",
        });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ error: "Failed to process password reset request" });
    }
});

router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ error: "New password is required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                error: "Invalid or expired reset token",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Failed to reset password" });
    }
});

module.exports = router;