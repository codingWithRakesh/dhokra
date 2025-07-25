import React from 'react';
import { Link } from 'react-router-dom';

const Slide = () => {
  const slides = [
    { text: "Dhokra", link: "/dhokra" },
    { text: "UnickDhokraWorkshop", link: "/about" },
    { text: "Trending", link: "/trending" },
    { text: "GI Bengal Dokra", link: "/gi-bengal-dokra" },
    { text: "Home Decor", link: "/home-decor" },
    { text: "Candle Stands", link: "/candle-stands" },
    { text: "Coming Soon", link: "/coming-soon" },
  ];

  return (
    <div className="bg-emerald-700 text-white py-4 overflow-hidden rounded shadow-lg">
      <div className="relative">
        {/* Marquee Container */}
        <div className="whitespace-nowrap">
          {/* Animated Marquee - Duplicated for seamless looping */}
          <div className="inline-block animate-marquee">
            {[...slides, ...slides].map((slide, index) => (
              <Link
                key={`${slide.text}-${index}`}
                to={slide.link}
                className="inline-block px-6 text-lg font-semibold hover:text-amber-300 transition-colors italic"
              >
                {slide.text}
              </Link>
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