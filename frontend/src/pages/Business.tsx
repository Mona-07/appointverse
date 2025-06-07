
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Monitor, Calendar, Users, Shield, Bot, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

const Business = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 3 staff members",
        "100 bookings per month",
        "Email notifications",
        "Basic reporting",
        "24/7 support"
      ]
    },
    {
      name: "Professional",
      price: "₹2,499",
      description: "Ideal for growing businesses with multiple staff members",
      features: [
        "Up to 10 staff members",
        "500 bookings per month",
        "Email and SMS notifications",
        "Advanced reporting and analytics",
        "Custom booking pages",
        "Integration with payment gateways",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹7,999",
      description: "For large businesses with complex scheduling needs",
      features: [
        "Unlimited staff members",
        "Unlimited bookings",
        "Advanced API access",
        "White-labeling options",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 priority support",
        "Onboarding and training sessions"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Calendar className="h-10 w-10 text-teal-600" />,
      title: "Efficient Scheduling",
      description: "Reduce booking hassles and minimize no-shows with automated reminders"
    },
    {
      icon: <Monitor className="h-10 w-10 text-teal-600" />,
      title: "24/7 Online Booking",
      description: "Let customers book appointments anytime, even outside business hours"
    },
    {
      icon: <Users className="h-10 w-10 text-teal-600" />,
      title: "Grow Your Customer Base",
      description: "Attract new customers looking for convenient online booking options"
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-600" />,
      title: "Secure Platform",
      description: "Your business and customer data is protected with enterprise-grade security"
    },
    {
      icon: <Bot className="h-10 w-10 text-teal-600" />,
      title: "AI Assistant",
      description: "Intelligent booking assistant helps customers find the perfect time slot"
    },
    {
      icon: <ChartBar className="h-10 w-10 text-teal-600" />,
      title: "Powerful Analytics",
      description: "Gain insights into your business performance with detailed reporting"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-20 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                AppointVerse for <span className="text-gradient">Business</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Transform your booking process and grow your business with our powerful scheduling platform tailored for Indian businesses.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="rounded-full bg-teal-100 w-16 h-16 flex items-center justify-center mb-5">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that best fits your business needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl overflow-hidden shadow-md border ${
                    plan.popular ? 'border-teal-500 ring-2 ring-teal-500 ring-opacity-50' : 'border-gray-200'
                  } relative`}
                >
                  {plan.popular && (
                    <div className="bg-teal-500 text-white py-1 px-4 absolute top-6 right-0 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">per month</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-900 hover:bg-gray-800'
                      }`}
                    >
                      Choose Plan
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-teal-500 mr-2 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your booking experience?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Join thousands of Indian businesses that have streamlined their operations with AppointVerse.
              </p>
              <Link to="/contact">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Business;
