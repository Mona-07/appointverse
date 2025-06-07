
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, IndianRupee, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const serviceCategories = [
  {
    id: 'wellness',
    label: 'Wellness',
    services: [
      {
        id: 1,
        title: 'Therapeutic Massage',
        provider: 'Arogya Wellness Centre',
        duration: '60 min',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Yoga Session',
        provider: 'Shanti Yoga Studio',
        duration: '45 min',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'Nutrition Consultation',
        provider: 'Swasth Health Partners',
        duration: '50 min',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1974&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'medical',
    label: 'Medical',
    services: [
      {
        id: 4,
        title: 'General Health Checkup',
        provider: 'Apollo Medical Centre',
        duration: '45 min',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1651069188152-bf30b5af2a0d?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 5,
        title: 'Dental Cleaning',
        provider: 'Dent Care Clinic',
        duration: '60 min',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 6,
        title: 'Physical Therapy',
        provider: 'Physio Recovery Centre',
        duration: '50 min',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'beauty',
    label: 'Beauty',
    services: [
      {
        id: 7,
        title: 'Haircut & Styling',
        provider: 'Lakme Glamour Studio',
        duration: '60 min',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2072&auto=format&fit=crop'
      },
      {
        id: 8,
        title: 'Facial Treatment',
        provider: 'Kaya Skin Wellness',
        duration: '75 min',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 9,
        title: 'Manicure & Pedicure',
        provider: 'Nails & Beyond',
        duration: '90 min',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=2942&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'professional',
    label: 'Professional',
    services: [
      {
        id: 10,
        title: 'Legal Consultation',
        provider: 'Singh & Associates',
        duration: '60 min',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 11,
        title: 'Financial Planning',
        provider: 'Wealth Advisors India',
        duration: '75 min',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2942&auto=format&fit=crop'
      },
      {
        id: 12,
        title: 'Career Counseling',
        provider: 'Career Paths India',
        duration: '45 min',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop'
      }
    ]
  }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('wellness');

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our selection of professional services and book your appointment instantly.
          </p>
        </div>

        <Tabs defaultValue="wellness" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {serviceCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-base py-3"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div 
                      className="h-48 overflow-hidden"
                      style={{
                        backgroundImage: `url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <div className="flex items-center mb-2 text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>{service.provider}</span>
                      </div>
                      <div className="flex items-center mb-2 text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center mb-4 text-gray-600">
                        <IndianRupee className="h-4 w-4 mr-2" />
                        <span>₹{service.price}</span>
                      </div>
                      <Link to={`/service/${service.id}`}>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
