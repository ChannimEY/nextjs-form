'use client';

import { Truck, Shield, Clock, Headphones } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: 'Global Shipping',
      description: 'We handle all shipping logistics from any country to your doorstep with full tracking and insurance coverage.'
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'Every vehicle undergoes rigorous inspection and comes with comprehensive documentation and certification.'
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: 'Fast Processing',
      description: 'Streamlined import process with average delivery times of 4-6 weeks from order confirmation.'
    },
    {
      icon: <Headphones className="w-12 h-12 text-blue-600" />,
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock to assist with any questions or concerns.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AutoImport?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make importing your dream car simple, secure, and stress-free with our comprehensive services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="bg-blue-50 rounded-2xl p-6 mb-6 group-hover:bg-blue-100 transition-colors duration-200">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Import Your Dream Car?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Get started with a free consultation and personalized quote today.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">
            Get Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}