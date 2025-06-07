const Appointment = require('../models/Appointment');

// Update appointment payment status
async function updatePaymentStatus(appointmentId) {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.payment = {
      status: 'paid',
      amount: appointment.service.price,
      currency: 'INR',
      paymentDate: new Date()
    };

    appointment.status = 'confirmed';
    await appointment.save();
    return appointment;
  } catch (error) {
    console.error('Payment status update error:', error);
    throw error;
  }
}

// This is a stub implementation. In production, integrate with a real payment gateway
// like Stripe, PayPal, or Razorpay

const generatePaymentId = () => {
  return 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const processPayment = async (amount, currency = 'INR') => {
  // Simulate payment processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        paymentId: generatePaymentId(),
        amount,
        currency,
        status: 'completed',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

const refundPayment = async (paymentId, amount) => {
  // Simulate refund processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        refundId: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentId,
        amount,
        status: 'completed',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

module.exports = {
  updatePaymentStatus,
  processPayment,
  refundPayment
}; 