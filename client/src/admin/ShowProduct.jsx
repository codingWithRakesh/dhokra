import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiTrendingUp, FiPackage, FiSearch } from 'react-icons/fi';
import { navItems } from '../store/store';

const ShowProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  // Mock data - replace with actual API calls
  const mockProducts = {
    "GI Bengal Dokra": [
      { id: 1, title: "Dokra Elephant", price: 2499, description: "Handcrafted Dokra elephant figurine", isTrending: false, isStock: true },
      { id: 2, title: "Dokra Horse", price: 2999, description: "Traditional Dokra horse statue", isTrending: true, isStock: true }
    ],
    "Patina Finish on Dokra": [
      { id: 3, title: "Patina Bowl", price: 1799, description: "Artistic patina finish bowl", isTrending: false, isStock: true }
    ],
    "Wall hanging": [
      { id: 4, title: "Metal Wall Art", price: 3499, description: "Intricate metal wall hanging", isTrending: true, isStock: false }
    ]
  };

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const categoryProducts = mockProducts[selectedCategory] || [];
        setProducts(categoryProducts);
        setLoading(false);
      }, 500);
    }
  }, [selectedCategory]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditFormData({
      title: product.title,
      price: product.price,
      description: product.description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEdit = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...editFormData } : product
    ));
    setEditingProduct(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const toggleTrending = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, isTrending: !product.isTrending } : product
    ));
  };

  const toggleStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, isStock: !product.isStock } : product
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>
        
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {navItems.map((item) => (
              <option key={item.path} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <>
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingProduct === product.id ? (
                            <input
                              type="text"
                              name="title"
                              value={editFormData.title}
                              onChange={handleEditChange}
                              className="w-full px-2 py-1 border rounded"
                            />
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">{product.title}</div>
                              <div className="text-sm text-gray-500">{product.description}</div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingProduct === product.id ? (
                            <input
                              type="number"
                              name="price"
                              value={editFormData.price}
                              onChange={handleEditChange}
                              className="w-full px-2 py-1 border rounded"
                            />
                          ) : (
                            <span className="text-gray-900">₹{product.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isTrending ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {product.isTrending ? 'Trending' : 'Normal'}
                            </span>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isStock ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                              {product.isStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingProduct === product.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => saveEdit(product.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit"
                              >
                                <FiEdit />
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                              <button
                                onClick={() => toggleTrending(product.id)}
                                className={`${product.isTrending ? 'text-green-600' : 'text-gray-600'} hover:text-green-900`}
                                title={product.isTrending ? 'Remove from Trending' : 'Mark as Trending'}
                              >
                                <FiTrendingUp />
                              </button>
                              <button
                                onClick={() => toggleStock(product.id)}
                                className={`${product.isStock ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-900`}
                                title={product.isStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                              >
                                <FiPackage />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm ? 'No products match your search' : 'No products found in this category'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;