import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Clock } from 'lucide-react';
import { Star, ArrowRight } from 'lucide-react';
import categories from '../store/store'; // Assuming you have a categories data file
import dhokraImage1 from '../assets/image/cos1.jpg'; 
import dhokraImage2 from '../assets/image/cos2.jpg';
import dhokraImage3 from '../assets/image/cos3.jpg';
import SideDetails from '../component/SideDetails';

const Home = () => {

   
  const featuredProducts = [
    {
      id: 1,
      name: 'Dhokra Elephant Statue',
      price: '₹2,499',
      image: dhokraImage1,
      comingSoon: true
    },
    {
      id: 2,
      name: 'Tribal Dhokra Wall Art',
      price: '₹1,799',
      image: dhokraImage2,
      comingSoon: true
    },
    {
      id: 3,
      name: 'Premium Dhokra Jewelry Set',
      price: 'Coming Soon',
      image: dhokraImage3,
      comingSoon: true
    },
  ];

   const trendingProducts = [
    {
      id: 1,
      name: 'Dhokra Elephant Statue',
      maxprice: '₹2,499',
      price: '₹1,899',
      rating: 4.8,
      image: dhokraImage1,
      link: '/product/dhokra-elephant'
    },
    {
      id: 2,
      name: 'Tribal Wall Hanging',
      maxprice: '₹1,799',
      price: '₹1,599',
      rating: 4.5,
      image: dhokraImage2,
      link: '/product/tribal-wall-hanging'
    },
    {
      id: 3,
      name: 'Dhokra Candle Stand',
      maxprice: '₹1,299',
      price: '₹1,799',
      rating: 4.7,
      image: dhokraImage3,
      link: '/product/candle-stand'
    },
  ];





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
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col">
        <main className="flex-grow">
            <section className="relative rounded-lg overflow-hidden shadow-xl">
                {/* Slider Container */}
                <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] min-h-[300px] sm:min-h-[400px] overflow-hidden">
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

            <section className="py-16 px-4 sm:px-6 lg:py-12 lg:px-0">
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
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                            Explore Our Collection
                        </button>
                        <button className="border border-emerald-800 text-emerald-900 hover:bg-emerald-50 font-medium py-3 px-8 rounded-lg transition duration-300">
                            Meet Our Artisans
                        </button>
                        </div>
                    </div>

                    {/* Image Grid - Now on right */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-2">
                        <div className="grid grid-rows-2 gap-4 h-full min-h-[400px] lg:min-h-[500px]">
                        {/* Top row - two square images */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-4 border-emerald-700">
                            <img
                                src={dhokraImage3}
                                alt="Dhokra artisan at work"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            </div>
                            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-4 border-emerald-700">
                            <img
                                src={dhokraImage2}
                                alt="Traditional wax mold making"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            </div>
                        </div>
                        
                        {/* Bottom row - single panoramic image */}
                        <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-4 border-emerald-700">
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

            <section className="py-4 px-4 sm:px-6 lg:px-0">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-left text-emerald-800 mb-8">
                    Our Categories
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="relative group overflow-hidden rounded shadow-md hover:shadow-xl transition-all duration-300">
                            {/* Category Image with Gradient Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                            </div>
                            
                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 px-16 pb-4 pt-8">
                                <div className="bg-emerald-500/90 backdrop-blur-sm rounded-lg px-2 py-2 transform translate-y-0 group-hover:translate-y-[-8px] transition-all duration-300 shadow-sm">
                                <h3 className="text-xl font-bold text-white text-center">
                                    {category.name}
                                </h3>
                                </div>
                            </div>

                            {/* Invisible Link Overlay */}
                            <Link 
                                to={category.link} 
                                className="absolute inset-0 z-10"
                                aria-label={`View ${category.name} collection`}
                            >
                                <span className="sr-only">View {category.name} collection</span>
                            </Link>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            <section className="py-8 px-4 sm:px-6 lg:px-0">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingProducts.map((product) => (
                        <div key={product.id} className="group relative bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                        {/* Product Image */}
                        <div className="aspect-square overflow-hidden h-64 w-full">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-5 flex flex-col gap-2 justify-between">
                            <div className="flex flex-col justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold" style={{ textDecoration: 'line-through' }}>
                                    {product.maxprice}
                                </span>
                                <span className="text-yellow-500 font-bold">
                                    {product.price}
                                </span></div>
                            </div>

                            <Link
                            to={product.link}
                            className="w-full bg-emerald-300 hover:bg-emerald-600 text-emerald-800 hover:text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
                            >
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

            <section className="py-8 px-4 sm:px-6 lg:px-0">
                <SideDetails />
            </section>

             <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto">
                    <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
                        Our Upcoming Collection
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover authentic Bengal Dokra metal crafts, each piece a unique masterpiece
                    </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group relative overflow-hidden rounded shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                            <div className="aspect-square overflow-hidden">
                                <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {product.comingSoon && (
                                <div className="p-0">
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Coming Soon
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                                </div></div>
                                )}
                            </div>
                        </div>
                    ))}
                    </div>

                    <div className="text-center mt-6">
                    <Link
                        to="/coming-soon"
                        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-900 text-gray-100 font-medium px-6 py-3 rounded-lg transition duration-300"
                    >
                        <Clock className="w-5 h-5" />
                        View Upcoming Collections
                    </Link>
                    </div>
                </div>
            </section>








        </main>
    </div>
  );
};

export default Home;