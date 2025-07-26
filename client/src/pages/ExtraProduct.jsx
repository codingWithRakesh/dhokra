import React from 'react';
import { Link } from 'react-router-dom';

const ExtraProduct = ({ products }) => {
  // Function to truncate long product titles
  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength 
      ? `${title.substring(0, maxLength)}...` 
      : title;
  };

  return (
    <div className="mt-12 mb-16">
      <h3 className="text-xl font-bold mb-6 text-gray-800">You May Also Like</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.slice(0, 10).map((product) => (
          <Link 
            to={`/product/${product.category}/${product.id}`}
            key={product.id}
            className="group block"
          >
            <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="mt-2">
              <h4 className="text-md font-medium text-gray-900 group-hover:text-indigo-600">
                {truncateTitle(product.name)}
              </h4>
              <p className="text-sm font-semibold text-gray-800">
                {product.discountedPrice ? (
                  <>
                    <span className="text-yellow-600 text-lg">${product.discountedPrice.toFixed(2)}</span>
                    <span className="ml-1 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                    <span className="text-yellow-600 text-lg">${product.price.toFixed(2)}</span>
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