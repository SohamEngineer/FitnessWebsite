import express from "express";
import NewUser from "../../mongoSchema/signupSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const SendOtpRoute = express.Router();
let otpStore = {};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sohamata33@gmail.com',
    pass: 'rfijuwonpvmjnvmg', // For security, use env variables in production
  },
});

// ---------------------
// 1. Send OTP Route
// ---------------------
SendOtpRoute.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await NewUser.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    await transporter.sendMail({
      from: '"Health & Fitness" <sohamata33@gmail.com>',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is: ${otp}`,
    });

    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: 'Error sending OTP' });
  }
});

// ---------------------
// 2. Verify OTP Route
// ---------------------
SendOtpRoute.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    const token = jwt.sign({ email }, 'resetSecret', { expiresIn: '1m' });
    delete otpStore[email];
    return res.json({ message: 'OTP verified', token });
  }

  return res.status(400).json({ message: 'Invalid OTP' });
});

// ---------------------
// 3. Reset Password Route
// ---------------------
SendOtpRoute.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, 'resetSecret');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await NewUser.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword }
    );

    return res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default SendOtpRoute;
