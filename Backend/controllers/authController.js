import User from '../models/User.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bhagyanetram_secret_key_123';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER || 'smtpout.secureserver.net',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASS || process.env.SENDER_PASSWORD
  }
});

export const sendOTP = async (req, res) => {
  try {
    const { name, email, phone, termsAccepted } = req.body;

    if (!email || !phone || !name) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ email });

    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      user.name = name; // Update name if changed
      user.phone = phone; // Update phone if changed
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        phone,
        otp,
        otpExpires,
        termsAccepted: termsAccepted || false
      });
    }
    
    
    // Attempt to send email, but don't fail the request if it fails (for development)
    try {
      await transporter.sendMail({
        from: '"BhagyaNetram" <contact@bhagyanetram.com>',
        to: email,
        subject: 'Your OTP for BhagyaNetram',
        text: `Your OTP for login is: ${otp}. It is valid for 10 minutes.`
      });
      console.log(`[OTP] Sent OTP ${otp} to ${email}`);
    } catch (emailErr) {
      console.warn(`[OTP] Email failed to send (check config). OTP is: ${otp}`);
    }

    // In a real app, do not return OTP in response. Returning it here for easy testing/debugging.
    return res.status(200).json({ message: 'OTP sent successfully to email.', testOtp: otp });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return res.status(500).json({ error: 'Failed to send OTP.' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ error: 'OTP has expired.' });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        palmistryCredits: user.palmistryCredits
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({ error: 'Failed to verify OTP.' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    
    return res.status(200).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      palmistryCredits: user.palmistryCredits
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user details.' });
  }
};
