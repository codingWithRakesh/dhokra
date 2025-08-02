import React, { useState, useRef, useCallback } from 'react';

const FixImgUpload = ({ onImageSelect }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => file.type.match('image.*'));
    
    if (validFiles.length === 0) return;
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
        }]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
    e.target.value = ''; // Reset input to allow selecting same files again
  };

  const handleDeleteImage = (id, e) => {
    e.stopPropagation();
    setImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(null);
      onImageSelect(null);
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    onImageSelect(image);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
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

  return (
    <div className="p-5 max-w-7xl mx-auto">
      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-gray-600">
            {isDragging ? 'Drop images here' : 'Drag & drop images or click to browse'}
          </p>
          <p className="text-sm text-gray-500">Supports JPG, PNG, GIF (Max 10MB each)</p>
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

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {images.map(image => (
          <div 
            key={image.id} 
            onClick={() => handleSelectImage(image)}
            className={`relative group aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImage?.id === image.id ? 'ring-4 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300'}`}
          >
            <img 
              src={image.url} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <button 
                onClick={(e) => handleDeleteImage(image.id, e)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-all transform translate-y-2 group-hover:translate-y-0"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 aspect-video bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={selectedImage.url} 
                alt="Selected preview" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-2">
              <h3 className="font-medium text-lg truncate">{selectedImage.name}</h3>
              <p className="text-sm text-gray-600">Size: {selectedImage.size}</p>
              <button 
                onClick={() => URL.revokeObjectURL(selectedImage.url)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                Use This Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixImgUpload;