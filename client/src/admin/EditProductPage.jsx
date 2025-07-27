import { useState, useEffect } from 'react';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockProduct = {
            id: productId,
            title: "Sample Product",
            price: 2499,
            fixedPrice: 2999,
            description: "Sample description",
            color: "Golden",
            size: "H-15 * W-8 * L-10 inch",
            material: "Kansa",
            utility: "Home Decor",
            weight: "259 gm",
            images: [
              { id: 1, url: "sample-image-1.jpg" },
              { id: 2, url: "sample-image-2.jpg" }
            ]
          };
          setProduct(mockProduct);
          setFormData({
            title: mockProduct.title,
            price: mockProduct.price,
            fixedPrice: mockProduct.fixedPrice,
            description: mockProduct.description,
            color: mockProduct.color,
            size: mockProduct.size,
            material: mockProduct.material,
            utility: mockProduct.utility,
            weight: mockProduct.weight
          });
          setImages(mockProduct.images);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    // Handle image upload logic
  };

  const removeImage = (index) => {
    // Handle image removal logic
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes logic
    console.log("Updated product:", formData);
    alert("Product updated successfully!");
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="min-h-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-800">Edit Product</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Product Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={image.url} 
                    alt={`Preview ${index}`}
                    className={`h-32 w-full object-cover rounded border-2 ${mainImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              <div 
                className="border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer h-32"
                onClick={() => document.getElementById('image-upload').click()}
              >
                <FiUpload className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">Upload Image</span>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fixed Price</label>
              <input
                type="number"
                name="fixedPrice"
                value={formData.fixedPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center"
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;