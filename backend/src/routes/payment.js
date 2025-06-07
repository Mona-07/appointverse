const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { processPayment, refundPayment } = require('../services/payment');
const Appointment = require('../models/Appointment');
const { auth, checkRole } = require('../middleware/auth');

// Process payment for an appointment
router.post('/process', [
  auth,
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required'),
  body('currency').optional().isString().withMessage('Valid currency is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { appointmentId, amount, currency } = req.body;

    // Get appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user owns the appointment
    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if payment is already processed
    if (appointment.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Payment already processed' });
    }

    // Process payment
    const paymentResult = await processPayment(amount, currency);

    // Update appointment payment status
    appointment.paymentStatus = 'paid';
    await appointment.save();

    res.json({
      message: 'Payment processed successfully',
      payment: paymentResult,
      appointment
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'Failed to process payment' });
  }
});

// Process refund
router.post('/refund', [
  auth,
  checkRole(['business', 'admin']),
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Valid amount is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { appointmentId, amount } = req.body;

    // Get appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if business owns the appointment
    if (appointment.businessId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if payment was made
    if (appointment.paymentStatus !== 'paid') {
      return res.status(400).json({ message: 'No payment to refund' });
    }

    // Process refund
    const refundResult = await refundPayment(appointment.paymentId, amount);

    // Update appointment payment status
    appointment.paymentStatus = 'refunded';
    await appointment.save();

    res.json({
      message: 'Refund processed successfully',
      refund: refundResult,
      appointment
    });
  } catch (error) {
    console.error('Refund processing error:', error);
    res.status(500).json({ message: 'Failed to process refund' });
  }
});

module.exports = router; 