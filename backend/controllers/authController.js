const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  // Use SMTP if configured, otherwise log the reset link to console
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } else {
    // Fallback: log to console for development
    console.log('Email not configured. Email content:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log(html);
  }
};

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role
  });

  res.status(201).json({
    msg: "Registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email});
  if (!user) return res.status(400).json({ msg: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// FORGOT PASSWORD - sends reset link (if email exists)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Email required' });

  const user = await User.findOne({ email });
  // Always respond with success message to avoid revealing account existence
  if (!user) return res.json({ msg: 'If that email exists, a reset link has been sent.' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${clientUrl}/auth?mode=reset&token=${token}`;

  const html = `<p>We received a password reset request. Click the link below to reset your password:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>If you didn't request this, you can ignore this email.</p>`;

  try {
    await sendEmail({ to: user.email, subject: 'Password reset', html });
    res.json({ msg: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    // rollback token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    console.error('Error sending reset email:', err);
    res.status(500).json({ msg: 'Unable to send reset email' });
  }
};

// RESET PASSWORD using token in query string
exports.resetPassword = async (req, res) => {
  const token = req.query.token || req.body.token;
  const { password } = req.body;
  if (!token) return res.status(400).json({ msg: 'Token required' });
  if (!password) return res.status(400).json({ msg: 'Password required' });

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ msg: 'Password reset successful' });
};