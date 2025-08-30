import { useEffect, useState } from 'react';
import { FiBox, FiTrendingUp, FiPackage, FiDatabase } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import productStore from "../store/productStore.js"
import trendingStore from "../store/trendingStore.js"
import availableCollectionStore from "../store/availableCollectionStore.js"
import {categorys} from "../constant/constant.js"

const CategoriesDashboard = ({ name }) => {
  const { productCountCategory, setProductCountCategory } = productStore();
  const { countTrending, setCountTrending } = trendingStore();
  const { countAvailableCollection, setCountAvailableCollection } = availableCollectionStore();

  useEffect(() => {
    if (!name) return;
    if (name === "Gift Items") {
      setCountTrending();
    } else if (name === "Available Collection") {
      setCountAvailableCollection();
    } else {
      setProductCountCategory(name);
    }
  }, [name])

  // Get the count based on the category name
  const getCount = () => {
    if (name === "Gift Items") return countTrending?.count || 0;
    if (name === "Available Collection") return countAvailableCollection?.count || 0;
    return productCountCategory[name] || 0; // Get count from the productCounts object
  };

  // Get the path based on the category name
  const getPath = () => {
    if (name === "Gift Items") return "/product/trending";
    if (name === "Available Collection") return "/product/available-collection";
    return `/product/${name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{name}</h3>

        <div className="space-y-3 mb-5">
          <div className="flex flex-col gap-3 justify-center items-center">
            <span className="px-5 py-3 bg-emerald-100 text-gray-800 rounded text-lg font-medium">
              {getCount()}
            </span>
            <span className="text-md text-gray-500 font-semibold">Total Products</span>
          </div>
        </div>

        <Link
          to={getPath()}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          View Products
        </Link>
      </div>
    </div>
  )
}

const Dashboard = () => {
  // const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalProductCount, setTotalProductCount } = productStore();
  const { countTrending, setCountTrending } = trendingStore();
  const { countAvailableCollection, setCountAvailableCollection } = availableCollectionStore();

  const mockProductCounts = [...categorys, "Gift Items", "Available Collection"];

  useEffect(() => {
    const fetchProductCounts = async () => {
      setLoading(true);
      try {
        await setTotalProductCount();
        await setCountTrending();
        await setCountAvailableCollection();
      } finally {
        setLoading(false);
      }
    };

    fetchProductCounts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  if (loading) {
    return (
      <div className="inline-flex min-h-full mx-auto py-12 w-full justify-center items-center gap-2">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-4 xl:p-0">
      <div className="max-w-6xl mx-auto">
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
              <p className="text-2xl font-bold text-gray-800">{mockProductCounts.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FiDatabase className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{totalProductCount?.total}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Gift Items</p>
              <p className="text-2xl font-bold text-gray-800">{countTrending?.count}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 flex items-start border border-gray-100">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FiPackage className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-800">Stock Products</p>
              <p className="text-2xl font-bold text-gray-800">{countAvailableCollection?.count}</p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              All Categories
              <span className="text-gray-500 text-sm font-normal ml-2">({mockProductCounts.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProductCounts.map((category) => (
              <CategoriesDashboard key={category} name={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;