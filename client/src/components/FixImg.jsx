import React, { useEffect, useState } from 'react';
import fixImageStore from "../store/fiximageStore.js";
import { motion, AnimatePresence } from 'framer-motion'; // Using Framer Motion for animations

const FixImg = () => {
  const { currentImage, setCurrentImage } = fixImageStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the current image when component mounts
  useEffect(() => {
    setCurrentImage();
    // Set a small delay to ensure the component is mounted before animation starts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reset loaded state when image changes for smooth transition
  useEffect(() => {
    if (currentImage) {
      setIsLoaded(false);
      const timer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [currentImage]);

  return (
    <motion.div 
      className="relative w-full overflow-hidden rounded shadow-lg group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0.8,
        scale: isLoaded ? 1 : 0.98
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Responsive container with 16:9 aspect ratio */}
      <div className="w-full aspect-w-16 aspect-h-9">
        {currentImage ? (
          <motion.img
            key={currentImage.image} // Key helps React identify when image changes
            src={currentImage.image}
            alt="Current Display Image"
            className="w-full h-full object-cover md:object-contain transition-all duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <motion.div 
            className="w-full h-full bg-gray-200 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-gray-500"
              initial={{ y: 10 }}
              animate={{ y: isLoaded ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              No display image selected
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FixImg;