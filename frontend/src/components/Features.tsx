
import { Calendar, CreditCard, Users, Clock, Shield, Bot, Video, ChartBar, Box, Settings } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-teal-600" />,
      title: 'Smart Scheduling',
      description: 'AI-powered scheduling suggests optimal booking times based on your preferences and provider availability.'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-teal-600" />,
      title: 'Secure Payments',
      description: 'Integrated with multiple payment options including UPI, credit cards, and net banking for secure transactions.'
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: 'User Authentication',
      description: 'Secure JWT authentication ensures your booking information stays private and protected.'
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: 'Real-Time Availability',
      description: 'See real-time availability updates as others book, ensuring you always have the latest information.'
    },
    {
      icon: <Shield className="h-8 w-8 text-teal-600" />,
      title: 'Passkey Authentication',
      description: 'Cutting-edge passwordless authentication using FIDO2/WebAuthn for enhanced security.'
    },
    {
      icon: <Bot className="h-8 w-8 text-teal-600" />,
      title: 'AI Assistant',
      description: 'Intelligent chatbot helps you find the perfect appointment slot and answers your questions.'
    },
    {
      icon: <Video className="h-8 w-8 text-teal-600" />,
      title: 'Virtual Consultations',
      description: 'WebRTC integration enables high-quality video appointments directly in the app.'
    },
    {
      icon: <ChartBar className="h-8 w-8 text-teal-600" />,
      title: 'Dynamic Pricing',
      description: 'Intelligent surge pricing for high-demand time slots maximizes provider availability.'
    },
    {
      icon: <Box className="h-8 w-8 text-teal-600" />,
      title: '3D Venue Tours',
      description: 'Explore physical locations with immersive 3D previews before booking your appointment.'
    },
    {
      icon: <Settings className="h-8 w-8 text-teal-600" />,
      title: 'White-Label Options',
      description: 'Easily create your own branded booking site with our platform infrastructure.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cutting-Edge <span className="text-gradient">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines advanced technology with user-friendly design to create the ultimate booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
