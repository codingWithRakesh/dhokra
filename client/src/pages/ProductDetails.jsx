import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import dhokraImage from '../assets/catagoryImage/1.jpg';
import SideDetails from '../components/SideDetails';
import ExtraProduct from './ExtraProduct';
import { products } from '../store/productsList';
import Whatsapp from '../component/Whatsapp';
import productStore from "../store/productStore.js";
import trendingStore from "../store/trendingStore.js";
import availableCollectionStore from "../store/availableCollectionStore.js";

const ProductDetails = () => {
  const { id, category } = useParams();
  const { productById, setProductById, availableProductByCategory, setAvailableProductByCategory, isLoading, error, message } = productStore();
  const { allTrending, setAllTrending, isLoading: isTrendingLoading } = trendingStore();
  const { allAvailableCollection, setAllAvailableCollection, isLoading: isCollectionLoading } = availableCollectionStore();
  console.log(category)
  const [mainImage, setMainImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    // Fetch product details by ID
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
      // Calculate discount percentage
      if (productById.priceFixed && productById.priceDiscount) {
        const discount = ((productById.priceFixed - productById.priceDiscount) / productById.priceFixed) * 100;
        setDiscountPercentage(Math.round(discount));
      }

      // Set main image to first image if available
      if (productById.images && productById.images.length > 0) {
        setMainImage(productById.images[0]);
      }
    }
  }, [productById]);

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setCurrentImageIndex(index);
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-2">
      {/* Discount Badge - Only show if there's a discount */}
      {discountPercentage > 0 && (
        <div className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded inline-block mb-8">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 border-gray-200 pb-8 mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails (vertical on desktop) */}
          {productById?.images && productById.images.length > 1 && (
            <div className="flex md:flex-col gap-2 order-2 md:order-1">
              {productById.images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(img, index)}
                  className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = dhokraImage; // Fallback image if the URL is broken
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="relative flex-1 order-1 md:order-2">
            <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden relative">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt="Main product view"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = dhokraImage; // Fallback image if the URL is broken
                  }}
                />
              ) : (
                <img
                  src={dhokraImage}
                  alt="Default product view"
                  className="w-full h-full object-contain"
                />
              )}

              {/* Navigation Arrows - Only show if there are multiple images */}
              {productById?.images && productById.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImages('prev')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <FaArrowLeft className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => navigateImages('next')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                  >
                    <FaArrowRight className="text-gray-700" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Product Title */}
          <h1 className="text-2xl font-bold text-emerald-950 mb-2">
            {productById?.name || "Product Name Here"}
          </h1>

          {/* Price */}
          <div className="my-4">
            {productById?.priceFixed && productById.priceDiscount && productById.priceFixed > productById.priceDiscount ? (
              <>
                <span className="text-gray-500 line-through text-lg">
                  ₹{productById.priceFixed.toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-yellow-500 ml-2">
                  ₹{productById.priceDiscount.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-yellow-500">
                {productById?.priceFixed ? `¥${productById.priceFixed.toFixed(2)}` : "¥0.00"}
              </span>
            )}
          </div>

          {/* Availability */}
          <Whatsapp />

          {/* Product Details */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4 text-emerald-700 border-b-2 border-indigo-100 pb-2">
              Product Specifications
            </h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-300">
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Colour :
                </span>
                <span className="text-gray-800 font-medium">{productById?.color || "N/A"}</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Size :
                </span>
                <span className="text-gray-800 font-medium">{productById?.size || "N/A"}</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Material :
                </span>
                <span className="text-gray-800 font-medium">{productById?.material || "N/A"}</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Utility :
                </span>
                <span className="text-gray-800 font-medium">{productById?.utility || "N/A"}</span>
              </div>
              <div className="flex items-center py-2">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Weight :
                </span>
                <span className="text-gray-800 font-medium">{productById?.weight || "N/A"}</span>
              </div>
            </div>
          </div>
          {/* Product Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-emerald-700 border-b-2 border-indigo-100 pb-2">
              Product Description
            </h2>
            <p className="text-gray-700">
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