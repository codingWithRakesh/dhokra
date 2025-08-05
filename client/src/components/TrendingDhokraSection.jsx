import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import trendingStore from "../store/trendingStore.js"

const TrendingDhokraSection = () => {
  const { allTrending, setAllTrending } = trendingStore();

  // Fetch trending products when component mounts
  useEffect(() => {
    setAllTrending();
    
  }, [setAllTrending]);

  // Get last 5 trending products and transform the data
  const lastFiveTrending = allTrending.slice(0, 4).map(item => ({
    id: item.product._id,
    name: item.product.name,
    price: item.product.priceDiscount,
    maxprice: item.product.priceFixed !== item.product.priceDiscount ? item.product.priceFixed : null,
    category: item.product.category,
    image: item.product.images[0] // Use the first image
  }));

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <span className="text-emerald-600 font-medium mb-1 md:mb-2 block text-sm md:text-base">Handcrafted Collection</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900">
              Trending Dokra Art
            </h2>
          </div>
          <Link 
            to="/product/trending" 
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-medium px-6 py-2 md:px-8 md:py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group text-sm md:text-base"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid - Now showing only last 5 */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {lastFiveTrending.map((product) => (
            <div key={product.id} className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-emerald-100 cursor-pointer">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-emerald-50/30 p-4 md:p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price Badge */}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/90 backdrop-blur-sm text-yellow-500 font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm shadow-md border border-emerald-100">
                  ₹{product.price}
                  {product.maxprice && (
                    <span className="ml-1 text-[10px] md:text-xs line-through opacity-70 text-emerald-800">₹{product.maxprice}</span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2 h-12 md:h-14" title={product.name}>
                  {product.name}
                </h3>
                <div className="flex justify-end items-center mt-2 md:mt-3">
                  <Link
                    to={`/product/${product.category}/${product.id}`}
                    className="text-white hover:text-yellow-300 bg-gradient-to-r from-emerald-600 to-emerald-800 py-2 px-2 md:py-2 md:px-3 rounded-md font-medium text-xs md:text-sm flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              </div>

              {/* Trending Ribbon */}
              <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-br-lg rounded-tl-lg shadow-sm">
                Popular
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDhokraSection;