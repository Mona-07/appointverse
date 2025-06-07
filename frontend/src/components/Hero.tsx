
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Star } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-section bg-cover bg-center min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in">
              Book Your Perfect <br />
              <span className="text-teal-50">Experience</span>
            </h1>
            <p className="mt-4 text-xl text-white/90 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Seamless scheduling for all your appointment needs, with secure payments and real-time availability.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/services">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 w-full sm:w-auto">
                  Book Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white hover:bg-white/30 text-white w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-5/12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="glass-card rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Quick Booking</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <CalendarDays className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Select Service</p>
                    <p className="font-medium text-gray-700">Wellness Consultation</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <Clock className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Select Time</p>
                    <p className="font-medium text-gray-700">Today, 4:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white/70 rounded-lg">
                  <Star className="h-6 w-6 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Top Provider</p>
                    <p className="font-medium text-gray-700">Dr. Monisha P</p>
                  </div>
                </div>
                <Link to="/services">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-2">
                    Continue Booking
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
