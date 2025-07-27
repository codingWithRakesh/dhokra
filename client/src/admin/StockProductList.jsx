import { useState, useEffect } from 'react';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/catagoryImage/1.jpg';
import img2 from '../assets/catagoryImage/2.jpg';
import img3 from '../assets/catagoryImage/3.jpg';
import img4 from '../assets/catagoryImage/4.jpg';

const StockProductList = () => {
  const [stockProducts, setStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch stock products
    const fetchStockProducts = async () => {
      try {
        // Mock data - replace with actual API call
        const mockStockProducts = [
          { id: 1, name: "Dokra Horse Statue", price: 2999, image: img1 },
          { id: 2, name: "Brass Table Lamp", price: 3999, image: img2 },
          { id: 3, name: "Terracotta Pot", price: 1299, image: img3 },
          { id: 4, name: "Wooden Jewelry Box", price: 2499, image: img4 }
        ];
        
        setStockProducts(mockStockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock products:", error);
        setLoading(false);
      }
    };

    fetchStockProducts();
  }, []);

  const removeFromStock = (productId) => {
    if (window.confirm('Are you sure you want to remove this product from stock?')) {
      setStockProducts(stockProducts.filter(product => product.id !== productId));
      // Here you would also make an API call to update the backend
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="text-gray-600 text-xl" />
        </button>
        <h1 className="text-2xl font-bold text-emerald-800">Stock Products</h1>
      </div>

      {stockProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No stock products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stockProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => removeFromStock(product.id)}
                  className="w-full flex items-center justify-center px-4 py-2 font-semibold bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 className="mr-2" />
                  Remove from Stock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockProductList;