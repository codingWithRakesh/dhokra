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

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const goToSlide = (index) => setCurrentSlide(index);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying]);

    const [showPopups, setShowPopups] = useState(false);

    useEffect(() => {
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
        <div className="min-h-screen bg-brand-warm-bg flex flex-col">
            <main className="flex-grow max-w-7xl mx-auto w-full px-0 lg:px-6">
                
                {/* Hero Top Fixed Image */}
                <section className="py-2">
                    <div className="p-0 rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-white">
                        <FixImg selectedImage={selectedImage} />
                    </div>
                </section>

                {/* Explore Categories Section */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <div className="mb-10 text-left">
                            <span className="text-brand-gold uppercase tracking-widest font-semibold text-sm block mb-1">
                                Handcrafted Heritage
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-3">
                                Explore Our Collections
                            </h2>
                            <p className="text-stone-600 text-md md:text-lg max-w-2xl">
                                Discover authentic Dokra craftsmanship across various handcrafted categories
                            </p>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {Store.categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-md border border-stone-100 bg-white transition-all duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/60 via-brand-green-dark/20 to-transparent" />
                                    </div>

                                    {/* Glassmorphic Info Overlay (Desktop) */}
                                    <AnimatePresence>
                                        {showPopups && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.1,
                                                    type: "spring",
                                                    stiffness: 120
                                                }}
                                                className="hidden md:block absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
                                            >
                                                <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-stone-200/50 shadow-sm flex justify-between items-center transition-all duration-300 group-hover:bg-white pointer-events-auto">
                                                    <h3 className="text-sm font-bold text-brand-green-dark">
                                                        {category.name}
                                                    </h3>
                                                    <Link
                                                        to={category.link}
                                                        className="inline-flex items-center text-xs font-semibold text-brand-green hover:text-brand-green-light transition-colors"
                                                    >
                                                        Shop <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Mobile Info Overlay (Always visible) */}
                                    <div className="md:hidden p-3 bg-white flex justify-between items-center border-t border-stone-50">
                                        <h3 className="font-bold text-brand-green-dark text-xs">
                                            {category.name}
                                        </h3>
                                        <ChevronRight className="w-4 h-4 text-brand-gold" />
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

                {/* Trending Gifts Section */}
                <section className="py-4">
                    <TrendingDhokraSection />
                </section>

                {/* Hero Editorial Slider */}
                <section className="relative rounded-2xl overflow-hidden shadow-md border border-stone-100 bg-brand-green-dark/10 my-10">
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[5/2] w-full">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                {/* Slide Image */}
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                
                                {/* Overlay Styling */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/95 via-brand-green-dark/50 to-transparent flex flex-col justify-end pb-5 sm:pb-10 md:pb-12 px-4 sm:px-12 text-center">
                                    <div className="max-w-3xl mx-auto text-white animate-fadeIn">
                                        <h2 className="text-base sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-1.5 sm:mb-4 drop-shadow-md leading-tight">
                                            {slide.title}
                                        </h2>
                                        <p className="text-[10px] sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 drop-shadow-sm text-brand-gold font-medium leading-relaxed">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-brand-green text-white p-2 rounded-full transition z-10 shadow-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-brand-green text-white p-2 rounded-full transition z-10 shadow-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>

                        {/* Slider Dot Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-1.5 rounded-full transition-all ${
                                        index === currentSlide ? 'bg-brand-gold w-6' : 'bg-white/50 w-1.5'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video / Slide Section */}
                <section className="p-0 my-8">
                    <Slide />
                </section>

                {/* Features / Details grid */}
                <section className="py-6">
                    <SideDetails />
                </section>

                {/* Available Store Section */}
                <section className="p-0 rounded-2xl overflow-hidden my-6">
                    <FeaturedCollectionSection />
                </section>

                {/* Social Connects */}
                <section className="p-0 mt-8 mb-12">
                    <SocialCommunity />
                </section>
            </main>
        </div>
    );
};

export default Home;