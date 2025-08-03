import { useState, useEffect } from 'react';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const videos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/_632OynSdmo",
      thumbnail: "https://img.youtube.com/vi/_632OynSdmo/hqdefault.jpg",
      title: "Dhokra Metal Casting Process"
    },
    {
      id: 2, 
      url: "https://www.youtube.com/embed/ZtMUXGd5IrI",
      thumbnail: "https://img.youtube.com/vi/ZtMUXGd5IrI/hqdefault.jpg",
      title: "Artisan Creating Traditional Design"
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/_632OynSdmo",
      thumbnail: "https://img.youtube.com/vi/_632OynSdmo/hqdefault.jpg",
      title: "Lost-Wax Technique Demonstration"
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/_632OynSdmo",
      thumbnail: "https://img.youtube.com/vi/_632OynSdmo/hqdefault.jpg",
      title: "Finishing the Bronze Artwork"
    },
    {
      id: 5,
      url: "https://www.youtube.com/embed/_632OynSdmo",
      thumbnail: "https://img.youtube.com/vi/_632OynSdmo/hqdefault.jpg",
      title: "Traditional Bengali Metal Craft"
    },
  ];

  const handleVideoClick = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
    setActiveVideo(videos[index].url);
  };

  const navigate = (direction) => {
    setIsLoading(true);
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + videos.length) % videos.length
      : (currentIndex + 1) % videos.length;
    setCurrentIndex(newIndex);
    setActiveVideo(videos[newIndex].url);
  };

  useEffect(() => {
    if (activeVideo) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activeVideo]);

  return (
    <div className="w-full py-8 min-h-full">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">Dhokra Video Gallery</h1>
        <p className="text-amber-600">Traditional Bengali metal casting techniques</p>
      </header>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleVideoClick(index)}
          >
            <div className="aspect-w-16 aspect-h-9 bg-amber-100">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <FaPlay className="text-white text-3xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white text-2xl z-50 hover:text-amber-400 transition-colors"
            onClick={() => setActiveVideo(null)}
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
            <div className="h-[80vh] bg-black rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-white">Loading...</div>
                </div>
              ) : (
                <iframe
                  src={`${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={videos[currentIndex].title}
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