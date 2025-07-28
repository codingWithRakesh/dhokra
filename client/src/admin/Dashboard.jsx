import { useEffect, useState } from 'react';
import { FiBox, FiTrendingUp, FiPackage, FiDatabase } from 'react-icons/fi';
import { navItems } from '../store/store';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        // Simulated API call with mock data
        const mockProductCounts = {
          "GI Bengal Dokra": { count: 15 },
          "Patina Finish on Dokra": { count: 8 },
          "Wall hanging": { count: 12 },
          "Table Top": { count: 6 },
          "Home Decore": { count: 20 },
          "Candle Stand": { count: 10 },
          "Trending": { count: 18 }, // This is the trending category
          "Available Collection": { count: 25 } // This is the stock category
        };

        const categoriesWithCounts = navItems.map(item => ({
          ...item,
          productCount: mockProductCounts[item.name]?.count || 0
        }));

        setCategories(categoriesWithCounts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product counts:", error);
        setLoading(false);
      }
    };

    fetchProductCounts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-full p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
  const trendingCategory = categories.find(cat => cat.name === "Trending");
  const stockCategory = categories.find(cat => cat.name === "Available Collection");
  const totalTrending = trendingCategory ? trendingCategory.productCount : 0;
  const totalStock = stockCategory ? stockCategory.productCount : 0;

  return (
    <div className="min-h-full p-4 md:p-4 xl:p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">Product Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your product inventory</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <FiBox className="text-indigo-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Total Categories</p>
              <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FiDatabase className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Trending Products</p>
              <p className="text-2xl font-bold text-gray-800">{totalTrending}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FiPackage className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Stock Products</p>
              <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              All Categories
              <span className="text-gray-500 text-sm font-normal ml-2">({categories.length})</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.path} 
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{category.name}</h3>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex flex-col gap-3 justify-center items-center">
                      <span className="px-5 py-3 bg-emerald-100 text-gray-800 rounded text-lg font-medium">
                        {category.productCount}
                      </span>
                      <span className="text-md text-gray-500 font-semibold">Total Products</span>
                    </div>
                  </div>
                  
                  <Link
                    to={category.path}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;