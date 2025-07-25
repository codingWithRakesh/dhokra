import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    { text: "Dhokra", link: "/dhokra" },
    { text: "UnickDhokraWorkshop", link: "/about" },
    { text: "Trending", link: "/trending" },
    { text: "GI Bengal Dokra", link: "/gi-bengal-dokra" },
    { text: "Home Decor", link: "/home-decor" },
    { text: "Candle Stands", link: "/candle-stands" },
    { text: "Coming Soon", link: "/coming-soon" },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <div 
      className="bg-emerald-800 text-white py-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <span className="mr-4 font-medium hidden sm:inline">Explore:</span>
          
          {/* Sliding Text Links */}
          <div className="relative h-8 w-full max-w-2xl overflow-hidden">
            <div 
              className="absolute whitespace-nowrap transition-transform duration-1000"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${slides.length * 100}%`
              }}
            >
              {slides.map((slide, index) => (
                <Link
                  key={index}
                  to={slide.link}
                  className={`inline-block w-full text-center px-4 text-lg font-medium hover:text-amber-300 transition-colors duration-300 ${
                    currentSlide === index ? 'text-amber-300' : 'text-white'
                  }`}
                >
                  {slide.text}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Manual Navigation (dots) */}
          <div className="hidden md:flex ml-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-amber-300' : 'bg-white/50'
                }`}
                aria-label={`Go to ${slides[index].text}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;