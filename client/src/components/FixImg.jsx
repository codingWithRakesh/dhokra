import React, { useEffect } from 'react';
import fixImageStore from "../store/fiximageStore.js";

const FixImg = () => {
  const { currentImage, setCurrentImage } = fixImageStore();

  // Load the current image when component mounts
  useEffect(() => {
    setCurrentImage();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded shadow-lg group">
      {/* Responsive container with 16:9 aspect ratio */}
      <div className="w-full aspect-w-16 aspect-h-9">
        {currentImage ? (
          <img
            src={currentImage.image}
            alt="Current Display Image"
            className="w-full h-full object-cover md:object-contain transition-all duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No display image selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixImg;