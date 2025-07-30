import { useState, useEffect } from 'react';
import gallaryStore from "../store/gallaryStore.js";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { allGalleryImages, setAllGalleryImages, isLoading, error, message } = gallaryStore();

  useEffect(() => {
    // Fetch all gallery images when component mounts
    setAllGalleryImages();
  }, []);

  const openLightbox = (img) => {
    setSelectedImage(img);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Fallback to sample images if API data is empty (for development)
  const displayImages = allGalleryImages.length > 0 
    ? allGalleryImages 
    : [
        { _id: 1, image: 'https://utkalikaodisha.com/wp-content/uploads/2024/07/11.jpg' },
        // ... other sample images (convert to match your API structure)
      ];

  return (
    <div className="min-h-full p-4 py-4 md:px-8 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Image Gallery</h1>
        <p className="text-gray-600 mb-8">A collection of images from our gallery</p>

        {isLoading && <p className="text-center py-8">Loading images...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {message && <p className="text-green-500 text-center py-4">{message}</p>}

        {/* Masonry grid */}
        <div className="columns-2 md:columns-2 xl:columns-3 gap-4 space-y-4">
          {displayImages.map((img) => (
            <img
              key={img._id}
              src={img.image}  // Use img.image instead of img.src
              alt="Gallery item"
              className="w-full h-auto mb-4 rounded-lg break-inside-avoid cursor-pointer hover:brightness-95 transition-all"
              onClick={() => openLightbox(img)}
              loading="lazy"
              style={{
                height: `${Math.floor(Math.random() * 300) + 200}px`,
                objectFit: 'cover'
              }}
            />
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-50"
            >
              &times;
            </button>
            <img
              src={selectedImage.image}  // Use selectedImage.image
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;