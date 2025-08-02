import React from 'react';
import img from "../assets/image/Dokra-Banner-3-1.webp";

const IMAGE = {
  src: img,
  alt: "Dokra Art Banner",
};

const FixImg = () => {
  return (
    <div className="relative w-full overflow-hidden rounded shadow-lg group">
      {/* Responsive container with 16:9 aspect ratio */}
      <div className="w-full aspect-w-16 aspect-h-9">
        <img
          src={IMAGE.src}
          alt={IMAGE.alt}
          className="w-full h-full object-cover md:object-contain transition-all duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default FixImg;