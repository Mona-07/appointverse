
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, DollarSign, Star, MapPin, ArrowLeft, Check, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Mock data for the service
const serviceData = {
  id: '1',
  title: 'Therapeutic Massage',
  provider: 'Wellness Center',
  providerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
  rating: 4.9,
  reviews: 128,
  duration: '60 min',
  price: 85,
  location: '123 Wellness Street, San Francisco, CA',
  description: 'Experience a rejuvenating therapeutic massage tailored to your specific needs. Our professional therapists combine various techniques to relieve tension, reduce stress, and improve circulation.',
  image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop',
  videoConsultation: true,
  benefits: [
    'Relieves muscle tension and pain',
    'Improves circulation and flexibility',
    'Reduces stress and anxiety',
    'Promotes better sleep',
    'Enhances overall well-being'
  ],
  availableTimes: [
    { date: 'Monday, Apr 10', slots: ['09:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] },
    { date: 'Tuesday, Apr 11', slots: ['10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'] },
    { date: 'Wednesday, Apr 12', slots: ['09:30 AM', '12:00 PM', '2:30 PM', '4:00 PM'] }
  ]
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(serviceData.availableTimes[0]?.date || '');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link to="/services" className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Services</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 sm:h-96 w-full relative">
              <img
                src={serviceData.image}
                alt={serviceData.title}
                className="w-full h-full object-cover"
              />
              {serviceData.videoConsultation && (
                <div className="absolute top-4 right-4 bg-teal-600 text-white py-1 px-3 rounded-full flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Video Available</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="lg:flex lg:justify-between">
                <div className="lg:w-7/12">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{serviceData.title}</h1>
                  
                  <div className="flex items-center mb-4">
                    <User className="h-5 w-5 text-teal-600 mr-2" />
                    <span className="text-gray-700">{serviceData.provider}</span>
                    <div className="flex items-center ml-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-gray-700">{serviceData.rating}</span>
                      <span className="ml-1 text-gray-500">({serviceData.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-gray-700">{serviceData.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-gray-700">${serviceData.price}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-gray-700">{serviceData.location}</span>
                    </div>
                  </div>

                  <Tabs defaultValue="details">
                    <TabsList>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="provider">Provider</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="pt-6">
                      <p className="text-gray-600">{serviceData.description}</p>
                    </TabsContent>
                    <TabsContent value="benefits" className="pt-6">
                      <ul className="space-y-2">
                        {serviceData.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="provider" className="pt-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={serviceData.providerImage}
                          alt={serviceData.provider}
                          className="h-16 w-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{serviceData.provider}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-gray-700">{serviceData.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {serviceData.provider} specializes in providing high-quality therapeutic services with a focus on customer satisfaction and holistic wellness.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="lg:w-4/12 mt-8 lg:mt-0">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Book This Service</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                      <select 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {serviceData.availableTimes.map((dateOption, index) => (
                          <option key={index} value={dateOption.date}>{dateOption.date}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                      <div className="grid grid-cols-2 gap-2">
                        {serviceData.availableTimes
                          .find(dateOption => dateOption.date === selectedDate)?.slots
                          .map((timeSlot, index) => (
                            <Button 
                              key={index}
                              variant={selectedTime === timeSlot ? "default" : "outline"}
                              onClick={() => setSelectedTime(timeSlot)}
                              className={
                                selectedTime === timeSlot 
                                  ? "bg-teal-600 hover:bg-teal-700" 
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }
                            >
                              {timeSlot}
                            </Button>
                          ))
                        }
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
                      disabled={!selectedTime}
                    >
                      Book Appointment
                    </Button>
                    
                    {serviceData.videoConsultation && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" className="text-teal-600 border-teal-500 hover:bg-teal-50 w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Book Video Consultation
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetails;
