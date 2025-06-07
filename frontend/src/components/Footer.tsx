
import { Link } from 'react-router-dom';
import { CalendarDays, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <CalendarDays className="h-8 w-8 text-teal-300" />
              <span className="ml-2 text-xl font-display font-bold text-white">AppointVerse</span>
            </Link>
            <p className="text-teal-100 mb-5">
              The next-generation booking platform designed for businesses and customers who value efficiency and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-teal-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-teal-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-teal-100 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-teal-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-teal-100 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-teal-100 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">For Businesses</h3>
            <ul className="space-y-3">
              <li><Link to="/business" className="text-teal-100 hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to="/business/pricing" className="text-teal-100 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/business/features" className="text-teal-100 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/business/resources" className="text-teal-100 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/business/success-stories" className="text-teal-100 hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-teal-300 mt-1" />
                <span className="text-teal-100">123 Booking Street, Suite 100<br />San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-300" />
                <span className="text-teal-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-teal-300" />
                <span className="text-teal-100">info@appointverse.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-200 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AppointVerse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-teal-200 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-teal-200 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-teal-200 hover:text-white transition-colors text-sm">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
