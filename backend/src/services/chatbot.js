const { OpenAI } = require('openai');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');
const moment = require('moment');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a helpful appointment booking assistant for AppointVerse. 
You can help users with:
1. Booking appointments
2. Managing their appointments
3. Answering questions about services
4. Providing information about businesses
5. Handling general inquiries

Keep your responses concise and focused on appointment-related matters.`;

// Helper function to get available slots
async function getAvailableSlots(serviceId, date) {
  const service = await Service.findById(serviceId);
  if (!service) return [];

  const appointments = await Appointment.find({
    service: serviceId,
    date: new Date(date),
    status: { $ne: 'cancelled' }
  });

  const bookedSlots = appointments.map(apt => ({
    start: apt.startTime,
    end: apt.endTime
  }));

  // Get service availability for the day
  const dayAvailability = service.availability.find(
    avail => avail.day === moment(date).format('dddd')
  );

  if (!dayAvailability) return [];

  // Generate all possible slots
  const slots = [];
  let currentTime = moment(dayAvailability.startTime, 'HH:mm');
  const endTime = moment(dayAvailability.endTime, 'HH:mm');

  while (currentTime.add(service.duration, 'minutes').isBefore(endTime)) {
    const slotStart = currentTime.format('HH:mm');
    const slotEnd = currentTime.add(service.duration, 'minutes').format('HH:mm');

    // Check if slot is available
    const isBooked = bookedSlots.some(
      booked => 
        (slotStart >= booked.start && slotStart < booked.end) ||
        (slotEnd > booked.start && slotEnd <= booked.end)
    );

    if (!isBooked) {
      slots.push({ start: slotStart, end: slotEnd });
    }
  }

  return slots;
}

// Helper function to get service recommendations
async function getServiceRecommendations(category) {
  const services = await Service.find({
    category,
    isActive: true
  }).populate('provider', 'name');

  return services.map(service => ({
    name: service.name,
    provider: service.provider.name,
    price: service.price,
    duration: service.duration
  }));
}

async function getChatbotResponse(userMessage, conversationHistory = []) {
  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chatbot error:', error);
    throw new Error('Failed to get chatbot response');
  }
}

module.exports = { getChatbotResponse }; 