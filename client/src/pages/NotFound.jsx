import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-full flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-lg mx-auto">
            {/* Error Icon */}
            <div className="text-emerald-500 mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 mx-auto" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            
            {/* Error Message */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
              >
                Return Home
              </Link>
              <Link 
                to="/contact" 
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-3 px-8 rounded-lg transition duration-300"
              >
                Contact Support
              </Link>
            </div>
            
            {/* Search Suggestion */}
            <div className="mt-12 max-w-md mx-auto">
              <p className="text-gray-500 mb-3">Or try searching:</p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search our site..." 
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default NotFound;