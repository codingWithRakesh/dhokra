import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronRight, FaArrowLeft, FaArrowRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import dhokraImage from '../assets/catagoryImage/cat06.png';
import SideDetails from '../components/SideDetails';
import ExtraProduct from './ExtraProduct';
import Whatsapp from '../component/Whatsapp';
import productStore from "../store/productStore.js";
import trendingStore from "../store/trendingStore.js";
import availableCollectionStore from "../store/availableCollectionStore.js";

const ProductDetails = () => {
  const { id, category } = useParams();
  const { productById, setProductById, availableProductByCategory, setAvailableProductByCategory, isLoading, error, message } = productStore();
  const { allTrending, setAllTrending, isLoading: isTrendingLoading } = trendingStore();
  const { allAvailableCollection, setAllAvailableCollection, isLoading: isCollectionLoading } = availableCollectionStore();
  
  const [mainImage, setMainImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomActive, setIsZoomActive] = useState(false);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Mobile zoom states
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(null);
  const [lastTap, setLastTap] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        await setProductById(id);
        await setAvailableProductByCategory(category);
        if (category === 'trending') {
          await setAllTrending();
        } else if (category === 'available-collection') {
          await setAllAvailableCollection();
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (productById) {
      if (productById.priceFixed && productById.priceDiscount) {
        const discount = ((productById.priceFixed - productById.priceDiscount) / productById.priceFixed) * 100;
        setDiscountPercentage(Math.round(discount));
      }

      if (productById.images && productById.images.length > 0) {
        setMainImage(productById.images[0]);
      }
    }
  }, [productById]);

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setCurrentImageIndex(index);
    resetZoom();
  };

  const navigateImages = (direction) => {
    if (!productById?.images || productById.images.length <= 1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? productById.images.length - 1 : currentImageIndex - 1;
    } else {
      newIndex = currentImageIndex === productById.images.length - 1 ? 0 : currentImageIndex + 1;
    }
    setMainImage(productById.images[newIndex]);
    setCurrentImageIndex(newIndex);
    resetZoom();
  };

  // Desktop zoom handlers
  const handleMouseMove = (e) => {
    if (!isZoomActive || !imageContainerRef.current || !imageRef.current) return;

    const container = imageContainerRef.current;
    const img = imageRef.current;
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const x = (e.clientX - containerRect.left) / containerRect.width;
    const y = (e.clientY - containerRect.top) / containerRect.height;

    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    img.style.transform = `scale(${zoomLevel})`;
  };

  const toggleZoom = () => {
    setIsZoomActive(!isZoomActive);
    if (!isZoomActive) {
      setZoomLevel(2);
    } else {
      resetZoom();
    }
  };

  // Mobile double tap zoom
  const handleDoubleTap = (e) => {
    const now = Date.now();
    if (now - lastTap < 300) { // 300ms threshold for double-tap
      toggleZoom();
    }
    setLastTap(now);
  };

  // Mobile pinch zoom handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // For pinch zoom
      setInitialDistance(getDistance(e.touches[0], e.touches[1]));
    } else if (isZoomActive) {
      // For single touch (panning)
      setTouchStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    } else {
      // For double tap detection
      handleDoubleTap(e);
    }
  };

  const handleTouchMove = (e) => {
    if (!isZoomActive || !imageContainerRef.current || !imageRef.current) return;

    if (e.touches.length === 2) {
      // Handle pinch zoom
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      if (initialDistance !== null) {
        const newScale = Math.min(Math.max(1, currentDistance / initialDistance * zoomLevel), 3);
        setZoomLevel(newScale);
        imageRef.current.style.transform = `scale(${newScale})`;
      }
    } else if (touchStart && isZoomActive) {
      // Handle panning
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - touchStart.x;
      const newY = touch.clientY - touchStart.y;
      
      // Calculate boundaries
      const container = imageContainerRef.current;
      const img = imageRef.current;
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      
      const maxX = (imgRect.width * (zoomLevel - 1)) / 2;
      const maxY = (imgRect.height * (zoomLevel - 1)) / 2;
      
      const boundedX = Math.min(Math.max(newX, -maxX), maxX);
      const boundedY = Math.min(Math.max(newY, -maxY), maxY);
      
      setPosition({ x: boundedX, y: boundedY });
      imageRef.current.style.transform = `scale(${zoomLevel}) translate(${boundedX}px, ${boundedY}px)`;
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
    setTouchStart(null);
  };

  const getDistance = (touch1, touch2) => {
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const adjustZoom = (direction) => {
    setZoomLevel(prev => {
      const newLevel = direction === 'in' ? prev + 0.5 : prev - 0.5;
      return Math.max(1, Math.min(newLevel, 3));
    });
  };

  const resetZoom = () => {
    setIsZoomActive(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
      imageRef.current.style.transformOrigin = 'center';
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-2">
      {discountPercentage > 0 && (
        <div className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded inline-block mb-8">
          {discountPercentage}% OFF
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 border-gray-200 pb-8 mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          {productById?.images && productById.images.length > 1 && (
            <div className="flex overflow-x-auto scrollbar-none pb-2 md:pb-0 md:flex-col gap-2 order-2 md:order-1 w-full md:w-auto">
              {productById.images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(img, index)}
                  className={`w-14 h-14 min-w-[3.5rem] md:w-16 md:h-16 border-2 rounded-xl overflow-hidden transition-all ${mainImage === img ? 'border-brand-gold shadow-sm scale-102' : 'border-transparent bg-stone-50/50'}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = dhokraImage;
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image with Zoom */}
          <div className="relative flex-1 order-1 md:order-2">
            <div 
              ref={imageContainerRef}
              className="bg-gray-100 rounded-lg aspect-square overflow-hidden relative cursor-move"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetZoom}
              onClick={toggleZoom}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {mainImage ? (
                <img
                  ref={imageRef}
                  src={mainImage}
                  alt="Main product view"
                  className="w-full h-full object-contain transition-transform duration-300 ease-out touch-none"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: isZoomActive ? 'center' : undefined
                  }}
                  onError={(e) => {
                    e.target.src = dhokraImage;
                  }}
                />
              ) : (
                <img
                  src={dhokraImage}
                  alt="Default product view"
                  className="w-full h-full object-contain touch-none"
                />
              )}

              {/* Zoom Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 bg-white/80 p-1 rounded-full shadow-md">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustZoom('in');
                  }}
                  className="p-1 text-gray-700 hover:text-indigo-600"
                  disabled={zoomLevel >= 3}
                >
                  <FaSearchPlus />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    adjustZoom('out');
                  }}
                  className="p-1 text-gray-700 hover:text-indigo-600"
                  disabled={zoomLevel <= 1}
                >
                  <FaSearchMinus />
                </button>
              </div>

              {/* Navigation Arrows */}
              {productById?.images && productById.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('prev');
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white z-10"
                  >
                    <FaArrowLeft className="text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImages('next');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white z-10"
                  >
                    <FaArrowRight className="text-gray-700" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs text-brand-gold font-bold uppercase tracking-widest block mb-1">
              Handcrafted Product
            </span>
            <h1 className="text-2xl min-[360px]:text-3xl md:text-4xl font-bold text-brand-green-dark mb-3 font-serif leading-tight">
              {productById?.name || "Product Name"}
            </h1>

            <div className="my-6 flex items-baseline gap-3">
              {productById?.priceFixed && productById.priceDiscount && productById.priceFixed > productById.priceDiscount ? (
                <>
                  <span className="text-stone-400 line-through text-lg">
                    ₹{productById.priceFixed.toFixed(2)}
                  </span>
                  <span className="text-3xl font-extrabold text-brand-green">
                    ₹{productById.priceDiscount.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-brand-green">
                  {productById?.priceFixed ? `₹${productById.priceFixed.toFixed(2)}` : "₹0.00"}
                </span>
              )}
            </div>

            <div className="mb-6">
              <Whatsapp />
                        {/* Specifications Cards Grid */}
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-4 text-brand-green border-b border-brand-gold/20 pb-2">
                Product Specifications
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col">
                  <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Colour
                  </span>
                  <span className="text-brand-green font-bold text-xs sm:text-sm">{productById?.color || "N/A"}</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col">
                  <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Size
                  </span>
                  <span className="text-brand-green font-bold text-xs sm:text-sm">{productById?.size || "N/A"}</span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col">
                  <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Material
                  </span>
                  <span className="text-brand-green font-bold text-xs sm:text-sm truncate" title={productById?.material || "N/A"}>
                    {productById?.material || "N/A"}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col">
                  <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Utility
                  </span>
                  <span className="text-brand-green font-bold text-xs sm:text-sm truncate" title={productById?.utility || "N/A"}>
                    {productById?.utility || "N/A"}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col col-span-2">
                  <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Weight
                  </span>
                  <span className="text-brand-green font-bold text-xs sm:text-sm">
                    {productById?.weight
                      ? (() => {
                          const weight = Number(productById.weight);
                          const kg = Math.floor(weight);
                          const gm = Math.round((weight - kg) * 1000);
                          return gm === 0 ? `${kg} gm` : `${kg} kg ${gm} gm`;
                        })()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>  </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4 text-brand-green border-b border-brand-gold/20 pb-2">
              Product Description
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              {productById?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
      <ExtraProduct products={availableProductByCategory} />
      <SideDetails />
    </div>
  );
};

export default ProductDetails;