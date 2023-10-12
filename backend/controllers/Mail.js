const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// In-memory storage for reset tokens (You should use a database for production)
const resetTokens = {};

// Endpoint to send a reset link to the user's email
router.post('/forgot-password', (req, res) => {
  const email = req.body.email;

  // Generate a unique reset token
  const token = crypto.randomBytes(20).toString('hex');
  resetTokens[email] = token;

  // Send an email to the user with a link containing the reset token
  const resetLink = `http://yourwebsite.com/reset-password?token=${token}`;
  const transporter = nodemailer.createTransport({
    service: 'your_email_service',
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: email,
    subject: 'Password Reset Request',
    html: `Click <a href="${resetLink}">here</a> to reset your password.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email could not be sent:', error);
      res.status(500).json({ message: 'Email could not be sent' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent' });
    }
  });
});

// Endpoint to reset the password using the provided reset token
router.post('/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body;

  if (resetTokens[email] === token) {
    // Reset the password for the user associated with the email
    // You should store the new password securely in your database
    // In a production environment, you should use proper password hashing
    // For this example, we'll just store it in memory
    const newPasswordHash = newPassword; // Replace with proper password hashing

    // Clear the reset token
    delete resetTokens[email];

    res.json({ message: 'Password reset successfully' });
  } else {
    res.status(400).json({ message: 'Invalid or expired reset token' });
  }
});

module.exports = router;
