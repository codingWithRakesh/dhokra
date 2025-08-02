import React, { useState, useRef, useCallback, useEffect } from 'react';
import fixImageStore from "../store/fiximageStore.js";

const ImageUploader = ({ onImageSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Get all state and actions from the store
  const {
    addInFixImage,
    deleteFixImage,
    allFixImages,
    setAllFixImages,
    setDisplayImage,
    currentImage,
    setCurrentImage,
    isLoading,
    error,
    message
  } = fixImageStore();

  // Load images on component mount
  useEffect(() => {
    setAllFixImages();
    setCurrentImage();
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback(async (files) => {
    const validFiles = Array.from(files).filter(file => file.type.match('image.*'));
    if (validFiles.length === 0) return;

    try {
      // For each file, upload to the server
      for (const file of validFiles) {
        const formData = new FormData();
        formData.append('image', file);
        await addInFixImage(formData);
      }

      // Refresh the images list after upload
      await setAllFixImages();
      await setCurrentImage();
    } catch (err) {
      console.error("Error uploading images:", err);
    }
  }, [addInFixImage, setAllFixImages, setCurrentImage]);

  // File input change handler
  const handleFileInputChange = (e) => {
    handleImageUpload(e.target.files);
    e.target.value = '';
  };

  // Delete image
  const handleDeleteImage = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteFixImage(id);
      await setAllFixImages();
      await setCurrentImage();
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // Select an image to display
  const handleSelectImage = async (image) => {
    try {
      await setDisplayImage(image._id);
      await setCurrentImage();
      if (onImageSelect) {
        onImageSelect(image);
      }
    } catch (err) {
      console.error("Error setting display image:", err);
    }
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

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Loading and Error States */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">Uploading images...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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
      {currentImage && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Currently Displayed on Home Page</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
              <img
                src={currentImage.image}
                alt="Currently displayed"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900">Display Image</h4>
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
            Your Uploaded Images ({allFixImages.length})
          </h3>
          {allFixImages.length > 0 && (
            <button
              onClick={triggerFileInput}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add More Images
            </button>
          )}
        </div>

        {allFixImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allFixImages.map(image => (
              <div
                key={image._id}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all ${currentImage?._id === image._id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.image}
                    alt="Gallery item"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleSelectImage(image)}
                  />
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteImage(image._id, e)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Selected indicator */}
                {currentImage?._id === image._id && (
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