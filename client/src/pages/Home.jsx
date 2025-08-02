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
import dhokraImage2 from '../assets/image/cos2.jpg';
import dhokraImage3 from '../assets/image/cos3.jpg';
import TrendingDhokraSection from '../components/TrendingDhokraSection';
import FeaturedCollectionSection from "../components/AvailableCollectionPage";
import FixImg from '../components/FixImg';
import newimg1 from "../assets/image/Home-Decor1-1.webp";
import newimg2 from "../assets/image/Small-Banners-2.webp";
import newimg3 from "../assets/image/Small-Banners-3.webp";

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
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col">
            <main className="flex-grow">
                <section className="py-0 sm:px-4 lg:px-0">
                    <div className="p-0">
                        <FixImg selectedImage={selectedImage} />
                    </div>
                </section>

                <section className="py-6 sm:px-6 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                                    Explore Our Collections
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl">
                                    Discover authentic Dhokra craftsmanship across various categories
                                </p>
                            </div>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    <div className="w-full mx-auto">
                        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
                            {/* Text Content - Now on left */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-start order-1 lg:order-1">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-6 leading-tight">
                                    Dhokra – Ancient Metal Craft of India
                                </h2>
                                <div className="prose prose-lg text-gray-600 max-w-2xl">
                                    <p className="mb-4">
                                        Dhokra is an ancient metal craft using the lost-wax casting technique, practised by tribal artisans for thousands of years. It creates unique brass items with detailed designs and a rustic look.
                                    </p>
                                    <p className="mb-4">
                                        These handcrafted pieces include figurines, jewellery, and home decor, reflecting India’s rich cultural heritage and traditional craftsmanship.
                                    </p>
                                </div>
                                <div className="mt-8 flex text-sm md:text-base flex-row gap-4">
                                    <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                                        Explore Our Collection
                                    </button>
                                    <button className="border border-emerald-800 text-emerald-900 hover:bg-emerald-50 font-medium py-3 px-8 rounded-lg transition duration-300">
                                        Read More
                                    </button>
                                </div>
                            </div>

                            {/* Image Grid - Now on right */}
                            <div className="w-full lg:w-1/2 order-2 lg:order-2">
                                <div className="grid grid-rows-2 gap-4 h-full min-h-[400px] lg:min-h-[500px]">
                                    {/* Top row - two square images */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative overflow-hidden rounded bg-blue-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                            <img
                                                src={newimg1}
                                                alt="Dhokra artisan at work"
                                                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>
                                        <div className="relative overflow-hidden rounded bg-blue-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                            <img
                                                src={newimg2}
                                                alt="Traditional wax mold making"
                                                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom row - single panoramic image */}
                                    <div className="relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                        <img
                                            src={dhokraImage1}
                                            alt="Finished Dhokra products collection"
                                            className="absolute inset-0 w-full h-full object-fit transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                                            <span className="text-white font-medium text-lg bg-emerald-700 p-2 rounded">Handcrafted in West Bengal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative rounded-sm overflow-hidden shadow-xl">
                    {/* Slider Container */}
                    <div className="relative max-w-full h-[50vh] md:h-[70vh] overflow-hidden">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
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

                <section className="py-4 sm:px-6 lg:px-0">
                    <TrendingDhokraSection />
                </section>

                <section className="py-4 sm:px-6 lg:px-0">
                    <SideDetails />
                </section>

                <section className="p-0">
                    <Slide />
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