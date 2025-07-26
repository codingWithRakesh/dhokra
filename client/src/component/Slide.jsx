import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Assuming you have react-icons installed
import { navItems } from '../store/store';

const Slide = () => {

  return (
    <div className="bg-emerald-700 text-white py-4 overflow-hidden rounded shadow-lg">
      <div className="relative">
        {/* Marquee Container */}
        <div className="whitespace-nowrap">
          {/* Animated Marquee - Duplicated for seamless looping */}
          <div className="inline-block animate-marquee">
            {[...navItems, ...navItems].map((navItem, index) => (
              <span key={`${navItem.name}-${index}`} className="inline-flex items-center">
                <Link
                  to={navItem.path}
                  className="inline-block px-6 text-lg font-semibold hover:text-amber-300 transition-colors italic"
                >
                  {navItem.name} 
                </Link>
                <FaStar className="inline-block mx-2 text-amber-300" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Slide;