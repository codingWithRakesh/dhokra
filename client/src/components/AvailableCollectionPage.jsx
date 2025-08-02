import { ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import availableCollectionStore from "../store/availableCollectionStore.js"

const FeaturedCollectionSection = () => {
  const { allAvailableCollection, setAllAvailableCollection } = availableCollectionStore();

  // Fetch available collections when component mounts
  useEffect(() => {
    setAllAvailableCollection();
  }, [setAllAvailableCollection]);

  // Get last 5 products from the collection
  const lastFiveProducts = allAvailableCollection.slice(0, 5).map(item => ({
    id: item.product._id,
    name: item.product.name,
    price: `₹${item.product.priceDiscount}`,
    maxprice: item.product.priceFixed !== item.product.priceDiscount ? `₹${item.product.priceFixed}` : null,
    category: item.product.category,
    image: item.product.images[0] // Use the first image
  })).reverse();
  
  // Function to limit title length
  const limitTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - More Compact */}
        <div className="text-left mb-6">
          <span className="inline-block text-emerald-700 text-md md:text-lg uppercase tracking-widest mb-1 font-mono">
            Our Available
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">
            <span className="text-emerald-600">Dhokra</span> Collection
          </h2>
          <p className="text-gray-600 text-md md:text-lg">
            Handcrafted Bengal Dokra metal art pieces ready for immediate purchase
          </p>
        </div>

        {/* 2-Column Grid for Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {lastFiveProducts.map((product, index) => (
            <div
              key={product.id}
              className={`relative h-[220px] sm:h-[260px] ${index === 0 ? 'md:col-span-2 md:row-span-2 md:h-[400px]' : ''} group`}
            >
              {/* Compact Product Card */}
              <div className={`absolute inset-0 bg-white rounded-lg shadow-sm transition-all duration-300 ease-out p-2 
                group-hover:shadow-md group-hover:-translate-y-1`}
              >
                {/* Product Image */}
                <div className={`relative bg-blue-100/30 overflow-hidden ${index === 0 ? 'h-[70%] md:h-[75%]' : 'h-[65%]'} w-full`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 rounded"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="mt-2">
                  <h3 className="text-sm md:text-xl font-medium text-gray-900 line-clamp-2">
                    {limitTitle(product.name, index === 0 ? 30 : 18)}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      {product.maxprice && (
                        <span className="text-gray-400 text-xs md:text-lg line-through">
                          {product.maxprice}
                        </span>
                      )}
                      <span className="text-emerald-600 font-medium text-xs md:text-lg">
                        {product.price}
                      </span>
                    </div>
                    <Link
                      to={`/product/${product.category}/${product.id}`}
                      className="w-6 h-6 md:w-12 md:h-8 flex items-center justify-center rounded-full bg-emerald-600/10 hover:bg-emerald-600/20"
                      aria-label={`View ${product.name}`}
                    >
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simplified CTA */}
        <div className="text-center">
          <Link
            to="/product/available-collection"
            className="inline-flex items-center gap-2 hover:text-yellow-400 font-medium text-sm md:text-lg bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
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