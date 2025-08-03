import React from 'react';
import { Link } from 'react-router-dom';

const ExtraProduct = ({ products }) => {
  // Function to truncate long product titles
  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength 
      ? `${title.substring(0, maxLength)}...` 
      : title;
  };

  // Calculate discount percentage
  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className="mt-12 mb-16">
      <h3 className="text-xl font-bold mb-6 text-gray-800">You May Also Like</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.slice(0, 15).map((product) => (
          <Link 
            to={`/product/${product.category}/${product._id}`}
            key={product._id}
            className="group block"
          >
            <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden relative">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300'; // Fallback image
                }}
              />
              
              {/* Discount Badge */}
              {product.priceDiscount && product.priceFixed > product.priceDiscount && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {calculateDiscount(product.priceFixed, product.priceDiscount)}% OFF
                </span>
              )}
            </div>
            
            <div className="mt-2">
              <h4 className="text-md font-medium text-gray-900 group-hover:text-indigo-600">
                {truncateTitle(product.name)}
              </h4>
              <p className="text-sm font-semibold text-gray-800">
                {product.priceDiscount ? (
                  <>
                    <span className="text-yellow-600">₹{product.priceDiscount.toFixed(2)}</span>
                    <span className="ml-1 text-gray-500 line-through">₹{product.priceFixed.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-yellow-600">₹{product.priceFixed.toFixed(2)}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExtraProduct;