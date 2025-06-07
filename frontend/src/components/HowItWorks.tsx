
import { CalendarDays, CheckCircle, CreditCard, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="h-10 w-10 text-teal-600" />,
      title: 'Create Account',
      description: 'Sign up in seconds with our secure authentication system.',
      color: 'bg-teal-100'
    },
    {
      icon: <CalendarDays className="h-10 w-10 text-coral-600" />,
      title: 'Select Service & Time',
      description: 'Browse available services and choose your preferred time slot.',
      color: 'bg-coral-100'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-mint-600" />,
      title: 'Make Payment',
      description: 'Securely pay with your preferred payment method via Stripe.',
      color: 'bg-mint-100'
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-teal-600" />,
      title: 'Confirmation',
      description: 'Receive instant confirmation and reminders for your appointment.',
      color: 'bg-teal-100'
    }
  ];

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book your appointment in just a few simple steps. Our intuitive process makes scheduling easy and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`${step.color} rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-5`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute transform translate-x-32 translate-y-10">
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M99.0607 10.0607C99.6465 9.47487 99.6465 8.52513 99.0607 7.93934L89.5147 -1.60658C88.9289 -2.19237 87.9792 -2.19237 87.3934 -1.60658C86.8076 -1.02079 86.8076 -0.0710427 87.3934 0.514745L95.8787 9L87.3934 17.4853C86.8076 18.0711 86.8076 19.0208 87.3934 19.6066C87.9792 20.1924 88.9289 20.1924 89.5147 19.6066L99.0607 10.0607ZM-1.31134e-07 10.5L98 10.5L98 7.5L1.31134e-07 7.5L-1.31134e-07 10.5Z" fill="#14B8A6" fillOpacity="0.3"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-4xl bg-gradient-to-r from-teal-500/10 to-coral-500/10 rounded-2xl p-8 border border-teal-100">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to experience the future of booking?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied users who have streamlined their appointment booking process.
            </p>
            <Link to="/register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
