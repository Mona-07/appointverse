const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');
const { auth, checkRole } = require('../middleware/auth');

// Middleware to validate request
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .populate('businessId', 'name email');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get services by business
router.get('/business/:businessId', async (req, res) => {
  try {
    const services = await Service.find({
      businessId: req.params.businessId,
      isActive: true
    });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new service (business only)
router.post('/', [
  auth,
  checkRole(['business', 'admin']),
  body('name').trim().notEmpty().withMessage('Service name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').trim().notEmpty().withMessage('Category is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Service({
      ...req.body,
      businessId: req.user._id
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update service
router.put('/:id', [
  auth,
  checkRole(['business', 'admin']),
  body('name').optional().trim().notEmpty().withMessage('Service name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive number'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user owns the service or is admin
    if (service.businessId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(service, req.body);
    await service.save();
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete service (soft delete)
router.delete('/:id', [auth, checkRole(['business', 'admin'])], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user owns the service or is admin
    if (service.businessId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    service.isActive = false;
    await service.save();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 