import React, { useState, useRef, useCallback } from 'react';

const ImageUploader = ({ onImageSelect, initialSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(initialSelectedImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => file.type.match('image.*'));
    
    if (validFiles.length === 0) return;
    
    const uploadedImages = [];
    
    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + index,
          url: e.target.result,
          file,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
        };
        uploadedImages.push(newImage);
        
        // When all images are processed
        if (uploadedImages.length === validFiles.length) {
          setImages(prev => [...prev, ...uploadedImages]);
          
          // Auto-select first image if nothing selected
          if (!selectedImage) {
            setSelectedImage(uploadedImages[0]);
            onImageSelect(uploadedImages[0]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }, [onImageSelect, selectedImage]);

  // File input change handler
  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
    e.target.value = '';
  };

  // Delete image
  const handleDeleteImage = (id, e) => {
    e.stopPropagation();
    const newImages = images.filter(img => img.id !== id);
    setImages(newImages);
    
    if (selectedImage?.id === id) {
      const newSelected = newImages.length > 0 ? newImages[0] : null;
      setSelectedImage(newSelected);
      onImageSelect(newSelected);
    }
  };

  // Select an image to display
  const handleSelectImage = (image) => {
    setSelectedImage(image);
    onImageSelect(image); // Immediately update the home page image
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Upload Zone */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-gray-700">
            {isDragging ? 'Drop your images here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-500">Upload multiple images (JPG, PNG, GIF)</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Current Home Page Image */}
      {selectedImage && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Currently Displayed on Home Page</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
              <img 
                src={selectedImage.url} 
                alt="Currently displayed" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900">{selectedImage.name}</h4>
              <p className="text-sm text-gray-600 mb-2">Size: {selectedImage.size}</p>
              <p className="text-sm text-gray-500">
                This image is currently visible on your home page. Click any image below to change it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Your Uploaded Images ({images.length})
          </h3>
          {images.length > 0 && (
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add More Images
            </button>
          )}
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map(image => (
              <div 
                key={image.id}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage?.id === image.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleSelectImage(image)}
                  />
                </div>
                
                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteImage(image.id, e)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Selected indicator */}
                {selectedImage?.id === image.id && (
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No images uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;