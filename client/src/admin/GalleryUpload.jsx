import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiTrash2, FiX, FiImage, FiLoader } from 'react-icons/fi';
import gallaryStore from "../store/gallaryStore.js";

const GalleryUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadingIds, setUploadingIds] = useState([]);
  const [localMessage, setLocalMessage] = useState(null);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);
  const { 
    addImageToGallery, 
    allGalleryImages, 
    setAllGalleryImages, 
    deleteImageFromGallery,
    isLoading,
    error: storeError,
    message: storeMessage,
  } = gallaryStore();

  // Load existing gallery images on component mount
  useEffect(() => {
    setAllGalleryImages();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalMessage(null);
      setLocalError(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [localMessage, localError]);

  // Handle store messages and errors
  useEffect(() => {
    if (storeMessage) {
      setLocalMessage(storeMessage);
    }
    if (storeError) {
      setLocalError(storeError);
    }
  }, [storeMessage, storeError]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newImages = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      name: file.name.replace(/ChatGPT Image|\.\.\./g, '').trim(), // Remove unwanted text from filename
      size: file.size,
      isUploading: true
    }));
    
    setUploadedFiles(prev => [...prev, ...newImages]);
    setPreviewImages(prev => [...prev, ...newImages]);
    setUploadingIds(prev => [...prev, ...newImages.map(img => img.id)]);
    
    // Upload each image to the server
    const uploadPromises = newImages.map(async (img) => {
      const formData = new FormData();
      formData.append('image', img.file);
      try {
        await addImageToGallery(formData);
        setLocalMessage("Image added to gallery successfully");
      } catch (err) {
        setLocalError(err.message);
      } finally {
        setUploadingIds(prev => prev.filter(id => id !== img.id));
        setPreviewImages(prev => prev.map(item => 
          item.id === img.id ? {...item, isUploading: false} : item
        ));
      }
    });

    await Promise.all(uploadPromises);
    
    // Refresh gallery images after upload
    await setAllGalleryImages();
    
    // Reset file input
    e.target.value = '';
  };

  const handleDeleteImage = async (id) => {
    // Find the image in the preview images
    const imageToDelete = previewImages.find(img => img.id === id);
    
    if (imageToDelete) {
      // If it's a newly uploaded image (not yet saved to server)
      setUploadedFiles(prev => prev.filter(img => img.id !== id));
      setPreviewImages(prev => prev.filter(img => img.id !== id));
    } else {
      // If it's an existing image from the server
      try {
        await deleteImageFromGallery(id);
        setLocalMessage("Image deleted from gallery successfully");
        await setAllGalleryImages();
      } catch (err) {
        setLocalError(err.message);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Combine newly uploaded images with existing gallery images for display
  const displayImages = [
    ...previewImages,
    ...allGalleryImages.filter(galleryImg => 
      !previewImages.some(img => img.id === galleryImg._id))
  ];

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image Gallery Upload</h1>
        
        {/* Status messages */}
        {isLoading && !uploadingIds.length && <p className="text-blue-500 mb-4">Loading...</p>}
        {localError && <p className="text-red-500 mb-4">{localError}</p>}
        {localMessage && <p className="text-green-500 mb-4">{localMessage}</p>}
        
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
        {displayImages.length > 0 ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gallery Images ({displayImages.length})</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayImages.map((img) => (
                <div key={img.id || img._id} className="relative group">
                  {img.isUploading ? (
                    <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm">
                      <FiLoader className="animate-spin text-2xl text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 text-center px-2 truncate w-full">
                        {img.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(img.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <>
                      {img.image || img.url ? (
                        <img
                          src={img.image || img.url}
                          alt="Gallery"
                          className="w-full h-40 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                          }}
                        />
                      ) : (
                        <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm">
                          <FiImage className="text-2xl text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500 text-center px-2 truncate w-full">
                            {img.name}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => handleDeleteImage(img.id || img._id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            {previewImages.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setUploadedFiles([]);
                    setPreviewImages([]);
                  }}
                  className="flex items-center font-semibold px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                >
                  <FiX className="mr-2" />
                  Clear New Uploads
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No images in gallery yet. Upload some images to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryUpload;