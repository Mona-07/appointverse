const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const User = require('../models/User');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');
const { body, validationResult } = require('express-validator');

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// Get dashboard statistics
router.get('/stats', [auth, isAdmin], async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: 'provider' });

    // Get total bookings count
    const totalBookings = await Appointment.countDocuments();
    const completedBookings = await Appointment.countDocuments({ status: 'completed' });
    const pendingBookings = await Appointment.countDocuments({ status: 'pending' });

    // Get most booked service
    const mostBookedService = await Appointment.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: '_id',
          as: 'serviceDetails'
        }
      },
      { $unwind: '$serviceDetails' }
    ]);

    // Get revenue statistics
    const revenueStats = await Appointment.aggregate([
      { $match: { 'payment.status': 'paid' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$payment.amount' },
          averageRevenue: { $avg: '$payment.amount' }
        }
      }
    ]);

    // Get booking trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const bookingTrends = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      users: {
        total: totalUsers,
        providers: totalProviders
      },
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        pending: pendingBookings
      },
      mostBookedService: mostBookedService[0]?.serviceDetails || null,
      revenue: revenueStats[0] || { totalRevenue: 0, averageRevenue: 0 },
      bookingTrends
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get provider performance
router.get('/provider-performance', [auth, isAdmin], async (req, res) => {
  try {
    const providerStats = await Appointment.aggregate([
      {
        $match: { status: { $ne: 'cancelled' } }
      },
      {
        $group: {
          _id: '$provider',
          totalBookings: { $sum: 1 },
          completedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$payment.status', 'paid'] }, '$payment.amount', 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'providerDetails'
        }
      },
      { $unwind: '$providerDetails' },
      {
        $project: {
          providerName: '$providerDetails.name',
          providerEmail: '$providerDetails.email',
          totalBookings: 1,
          completedBookings: 1,
          totalRevenue: 1,
          completionRate: {
            $multiply: [
              { $divide: ['$completedBookings', '$totalBookings'] },
              100
            ]
          }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json(providerStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard analytics
router.get('/analytics', [auth, checkRole(['admin'])], async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalBusinesses = await User.countDocuments({ role: 'business' });

    // Get total services
    const totalServices = await Service.countDocuments({ isActive: true });

    // Get appointment statistics
    const appointments = await Appointment.find()
      .populate('serviceId', 'price')
      .populate('businessId', 'name');

    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter(a => a.status === 'completed').length;
    const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
    const totalRevenue = appointments
      .filter(a => a.paymentStatus === 'paid')
      .reduce((sum, a) => sum + (a.serviceId?.price || 0), 0);

    // Get business performance
    const businessPerformance = await Appointment.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: '$businessId',
          totalAppointments: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'business'
        }
      },
      {
        $unwind: '$business'
      },
      {
        $project: {
          businessName: '$business.name',
          totalAppointments: 1,
          totalRevenue: 1
        }
      },
      {
        $sort: { totalRevenue: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('userId', 'name email')
      .populate('serviceId', 'name')
      .populate('businessId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      overview: {
        totalUsers,
        totalBusinesses,
        totalServices,
        totalAppointments,
        completedAppointments,
        cancelledAppointments,
        totalRevenue
      },
      businessPerformance,
      recentAppointments
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

// Get user management data
router.get('/users', [auth, checkRole(['admin'])], async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('User management error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Update user role
router.patch('/users/:userId/role', [
  auth,
  checkRole(['admin']),
  body('role').isIn(['user', 'business', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = req.body.role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('User role update error:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

module.exports = router; 