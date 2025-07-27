import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiTrendingUp, FiPackage, FiSearch, FiSave, FiX } from 'react-icons/fi';
import { navItems } from '../store/store';
import img1 from '../assets/catagoryImage/1.jpg';
import img2 from '../assets/catagoryImage/2.jpg';
import img3 from '../assets/catagoryImage/3.jpg';
import img4 from '../assets/catagoryImage/4.jpg';
import EditProductModal from '../component/EditProductModal';

const ShowProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: '',
    fixedPrice: '',
    description: '',
    color: '',
    size: '',
    material: '',
    utility: '',
    weight: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data
  const mockProducts = {
    "GI Bengal Dokra": [
      { 
        id: 1, 
        title: "Dokra Elephant Statue", 
        price: 2499, 
        fixedPrice: 2999, 
        description: "Handcrafted Dokra elephant figurine made using traditional metal casting technique", 
        image: img1,
        color: "Golden",
        size: "H-15 * W-8 * L-10 inch",
        material: "Kansa",
        utility: "Home Decor",
        weight: "259 gm"
      },
      { 
        id: 2, 
        title: "Dokra Horse Sculpture", 
        price: 2999, 
        fixedPrice: 3499, 
        description: "Traditional Dokra horse statue with intricate tribal patterns", 
        image: img2,
        color: "Bronze",
        size: "H-18 * W-6 * L-12 inch",
        material: "Brass",
        utility: "Showpiece",
        weight: "350 gm"
      },
      { 
        id: 3, 
        title: "Patina Finish Bowl", 
        price: 1799, 
        fixedPrice: 1999, 
        description: "Artistic patina finish bowl with antique look and feel", 
        image: img3,
        color: "Antique Green",
        size: "Diameter-12 inch",
        material: "Metal",
        utility: "Decorative",
        weight: "500 gm"
      },
      { 
        id: 4, 
        title: "Metal Wall Art Decor", 
        price: 3499, 
        fixedPrice: 3999, 
        description: "Intricate metal wall hanging with traditional motifs", 
        image: img4,
        color: "Multicolor",
        size: "24x24 inch",
        material: "Iron",
        utility: "Wall Decor",
        weight: "800 gm"
      }
    ],
    "Patina Finish on Dokra": [
      { 
        id: 3, 
        title: "Patina Finish Bowl", 
        price: 1799, 
        fixedPrice: 1999, 
        description: "Artistic patina finish bowl with antique look and feel", 
        image: img3,
        color: "Antique Green",
        size: "Diameter-12 inch",
        material: "Metal",
        utility: "Decorative",
        weight: "500 gm"
      }
    ],
    "Wall hanging": [
      { 
        id: 4, 
        title: "Metal Wall Art Decor", 
        price: 3499, 
        fixedPrice: 3999, 
        description: "Intricate metal wall hanging with traditional motifs", 
        image: img4,
        color: "Multicolor",
        size: "24x24 inch",
        material: "Iron",
        utility: "Wall Decor",
        weight: "800 gm"
      }
    ]
  };

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setTimeout(() => {
        const categoryProducts = mockProducts[selectedCategory] || [];
        setProducts(categoryProducts.map(p => ({ 
          ...p, 
          isTrending: false, 
          isStock: true 
        })));
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
    setShowEditModal(false);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowEditModal(false);
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

  const openEditModal = (product) => {
    setEditingProduct(product.id);
    setEditFormData({
      title: product.title,
      price: product.price,
      fixedPrice: product.fixedPrice,
      description: product.description,
      color: product.color || '',
      size: product.size || '',
      material: product.material || '',
      utility: product.utility || '',
      weight: product.weight || ''
    });
    setShowEditModal(true);
  };

  const handleFullEdit = (productId) => {
    // Navigate to edit page or open full edit modal
    console.log("Navigating to full edit page for product:", productId);
    // In a real app, you would do: navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Manage Products</h1>

        {/* Combined Category and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Category Selection */}
          <div className="flex-1">
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
          
          {/* Search Bar */}
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
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-gray-500 text-sm">Price: </span>
                          <span className="text-emerald-600 font-medium">₹{product.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Fixed: </span>
                          <span className="text-red-600 font-medium">₹{product.fixedPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <FiEdit className="mr-2" />
                          Quick Edit
                        </button>
                        <button
                          onClick={() => handleFullEdit(product.id)}
                          className="flex items-center justify-center px-3 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors"
                        >
                          <FiEdit className="mr-2" />
                          Full Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete
                        </button>
                        <button
                          onClick={() => toggleTrending(product.id)}
                          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${product.isTrending ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          <FiTrendingUp className="mr-2" />
                          {product.isTrending ? 'Trending' : 'Make Trend'}
                        </button>
                        <button
                          onClick={() => toggleStock(product.id)}
                          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${product.isStock ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          <FiPackage className="mr-2" />
                          {product.isStock ? 'Available' : 'Out of Stock'}
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

        {/* Edit Modal */}
        {showEditModal && (
          <EditProductModal
            product={products.find(p => p.id === editingProduct)}
            editFormData={editFormData}
            handleEditChange={handleEditChange}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            isOpen={showEditModal}
          />
        )}
      </div>
    </div>
  );
};

export default ShowProduct;