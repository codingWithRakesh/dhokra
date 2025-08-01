import { useState, useEffect } from 'react';
import { FiSave, FiX, FiUpload, FiTrash2 } from 'react-icons/fi';

const EditProductModal = ({ product, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
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
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
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
      if (product.image) {
        setImages([{ id: 'main', url: product.image }]);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    setUploadError('');
    const files = Array.from(e.target.files);
    
    // Check if adding these files would exceed the 5-image limit
    if (images.length + files.length > 5) {
      setUploadError(`You can upload a maximum of 5 images. You currently have ${images.length}.`);
      e.target.value = '';
      return;
    }

    // Check file sizes (max 5MB each)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setUploadError('Some files exceed the 5MB limit. Please upload smaller images.');
      e.target.value = '';
      return;
    }

    const newImages = files.map(file => ({
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      file
    }));
    
    setImages(prev => [...prev, ...newImages]);
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (mainImageIndex === index) {
      setMainImageIndex(0);
    } else if (mainImageIndex > index) {
      setMainImageIndex(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      ...formData,
      image: images[mainImageIndex]?.url || product.image
    };
    onSave(updatedProduct);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {mode === 'quick' ? 'Quick Edit' : 'Edit Product Details'}
            </h1>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {mode === 'full' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-gray-700">Product Images</label>
                <span className="text-xs text-gray-500">
                  {images.length}/5 images uploaded
                </span>
              </div>
              
              {uploadError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {uploadError}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <img 
                      src={image.url} 
                      alt={`Preview ${index}`}
                      className={`h-32 w-full object-cover rounded-lg border-2 ${mainImageIndex === index ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200'} transition-all`}
                      onClick={() => setMainImageIndex(index)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                      className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Remove image"
                    >
                      <FiTrash2 size={14} />
                    </button>
                    {mainImageIndex === index && (
                      <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label 
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                  >
                    <FiUpload className="text-gray-400 mb-2" size={20} />
                    <span className="text-sm text-gray-500 text-center px-2">Add Images</span>
                    <span className="text-xs text-gray-400 mt-1">(Max 5MB each)</span>
                    <input
                      id="image-upload"
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                      multiple
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                required
                placeholder="Enter product title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                required
                placeholder="Enter detailed product description"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)*</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  required
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fixed Price ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="fixedPrice"
                  value={formData.fixedPrice}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          {mode === 'full' && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="e.g. Red, Blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="e.g. S, M, L"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="e.g. Cotton, Leather"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">gm</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <FiSave />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;