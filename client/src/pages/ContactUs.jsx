import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-full py-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
          <div className="border-2 rounded-xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="border-2 rounded-xl shadow-md p-6 sm:p-2 flex flex-col text-center justify-center">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">Follow us on Social Media</h2>
            <div className="flex justify-center gap-6 p-2">
          <a 
            href="https://instagram.com/unickdhokra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-pink-400"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6 text-emerald-700" />
          </a>
          
          <a 
            href="https://facebook.com/unickdhokra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-400"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-6 h-6 text-emerald-700" />
          </a>
          
          <a 
            href="https://youtube.com/unickdhokra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-red-400"
            aria-label="Follow us on YouTube"
          >
            <Youtube className="w-6 h-6 text-emerald-700" />
          </a>
          
          <a 
            href="https://twitter.com/unickdhokra" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-400"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6 text-emerald-700" />
          </a>
        </div>
          </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="border-2 rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Our Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                    <FaPhone className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 81016 16016</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                    <FaEnvelope className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">animesh.metalart@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">Address</h3>
                    <p className="text-gray-600">Vill: Dharmadaspur,
                        P.O.: Purandarpur,
                        P.S. : Bankura
                    </p>
                    <p className="text-gray-600">Bankura, West Bengal - 722155</p>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0163961776067!2d88.3637854153846!3d22.57218508518099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771346ae015d%3A0xb540e4bce39763!2sVictoria%20Memorial!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;