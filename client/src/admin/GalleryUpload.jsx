import { useState, useRef } from 'react';
import { FiUpload, FiTrash2, FiX } from 'react-icons/fi';

const GalleryUpload = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    const newImages = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setPreviewImages(prev => [...prev, ...newImages]);
    
    // Reset file input
    e.target.value = '';
  };

  const handleDeleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setPreviewImages(prev => prev.filter(img => img.id !== id));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image Gallery Upload</h1>
        
        {/* Upload Section */}
        <div className="p-6 mb-8">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Click to upload images</p>
            <p className="text-sm text-gray-500">or drag and drop files here</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              multiple
              accept="image/*"
            />
          </div>
        </div>

        {/* Gallery Preview */}
        {previewImages.length > 0 && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Images ({previewImages.length})</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previewImages.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.url}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg shadow-sm"
                  />
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setImages([]);
                  setPreviewImages([]);
                }}
                className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
              >
                <FiX className="mr-2" />
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryUpload;