import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiTrendingUp, FiPackage, FiSearch } from 'react-icons/fi';
import EditProductModal from './EditProductPage';
import productStore from "../store/productStore.js";
import availableCollectionStore from "../store/availableCollectionStore.js";
import trendingStore from "../store/trendingStore.js";

const ShowProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editMode, setEditMode] = useState('quick');
  
  // Store hooks
  const { 
    productByCategory, 
    setProductByCategory,
    deleteProduct: deleteProductAPI,
    updateProduct: updateProductAPI,
    deleteProductImage
  } = productStore();
  
  const {
    addToAvailableCollection,
    removeFromAvailableCollection,
    allAvailableCollection,
    setAllAvailableCollection
  } = availableCollectionStore();
  
  const {
    addINTrending,
    removeTrending,
    allTrending,
    setAllTrending
  } = trendingStore();

  const categories = [
    "gi-bengal-dokra", 
    "patina-finish-on-dokra", 
    "wall-hanging", 
    "table-top", 
    "home-decore", 
    "candle-stands"
  ];

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setProductByCategory(selectedCategory)
        .finally(() => setLoading(false));
    }
  }, [selectedCategory, setProductByCategory]);

  // Fetch trending and available collections on mount
  useEffect(() => {
    setAllTrending();
    setAllAvailableCollection();
  }, [setAllTrending, setAllAvailableCollection]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productByCategory.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductAPI(productId);
        setProductByCategory(selectedCategory);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const toggleTrending = async (productId) => {
    try {
      const isTrending = allTrending.some(item => item.product._id === productId);
      
      if (isTrending) {
        const trendingItem = allTrending.find(item => item.product._id === productId);
        await removeTrending(trendingItem._id);
      } else {
        await addINTrending(productId);
      }
      
      await setAllTrending();
    } catch (error) {
      console.error('Failed to update trending status:', error);
    }
  };

  const toggleAvailableCollection = async (productId) => {
    try {
      const isInCollection = allAvailableCollection.some(item => item.product._id === productId);
      
      if (isInCollection) {
        const collectionItem = allAvailableCollection.find(item => item.product._id === productId);
        await removeFromAvailableCollection(collectionItem._id);
      } else {
        await addToAvailableCollection(productId);
      }
      
      await setAllAvailableCollection();
    } catch (error) {
      console.error('Failed to update available collection status:', error);
    }
  };

  const openEditModal = (product, mode) => {
    setCurrentProduct(product);
    setEditMode(mode);
    setShowEditModal(true);
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      const { _id, ...updateData } = updatedProduct;
      await updateProductAPI(_id, updateData);
      setShowEditModal(false);
      setProductByCategory(selectedCategory);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const isTrending = (productId) => {
    return allTrending.some(item => item.product._id === productId);
  };

  const isInAvailableCollection = (productId) => {
    return allAvailableCollection.some(item => item.product._id === productId);
  };

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Manage Products</h1>

        {/* Category and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {selectedCategory && (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-gray-500 text-sm">Price: </span>
                          <span className="text-emerald-600 font-medium">₹{product.priceDiscount?.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Fixed: </span>
                          <span className="text-red-600 font-medium">₹{product.priceFixed?.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openEditModal(product, 'quick')}
                          className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <FiEdit className="mr-2" />
                          Quick Edit
                        </button>
                        <button
                          onClick={() => openEditModal(product, 'full')}
                          className="flex items-center justify-center px-3 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors"
                        >
                          <FiEdit className="mr-2" />
                          Full Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete
                        </button>
                        <button
                          onClick={() => toggleTrending(product._id)}
                          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
                            isTrending(product._id) 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <FiTrendingUp className="mr-2" />
                          {isTrending(product._id) ? 'Trending' : 'Make Trend'}
                        </button>
                        <button
                          onClick={() => toggleAvailableCollection(product._id)}
                          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${
                            isInAvailableCollection(product._id) 
                              ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <FiPackage className="mr-2" />
                          {isInAvailableCollection(product._id) ? 'In Collection' : 'Add to Collection'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-emerald-500 font-semibold italic">
                  {searchTerm ? 'No products match your search' : 'No products found in this category'}
                </p>
              </div>
            )}
          </>
        )}

        {showEditModal && (
          <EditProductModal
            product={currentProduct}
            mode={editMode}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ShowProduct;