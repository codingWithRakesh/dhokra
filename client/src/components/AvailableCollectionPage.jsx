import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import availableCollectionStore from "../store/availableCollectionStore.js"
import ProductGridSkeleton from './ProductSkeleton.jsx';

const FeaturedCollectionSection = () => {
  const { allAvailableCollection, setAllAvailableCollection, isLoading, error } = availableCollectionStore();

  useEffect(() => {
    setAllAvailableCollection();
  }, [setAllAvailableCollection]);

  const lastFiveProducts = (allAvailableCollection || []).slice(0, 5).map(item => ({
    id: item.product?._id,
    name: item.product?.name,
    price: `₹${item.product?.priceDiscount}`,
    maxprice: item.product?.priceFixed !== item.product?.priceDiscount ? `₹${item.product?.priceFixed}` : null,
    category: item.product?.category,
    image: item.product?.images?.[0]
  })).filter(p => p.id); // Filter out any undefined elements
  
  const limitTitle = (title, maxLength = 20) => {
    if (!title) return "";
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <section className="py-4 bg-brand-warm-bg border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-0 lg:px-0">
        {/* Header */}
        <div className="text-left mb-10">
          <span className="inline-block text-brand-gold text-sm md:text-md uppercase tracking-widest mb-2 font-semibold">
            Our Available
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-3">
            <span className="text-brand-green">Dhokra</span> Collection
          </h2>
          <p className="text-stone-600 text-md md:text-lg max-w-2xl">
            Handcrafted Bengal Dokra metal art pieces ready for immediate purchase
          </p>
        </div>

        {/* Loading and Error states */}
        {isLoading ? (
          <div className="mb-8">
            <ProductGridSkeleton count={4} />
          </div>
        ) : error ? (
          <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-amber-800 font-medium">Unable to fetch available collections. Showing placeholders below.</p>
            <div className="mt-4 opacity-50">
              <ProductGridSkeleton count={4} />
            </div>
          </div>
        ) : lastFiveProducts.length === 0 ? (
          <div className="text-center py-12 text-stone-500 italic">
            No products available at the moment.
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {lastFiveProducts.map((product, index) => (
              <div
                key={product.id}
                className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} group`}
              >
                <div className={`h-full bg-white rounded-2xl shadow-sm border border-stone-100 transition-all duration-300 ease-out p-3 
                  group-hover:shadow-md group-hover:-translate-y-1.5 flex flex-col`}
                >
                  {/* Aspect Ratio Image Container */}
                  <div className={`relative pb-[100%] bg-stone-50 overflow-hidden rounded-xl flex-shrink-0`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className={`font-semibold text-brand-green-dark line-clamp-2 ${index === 0 ? 'text-lg md:text-2xl' : 'text-sm md:text-lg'}`}>
                        {limitTitle(product.name, index === 0 ? 36 : 22)}
                      </h3>
                      <p className="text-xs text-brand-gold uppercase tracking-wider font-semibold mt-1">
                        {product.category?.replace(/-/g, ' ')}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-50">
                      <div className="flex items-baseline gap-1.5">
                        {product.maxprice && (
                          <span className="text-stone-400 text-xs md:text-sm line-through">
                            {product.maxprice}
                          </span>
                        )}
                        <span className="text-brand-green font-bold text-sm md:text-xl">
                          {product.price}
                        </span>
                      </div>
                      <Link
                        to={`/product/${product.category}/${product.id}`}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-brand-green/5 group-hover:bg-brand-green text-brand-green group-hover:text-white transition-all duration-300 shadow-sm"
                        aria-label={`View ${product.name}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/product/available-collection"
            className="inline-flex items-center gap-2 hover:bg-brand-green-light font-semibold text-sm md:text-base bg-brand-green text-white px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollectionSection;