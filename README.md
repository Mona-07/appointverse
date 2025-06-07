# AppointVerse - Appointment Scheduling Platform

AppointVerse is a modern, AI-powered appointment scheduling platform that helps businesses and customers connect through intelligent scheduling solutions.

## Features

- 🎯 Smart Appointment Scheduling
- 🤖 AI-Powered Assistant
- 📱 Responsive Design
- 🔒 Secure Authentication
- 💳 Payment Integration
- 📊 Business Analytics
- 📅 Calendar Management
- 🔔 Real-time Notifications

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- React Query
- Shadcn UI

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Socket.IO

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/appointverse.git
cd appointverse
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# In backend directory
cp .env.example .env
# Edit .env with your configuration

# In frontend directory
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

## Project Structure

```
appointverse/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/     # Page components
│   │   ├── hooks/     # Custom hooks
│   │   └── lib/       # Utility functions
│   └── public/        # Static files
│
└── backend/           # Node.js backend application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── models/     # Database models
    │   ├── routes/     # API routes
    │   └── middleware/ # Custom middleware
    └── config/        # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/appointverse](https://github.com/yourusername/appointverse) 