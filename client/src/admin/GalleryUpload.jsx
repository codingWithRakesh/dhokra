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
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name.replace(/Dhokra Image|\.\.\./g, '').trim(),
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

        // Remove from preview after successful upload
        setPreviewImages(prev => prev.filter(item => item.id !== img.id));
        setUploadedFiles(prev => prev.filter(item => item.id !== img.id));
      } catch (err) {
        setLocalError(err.message);
        // Mark upload as failed
        setPreviewImages(prev => prev.map(item =>
          item.id === img.id ? { ...item, isUploading: false, uploadError: true } : item
        ));
      } finally {
        setUploadingIds(prev => prev.filter(id => id !== img.id));
      }
    });

    await Promise.all(uploadPromises);
    await setAllGalleryImages();
    e.target.value = '';
  };

  const handleDeleteImage = async (id) => {
    // Check if it's an upload in progress
    if (id.startsWith('upload-')) {
      setPreviewImages(prev => prev.filter(img => img.id !== id));
      setUploadedFiles(prev => prev.filter(img => img.id !== id));
      return;
    }

    // It's an existing gallery image
    try {
      await deleteImageFromGallery(id);
      setLocalMessage("Image deleted from gallery successfully");
      await setAllGalleryImages();
    } catch (err) {
      setLocalError(err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Combine images for display
  const allImages = [
    ...previewImages,
    ...(allGalleryImages || []).filter(galleryImg =>
      !previewImages.some(img => img.id === galleryImg._id))
  ];

  return (
    <div className="min-h-full p-4 md:p-8 xl:p-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Image Gallery Upload</h1>
        <div className="text-xl flex justify-center text-center font-semibold">
          {/* Status messages */}
          {isLoading && !uploadingIds.length && <p className="text-blue-500 mb-4">Loading...</p>}
          {localError && <p className="text-red-500 mb-4">{localError}</p>}
          {localMessage && <p className="text-green-500 mb-4">{localMessage}</p>}
        </div>
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
        {allImages.length > 0 ? (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gallery Images ({allGalleryImages?.length || 0})
              {previewImages.length > 0 && ` (${previewImages.length} uploading)`}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allImages.map((img) => {
                const isUploading = img.isUploading || uploadingIds.includes(img.id);
                const uploadFailed = img.uploadError;

                return (
                  <div key={img.id || img._id} className="relative group">
                    {isUploading ? (
                      <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm relative overflow-hidden">
                        {/* Loading bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                          <div className="h-full bg-blue-500 animate-pulse" style={{ width: '70%' }}></div>
                        </div>

                        <FiLoader className="animate-spin text-2xl text-blue-500 mb-2" />
                        <p className="text-xs font-medium text-gray-700 text-center px-2 truncate w-full">
                          Uploading {img.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(img.size / 1024).toFixed(1)} KB • In progress...
                        </p>
                      </div>
                    ) : uploadFailed ? (
                      <div className="w-full h-40 flex flex-col items-center justify-center bg-red-50 rounded-lg shadow-sm">
                        <FiImage className="text-2xl text-red-400 mb-2" />
                        <p className="text-xs text-red-500 text-center px-2 truncate w-full">
                          Upload failed - {img.name}
                        </p>
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="mt-2 text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
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
                );
              })}
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
                  Clear Uploads
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