import { useState, useEffect } from 'react';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import videoStore from "../store/videoStore.js";

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { allVideos, setAllVideos } = videoStore();

  // Load videos when component mounts
  useEffect(() => {
    setAllVideos();
  }, []);

  const handleVideoClick = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
    setActiveVideo(allVideos[index].video);
  };

  const navigate = (direction) => {
    setIsLoading(true);
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + allVideos.length) % allVideos.length
      : (currentIndex + 1) % allVideos.length;
    setCurrentIndex(newIndex);
    setActiveVideo(allVideos[newIndex].video);
  };

  const closeModal = () => {
    setActiveVideo(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeVideo) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activeVideo]);

  // Generate thumbnail URL (you might want to implement this properly based on your video storage)
  const getThumbnailUrl = (videoUrl) => {
    // This is a placeholder - you should implement proper thumbnail generation
    // For Cloudinary videos, you can typically get thumbnails by modifying the URL
    return videoUrl.replace(/\.(mp4|mov|avi|mkv)$/, '.jpg') || 
           'https://via.placeholder.com/320x180?text=Video+Thumbnail';
  };

  return (
    <div className="w-full py-8 min-h-full">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">Video Gallery</h1>
        <p className="text-amber-600">Browse all uploaded videos</p>
      </header>

      {/* Thumbnail Grid */}
      {allVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allVideos.map((video, index) => (
            <div 
              key={video._id}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleVideoClick(index)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                <video
                  src={video.video}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <FaPlay className="text-white text-3xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm truncate">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No videos uploaded yet</p>
        </div>
      )}

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white text-2xl z-50 hover:text-amber-400 transition-colors"
            onClick={closeModal}
            aria-label="Close video"
          >
            <FaTimes className="text-3xl" />
          </button>
          
          <div className="relative w-full max-w-6xl">
            {/* Navigation Arrows */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-black/50 hover:bg-amber-600 text-white p-3 rounded-full z-50 transition-all"
              onClick={() => navigate('prev')}
              aria-label="Previous video"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
            
            {/* Video Container */}
            <div className="h-[80vh] w-auto rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-white">Loading...</div>
                </div>
              ) : (
                <video
                  src={activeVideo}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              )}
            </div>

            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-black/50 hover:bg-amber-600 text-white p-3 rounded-full z-50 transition-all"
              onClick={() => navigate('next')}
              aria-label="Next video"
            >
              <FaChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}