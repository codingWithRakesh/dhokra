import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Store from '../store/store';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronRight } from 'lucide-react';
import { slides } from "../store/store";
import SideDetails from '../components/SideDetails';
import { motion, AnimatePresence } from 'framer-motion';
import Slide from '../component/Slide';
import SocialCommunity from '../components/Social';
import dhokraImage1 from '../assets/image/cos1.jpg';
import TrendingDhokraSection from '../components/TrendingDhokraSection';
import FeaturedCollectionSection from "../components/AvailableCollectionPage";
import FixImg from '../components/FixImg';
import newimg1 from "../assets/image/Home-Decor1-1.webp";
import newimg2 from "../assets/image/Small-Banners-2.webp";

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);

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


    const [showPopups, setShowPopups] = useState(false);

    useEffect(() => {
        // Trigger popups after component mounts
        const timer = setTimeout(() => {
            setShowPopups(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
    }, []);

  return (
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col">
        <main className="flex-grow">
            <section className="py-0">
                <div className="p-0">
                    <FixImg selectedImage={selectedImage} />
                </div>
            </section>

            <section className="py-6 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                        Explore Our Collections
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                        Discover authentic Dokra craftsmanship across various categories
                        </p>
                    </div>
                    </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
                            {Store.categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative group overflow-hidden rounded shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
                                    </div>

                                    {/* Pop-up Effect (Desktop) */}
                                    <AnimatePresence>
                                        {showPopups && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.15,
                                                    type: "spring",
                                                    stiffness: 100
                                                }}
                                                className="hidden md:block absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
                                            >
                                                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform transition-all duration-300 group-hover:bg-white group-hover:shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-sm md:text-base font-bold text-emerald-800">
                                                            {category.name}
                                                        </h3>
                                                        <Link
                                                            to={category.link}
                                                            className="mt-0 inline-flex items-center text-md font-medium text-emerald-600 hover:text-emerald-800 transition-colors text-sm md:text-base pointer-events-auto"
                                                        >
                                                            Shop now <ChevronRight className="w-4 h-4 ml-1" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Mobile Info (always visible) */}
                                    <div className="md:hidden">
                                        <h3 className="font-bold text-emerald-800 p-2">
                                            {category.name}
                                        </h3>
                                    </div>

                                    {/* Full Card Link */}
                                    <Link
                                        to={category.link}
                                        className="absolute inset-0 z-10"
                                        aria-label={`Explore ${category.name} collection`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-4 sm:px-6 lg:px-0">
                    <TrendingDhokraSection />
                </section>

                {/* <section className="py-4">
                    <div className="max-w-7xl mx-auto p-0">
                        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16">
                        
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-2">
                            Traditional Craftsmanship
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            The Timeless Art of <span className="text-emerald-600">Dhokra</span> Metal Casting
                            </h2>
                            
                            <div className="prose prose-emerald text-gray-600 max-w-none">
                            <p className="text-lg">
                                Dhokra is an ancient form of metal casting using the lost-wax technique, preserved by tribal artisans for over 4,000 years. Each piece carries the legacy of India's rich cultural heritage.
                            </p>
                            <p className="text-lg">
                                Our collection features unique brass artifacts with intricate designs and a distinctive rustic charm, from decorative figurines to functional homeware.
                            </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                            <Link 
                                to="/product/available-collection"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm md:text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:bg-emerald-700 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                Explore Collection
                            </Link>
                            <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 border border-emerald-600 text-sm md:text-base font-medium rounded-lg text-emerald-700 bg-white hover:bg-emerald-50 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                Our Artisans' Story
                            </Link>
                            </div>
                        </div>

                       
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-rows-2 gap-4 h-full min-h-[400px] lg:min-h-[500px]">
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-square overflow-hidden rounded shadow-md hover:shadow-lg transition-all duration-300 group">
                                <img
                                    src={newimg1}
                                    alt="Dhokra artisan at work"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium">Artisan at Work</span>
                                </div>
                                </div>
                                <div className="relative aspect-square overflow-hidden rounded shadow-md hover:shadow-lg transition-all duration-300 group">
                                <img
                                    src={newimg2}
                                    alt="Traditional wax mold making"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium">Wax Mold Process</span>
                                </div>
                                </div>
                            </div>
                            
                            
                            <div className="relative overflow-hidden rounded shadow-md hover:shadow-lg transition-all duration-300 group">
                                <img
                                src={dhokraImage1}
                                alt="Finished Dhokra products collection"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                    <span className="text-emerald-700 font-medium">Handcrafted in West Bengal</span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section> */}

                <section className="relative rounded-sm overflow-hidden shadow-xl">
                    {/* Slider Container */}
                    <div className="relative max-w-full h-[25vh] md:h-[45vh] lg:h-[60vh] xl:h-[66vh] overflow-hidden">
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
                            className="w-full h-full "
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
                                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="p-0 mt-4">
                    <Slide />
                </section>

                <section className="py-4 sm:px-6 lg:px-0">
                    <SideDetails />
                </section>

                

                <section className="p-0">
                    <FeaturedCollectionSection />
                </section>

                <section className="p-0">
                    <SocialCommunity />
                </section>
            </main>
        </div>
    );
};

export default Home;