const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { getChatbotResponse } = require('../services/chatbot');
const { auth } = require('../middleware/auth');

// Store conversation history in memory (in production, use Redis or similar)
const conversationHistory = new Map();

// Get chatbot response
router.post('/chat', [
  auth,
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    const userId = req.user._id.toString();

    // Get user's conversation history
    let history = conversationHistory.get(userId) || [];
    
    // Keep only last 5 messages for context
    if (history.length > 10) {
      history = history.slice(-10);
    }

    // Get chatbot response
    const response = await getChatbotResponse(message, history);

    // Update conversation history
    history.push(
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    );
    conversationHistory.set(userId, history);

    res.json({ response });
  } catch (error) {
    console.error('Chatbot route error:', error);
    res.status(500).json({ message: 'Failed to get chatbot response' });
  }
});

// Clear conversation history
router.delete('/clear-history', auth, (req, res) => {
  const userId = req.user._id.toString();
  conversationHistory.delete(userId);
  res.json({ message: 'Conversation history cleared' });
});

module.exports = router; 