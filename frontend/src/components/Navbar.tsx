
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CalendarDays, User, Bell, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <CalendarDays className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-display font-bold text-teal-800">AppointVerse</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/') ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-teal-300'} text-sm font-medium`}>
                Home
              </Link>
              <Link to="/services" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/services') ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-teal-300'} text-sm font-medium`}>
                Services
              </Link>
              <Link to="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/about') ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-teal-300'} text-sm font-medium`}>
                About
              </Link>
              <Link to="/contact" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/contact') ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-teal-300'} text-sm font-medium`}>
                Contact
              </Link>
              <Link to="/business" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/business') ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-teal-300'} text-sm font-medium`}>
                For Business
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-teal-600">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-teal-600">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/login">
              <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Sign Up</Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/') ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-teal-300 hover:text-gray-800'} text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/services') ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-teal-300 hover:text-gray-800'} text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/about') ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-teal-300 hover:text-gray-800'} text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/contact') ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-teal-300 hover:text-gray-800'} text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/business" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/business') ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-teal-300 hover:text-gray-800'} text-base font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              For Business
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-teal-100 p-2 text-teal-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Sign in to your account</div>
                <div className="text-sm font-medium text-gray-500">or create a new one</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link 
                to="/login" 
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
