import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../store/productsList';
import { FiHeart, FiEye } from 'react-icons/fi';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const productsPerPage = 12;

  // Calculate discount percentage
  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen py-4 px-2 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800">Our Products</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Discount Badge */}
                {product.discountedPrice && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-md">
                    {calculateDiscount(product.price, product.discountedPrice)}% OFF
                  </span>
                )}
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 hover:opacity-100">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full shadow-md transition-colors duration-200 ${favorites.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiHeart />
                  </button>
                  <Link 
                    to={`/product/${product.category}/${product.id}`}
                    className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FiEye />
                  </Link>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                  {product.name}
                </h3>
                
                {/* Price */}
                <div className="mt-auto">
                  {product.discountedPrice ? (
                    <div className="flex items-center">
                      <p className="text-xl font-bold text-yellow-600">
                        ${product.discountedPrice.toFixed(2)}
                      </p>
                      <p className="ml-2 text-sm font-medium text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-yellow-600">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>
                
                {/* View Product Button */}
                <Link
                  to={`/product/${product.category}/${product.id}`}
                  className="mt-4 block w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white py-2 px-4 rounded transition-colors duration-200 font-semibold"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-emerald-900 text-white' : 'hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;