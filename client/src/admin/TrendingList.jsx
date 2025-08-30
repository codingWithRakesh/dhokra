import { useEffect } from 'react';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/catagoryImage/1.jpg';
import trendingStore from "../store/trendingStore.js";

const TrendingList = () => {
  const navigate = useNavigate();
  const {
    allTrending,
    setAllTrending,
    removeTrending,
    isLoading,
    error,
    message
  } = trendingStore();

  useEffect(() => {
    // Fetch all trending products when component mounts
    setAllTrending();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  const handleRemoveFromTrending = async (trendingId) => {
    if (window.confirm('Are you sure you want to remove this product from trending?')) {
      try {
        await removeTrending(trendingId);
        // Refresh the list after successful removal
        await setAllTrending();
      } catch (err) {
        console.error("Error removing trending product:", err);
      }
    }
  };

  if (isLoading && allTrending.length === 0) {
    return (
      <div className="inline-flex min-h-full mx-auto py-12 w-full justify-center items-center gap-2">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="text-center py-12 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="text-gray-600 text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-emerald-800">Trending Products</h1>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {allTrending.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No trending products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allTrending.map((item) => {
            const product = item.product;
            return (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.images?.[0] || img1} // Use first image or fallback
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-600">₹{product.priceDiscount?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromTrending(item._id)}
                    className="w-full flex items-center justify-center px-4 py-2 font-semibold bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="mr-2" />
                    Remove from Trending
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrendingList;