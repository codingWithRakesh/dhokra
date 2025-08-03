import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallaryStore from "../store/gallaryStore.js";

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { allGalleryImages, setAllGalleryImages, isLoading, error, message } = gallaryStore();

  useEffect(() => {
    // Fetch all gallery images when component mounts
    setAllGalleryImages();
  }, []);

  const openLightbox = (index) => {
    if (allGalleryImages[index]) {
      setCurrentIndex(index);
    }
  };

  const closeLightbox = () => {
    setCurrentIndex(-1);
  };

  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev <= 0 ? allGalleryImages.length - 1 : prev - 1));
    } else {
      setCurrentIndex(prev => (prev >= allGalleryImages.length - 1 ? 0 : prev + 1));
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex >= 0) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          navigate('prev');
        } else if (e.key === 'ArrowRight') {
          navigate('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const displayImages = Array.isArray(allGalleryImages) ? allGalleryImages : [];

  return (
    <div className="min-h-full py-2 md:px-8 xl:px-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Image Gallery</h1>
        <p className="text-gray-600 mb-8">A collection of images from our gallery</p>

        {isLoading && <p className="text-center py-8 font-semibold italic">Loading images...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}

        {/* Masonry grid */}
        {displayImages.length > 0 ? (
          <div className="columns-2 md:columns-2 xl:columns-3 gap-4 space-y-4">
            {displayImages.map((img, index) => (
              <img
                key={img._id || index}
                src={img.image}
                alt="Gallery item"
                className="w-full h-auto mb-4 rounded-lg break-inside-avoid cursor-pointer hover:brightness-95 transition-all"
                onClick={() => openLightbox(index)}
                loading="lazy"
                style={{
                  height: `${Math.floor(Math.random() * 300) + 200}px`,
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
        ) : (
          !isLoading && <p className="text-center py-8">No images found in the gallery.</p>
        )}

        {/* Lightbox */}
        {currentIndex >= 0 && displayImages[currentIndex] && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('prev');
              }}
              className="absolute left-4 md:left-8 lg:left-16 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="relative max-h-[90vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={displayImages[currentIndex].image}
                alt=""
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                {currentIndex + 1} / {displayImages.length}
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate('next');
              }}
              className="absolute right-4 md:right-8 lg:right-16 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;