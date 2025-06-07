import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-b from-white to-teal-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                About <span className="text-gradient">AppointVerse</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Revolutionizing appointment scheduling with AI-powered solutions
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At AppointVerse, we're on a mission to transform how businesses and
                  customers connect through intelligent scheduling solutions. We believe
                  that time is our most valuable resource, and we're dedicated to
                  making appointment scheduling seamless, efficient, and stress-free.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-teal-500 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        Simplify Scheduling
                      </h3>
                      <p className="text-gray-600">
                        Making appointment booking as easy as a few clicks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-teal-500 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        Save Time
                      </h3>
                      <p className="text-gray-600">
                        Reducing administrative overhead and no-shows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-teal-500 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        Connect People
                      </h3>
                      <p className="text-gray-600">
                        Building stronger relationships between businesses and customers
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Team collaboration"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-teal-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We constantly push boundaries to create better solutions for our users
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-teal-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Customer First
                </h3>
                <p className="text-gray-600">
                  Every decision we make starts with our users' needs in mind
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-teal-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  We strive for the highest quality in everything we do
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Scheduling?
              </h2>
              <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
                Join thousands of businesses already using AppointVerse to streamline their operations
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold inline-flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
