import { useState, useEffect } from 'react';

const sampleImages = [
  { id: 1, src: 'https://utkalikaodisha.com/wp-content/uploads/2024/07/11.jpg' },
  { id: 2, src: 'https://i.pinimg.com/474x/95/cf/d2/95cfd277c9cbd3a21b42be7b70a43960.jpg' },
  { id: 3, src: 'https://www.shopkhoj.com/wp-content/uploads/2019/01/dokra-t.jpg' },
  { id: 4, src: 'https://www.sowpeace.in/cdn/shop/files/dhokra-peacock-artisan-brass-tabletop-elegancedhokrasowpeacedok-dpek-br-tt-353618.jpg?v=1741833133' },
  { id: 5, src: 'https://trovecraftindia.com/cdn/shop/files/Set_of_5_dhokra.jpg?v=1743060398' },
  { id: 6, src: 'https://m.media-amazon.com/images/I/61jq4Vl12PL.jpg' },
  { id: 7, src: 'https://www.memeraki.com/cdn/shop/files/Man-with-a-bowl-Dhokra-by-Kunal-Rana-1_800x.png?v=1726052531' },
  { id: 8, src: 'https://utkalikaodisha.com/wp-content/uploads/2024/07/2.jpg' },
  { id: 9, src: 'https://okhai.org/cdn/shop/products/BH01T1.jpg?v=1735218847' },
  { id: 10, src: 'https://shop.gaatha.com/image/catalog/Baldev-(-MPT-)/02_08_2023/Dhokra-Art-%E2%9C%BA-Handmade-Brass-Dhokra-Hiran-Deer-Set-of-Two.jpg' },
  // Add up to 15 images
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Generate random dimensions for first 15 images
    const imagesWithRandomSizes = sampleImages.slice(0, 15).map(img => ({
      ...img,
      height: Math.floor(Math.random() * 300) + 200, // Random height between 200-500px
    }));
    setImages(imagesWithRandomSizes);
  }, []);

  const openLightbox = (img) => {
    setSelectedImage(img);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-full p-4 py-4 md:px-8 xl:px-0">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Image Gallery</h1>
        <p className="text-gray-600 mb-8">A collection of images with random dimensions</p>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt || ""}
              className="w-full h-auto mb-4 rounded-lg break-inside-avoid cursor-pointer hover:brightness-95 transition-all"
              onClick={() => openLightbox(img)}
              loading="lazy"
            />
          ))}
        </div>

        {/* Lightbox - simplified */}
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
              src={selectedImage.src}
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