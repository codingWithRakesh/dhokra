import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Home = () => {





   const slides = [
    {
      id: 1,
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/9/453492298/VM/OQ/VY/232573763/dokra-dhokra-palki-tribal-art-03.jpg',
      alt: 'Dokra Artisan Crafting',
      title: 'Authentic Bengal Dokra Crafts',
      description: 'Handcrafted using ancient metalworking techniques',
    },
    {
      id: 2,
      image: 'https://punarnawa.com/cdn/shop/files/punarnawa-soul-of-artistry-dokra-decor-front-facing-dokra-craft-animals-the-pigeon-32440699289657.jpg?v=1705106304',
      alt: 'Traditional Dokra Products',
      title: 'Heritage Metal Artistry',
      description: 'Each piece tells a story of Bengal\'s rich culture',
    },
    {
      id: 3,
      image: 'https://folkcanvas.com/wp-content/uploads/2024/11/the-art-of-dhokra-handmadeinindia-housenama.jpg',
      alt: 'Handmade Metal Crafts',
      title: 'Timeless Dokra Creations',
      description: 'Preserving centuries-old craftsmanship',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying] = useState(true);

  // Slider navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  // Auto-play effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);



  return (
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col">
        <main className="flex-grow">
            <section className="relative rounded-lg overflow-hidden shadow-xl">
                {/* Slider Container */}
                <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[400px] overflow-hidden">
                    {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {/* Background Image */}
                        <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        />
                        
                        {/* Text Overlay - Bottom Aligned */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end pb-8 sm:pb-12 md:pb-12 lg:pb-12 px-4 sm:px-6 text-center">
                            <div className="max-w-2xl mx-auto text-white animate-fadeInUp">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
                                {slide.title}
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 drop-shadow-md text-amber-300">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full transition z-10"
                    aria-label="Previous slide"
                    >
                    <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 sm:p-2 rounded-full transition z-10"
                    aria-label="Next slide"
                    >
                    <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {slides.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
                            index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
};

export default Home;