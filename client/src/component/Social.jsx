import React from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const SocialCommunity = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:py-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
          Join the Unick Dhokra Community
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Connect with fellow Dhokra art enthusiasts and stay updated on our latest creations, workshops, and exclusive offers.
        </p>

        <div className="flex justify-center gap-6">
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
    </section>
  );
};

export default SocialCommunity;