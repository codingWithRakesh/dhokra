import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Store  from '../store/store';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Clock } from 'lucide-react';
import { ArrowRight, CheckCircle, ShoppingBag } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { slides } from "../store/store"; // Adjust the path as per your folder structure
import { trendingProducts } from '../store/store';
import { featuredProducts } from '../store/store';
import SideDetails from '../component/SideDetails';
import Slide from '../component/Slide';
import SocialCommunity from '../component/Social';
import dhokraImage1 from '../assets/image/cos1.jpg'; 
import dhokraImage2 from '../assets/image/cos2.jpg';
import dhokraImage3 from '../assets/image/cos3.jpg';

const Home = () => {

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
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col">
        <main className="flex-grow">
            <section className="relative rounded-sm overflow-hidden shadow-xl">
                {/* Slider Container */}
                <div className="relative max-w-full h-[50vh] md:h-[70vh] overflow-hidden">
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
                        className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
                            index === currentSlide ? 'bg-white w-4 sm:w-6' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                    </div>
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
                        className="relative group overflow-hidden rounded shadow-md hover:shadow-lg transition-all duration-300 "
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

                        {/* Category Info */}
                        <div className="hidden md:block absolute bottom-0 left-0 right-0 p-5">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform transition-all duration-300 group-hover:bg-white group-hover:shadow-sm">
                            <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm md:text-base font-bold text-emerald-800">
                                {category.name}
                                </h3>
                            </div>
                            <Link
                                to={category.link}
                                className="mt-0 inline-flex items-center text-md font-medium text-emerald-600 hover:text-emerald-800 transition-colors text-sm md:text-base"
                            >
                                Shop now <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                            </div></div>
                        </div>
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
                            <div className="relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img
                                src={dhokraImage3}
                                alt="Dhokra artisan at work"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            </div>
                            <div className="relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                            <img
                                src={dhokraImage2}
                                alt="Traditional wax mold making"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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

            <section className="py-4 sm:px-6 lg:px-0">
                <div className="w-full mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                        Trending Dhokra Products
                        </h2>
                        <p className="text-lg text-emerald-600">
                        Most loved by our customers this season
                        </p>
                    </div>
                    <Link 
                        to="/trending" 
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
                    >
                        View All
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                    {trendingProducts.map((product) => (
                        <div key={product.id} className="group relative bg-white rounded shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                        {/* Product Image */}
                        <div className="aspect-square overflow-hidden md:h-64 w-full bg-gray-100">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h3>
                        </div>
                        {/* Product Info */}
                        <div className="p-3 flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold" style={{ textDecoration: 'line-through' }}>
                                    {product.maxprice}
                                </span>
                                <span className="text-yellow-500 font-bold">
                                    {product.price}
                                </span>
                            </div>
                        
                            <Link
                            to={`/product/${product.category}/${product.id}`}
                            className="w-full md:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white font-medium text-sm md:text-md py-2 px-0 md:px-4 rounded-lg flex items-center justify-center transition duration-300"
                            aria-label={`View details for ${product.name}`}>
                            View Details
                            </Link>
                        </div>

                        {/* Popular Badge */}
                        <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Trending
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            <section className="py-4 sm:px-6 lg:px-0">
                <SideDetails />
            </section>

            <section>
                <Slide />
            </section>

            <section className="py-4 sm:px-6 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
                            Our Available Collection
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Handcrafted Bengal Dokra metal art pieces ready for immediate purchase
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                <div className="aspect-square overflow-hidden relative bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Stock availability badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            In Stock
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center gap-2 text-lg">
                                            <span className="text-emerald-600 font-bold" style={{ textDecoration: 'line-through' }}>
                                                {product.maxprice}
                                            </span>
                                            <span className="text-yellow-500 font-bold">
                                                {product.price}
                                            </span>
                                        </div>
                                        <Link to={`/product/${product.category}/${product.id}`}>
                                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-md font-medium transition-colors duration-300">
                                                view details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            to="/product/available-collection"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            <section className="p-0">
                <SocialCommunity />
            </section>

        </main>
    </div>
  );
};

export default Home;