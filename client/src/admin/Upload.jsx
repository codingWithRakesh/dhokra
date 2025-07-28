import { useState, useRef } from 'react';
import { FiUpload, FiX, FiPlus } from 'react-icons/fi';
import { navItems } from '../store/store';

const Upload = () => {
  // Form states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [fixedPrice, setFixedPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // Size specifications
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  
  // Other specifications
  const [color, setColor] = useState('Golden');
  const [material, setMaterial] = useState('Kansa');
  const [utility, setUtility] = useState('Home Decor');
  const [weight, setWeight] = useState('');
  
  // Image handling
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 5) {
      alert('You can upload maximum 5 images');
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (mainImageIndex === index) setMainImageIndex(0);
    else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
  };

  const setAsMainImage = (index) => {
    setMainImageIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    
    // Combine size components
    const size = `H-${height} * W-${width} * L-${length} inch`;
    
    // Prepare data for submission
    const productData = {
      category: selectedCategory,
      title,
      price,
      fixedPrice,
      description,
      specifications: {
        color,
        size,
        material,
        utility,
        weight
      },
      images: images.map(img => img.file),
      mainImageIndex
    };
    
    console.log('Submitting product:', productData);
    alert('Product submitted successfully!');
    
    // Reset form after submission
    setSelectedCategory('');
    setTitle('');
    setPrice('');
    setFixedPrice('');
    setDescription('');
    setHeight('');
    setWidth('');
    setLength('');
    setColor('Golden');
    setMaterial('Kansa');
    setUtility('Home Decor');
    setWeight('');
    setImages([]);
    setMainImageIndex(0);
  };

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Add New Product</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Category Selection - updated for object structure */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {navItems.map((item, index) => (
                <option key={index} value={item.name} className="text-gray-700 border-2 font-semibold">
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images*</label>
            <p className="text-sm text-gray-500 mb-3">First image will be the main display image. Min 1, Max 5 images.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.preview} 
                    alt={`Preview ${index}`}
                    className={`h-32 w-full object-cover rounded border-2 ${mainImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <FiX size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAsMainImage(index)}
                      className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  {mainImageIndex === index && (
                    <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
              
              {images.length < 5 && (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer h-32"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload className="text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
              )}
            </div>
            
            {images.length === 0 && (
              <div className="text-red-500 text-sm">Please upload at least one image</div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter product title"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price*</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fixed Price (optional)</label>
              <input
                type="number"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter fixed price"
              />
            </div>
          </div>
          
          {/* Product Specifications */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Product Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Colour</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              {/* Size Components */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (in inches)</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Height*</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Height" required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Width*</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Width" required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Length*</label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Length" required
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Will be displayed as: H-{height || '0'} * W-{width || '0'} * L-{length || '0'} inch
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Utility</label>
                <input
                  type="text"
                  value={utility}
                  onChange={(e) => setUtility(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight*</label>
                <input
                  type="number"
                  value={weight}
                  placeholder='Weight in grams'
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required
                />
              </div>
            </div>
          </div>
          
          {/* Product Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter detailed product description"
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={images.length === 0 || !selectedCategory}
              className={`px-4 py-2 rounded-md text-white ${images.length === 0 || !selectedCategory ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;