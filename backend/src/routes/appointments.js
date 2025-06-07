const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const { auth, checkRole } = require('../middleware/auth');

// Get all appointments (filtered by user role)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    
    // Filter based on user role
    if (req.user.role === 'user') {
      query.userId = req.user._id;
    } else if (req.user.role === 'business') {
      query.businessId = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate('userId', 'name email')
      .populate('serviceId', 'name duration price')
      .populate('businessId', 'name email')
      .sort({ date: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new appointment
router.post('/', [
  auth,
  body('serviceId').notEmpty().withMessage('Service is required'),
  body('date').isDate().withMessage('Valid date is required'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time is required'),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { serviceId, date, startTime, notes } = req.body;

    // Get service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Calculate end time based on service duration
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date(date);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate.getTime() + service.duration * 60000);
    const endTime = endDate.toTimeString().slice(0, 5);

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      businessId: service.businessId,
      date: date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ],
      status: { $ne: 'cancelled' }
    });

    if (conflictingAppointment) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    const appointment = new Appointment({
      userId: req.user._id,
      serviceId,
      businessId: service.businessId,
      date,
      startTime,
      endTime,
      totalAmount: service.price,
      notes
    });

    await appointment.save();
    
    // Populate the response
    await appointment.populate([
      { path: 'userId', select: 'name email' },
      { path: 'serviceId', select: 'name duration price' },
      { path: 'businessId', select: 'name email' }
    ]);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment status
router.patch('/:id/status', [
  auth,
  body('status').isIn(['confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (req.user.role === 'user' && appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (req.user.role === 'business' && appointment.businessId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = req.body.status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get appointment details
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('serviceId', 'name duration price')
      .populate('businessId', 'name email');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check authorization
    if (req.user.role === 'user' && appointment.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (req.user.role === 'business' && appointment.businessId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 