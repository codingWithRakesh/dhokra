import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import trendingStore from "../store/trendingStore.js"
import ProductGridSkeleton from './ProductSkeleton.jsx';

const TrendingDhokraSection = () => {
  const { allTrending, setAllTrending, isLoading, error } = trendingStore();

  // Fetch trending products when component mounts
  useEffect(() => {
    setAllTrending();
  }, [setAllTrending]);

  // Get last 8 trending products and transform the data
  const lastFiveTrending = (allTrending || []).slice(0, 8).map(item => ({
    id: item.product?._id,
    name: item.product?.name,
    price: item.product?.priceDiscount,
    maxprice: item.product?.priceFixed !== item.product?.priceDiscount ? item.product?.priceFixed : null,
    category: item.product?.category,
    image: item.product?.images?.[0] // Use the first image
  })).filter(p => p.id);

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-0 lg:px-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <span className="text-brand-gold font-semibold uppercase tracking-wider mb-1 block text-sm">
              Handcrafted Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-green-dark">
              Gift Corner
            </h2>
          </div>
          <Link 
            to="/product/trending" 
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-light text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group text-sm md:text-base"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading/Error and Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : error ? (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-4">
            <p className="text-amber-800 font-medium">Failed to fetch trending gifts. Showing placeholders.</p>
            <div className="mt-4 opacity-50">
              <ProductGridSkeleton count={4} />
            </div>
          </div>
        ) : lastFiveTrending.length === 0 ? (
          <div className="text-center py-12 text-stone-500 italic">
            No trending products available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {lastFiveTrending.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 border border-stone-100 flex flex-col h-full cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-stone-50/50 p-4 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-brand-green font-bold px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md border border-stone-100 flex items-baseline gap-1">
                    <span className="text-xs font-semibold text-stone-400 line-through">
                      {product.maxprice ? `₹${product.maxprice}` : ''}
                    </span>
                    <span>₹{product.price}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-brand-green-dark mb-1 line-clamp-2 h-12 md:h-14 font-serif-premium" title={product.name}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-brand-gold uppercase tracking-wider font-semibold">
                      {product.category?.replace(/-/g, ' ')}
                    </p>
                  </div>
                  
                  <div className="flex justify-end items-center mt-3 pt-3 border-t border-stone-50">
                    <Link
                      to={`/product/${product.category}/${product.id}`}
                      className="text-white bg-brand-green hover:bg-brand-green-light py-2 px-4 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Trending Ribbon */}
                <div className="absolute top-0 left-0 bg-brand-gold text-brand-green-dark text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-br-2xl shadow-sm uppercase tracking-wider">
                  Popular
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingDhokraSection;