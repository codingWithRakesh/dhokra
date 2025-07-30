import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import dhokraImage from '../assets/catagoryImage/1.jpg';
import dhokraImage2 from '../assets/catagoryImage/2.jpg';
import dhokraImage3 from '../assets/catagoryImage/3.jpg';
import dhokraImage4 from '../assets/catagoryImage/4.jpg';
import dhokraImage5 from '../assets/catagoryImage/5.jpg';
import SideDetails from '../components/SideDetails';
import ExtraProduct from './ExtraProduct';
import { products } from '../store/productsList';
import Whatsapp from '../component/Whatsapp';
import productStore from "../store/productStore.js";
import trendingStore from "../store/trendingStore.js";
import availableCollectionStore from "../store/availableCollectionStore.js";

const ProductDetails = () => {
  // Sample product images (replace with your actual images)
  const productImages = [
    dhokraImage,
    dhokraImage2,
    dhokraImage3,
    dhokraImage4,
    dhokraImage5,
  ];

  const { productById, setProductById, availableProductByCategory, setAvailableProductByCategory, isLoading, error, message } = productStore();
  const { allTrending, setAllTrending, isLoading: isTrendingLoading } = trendingStore();
  const { allAvailableCollection, setAllAvailableCollection,  isLoading: isCollectionLoading } = availableCollectionStore();

  const [mainImage, setMainImage] = useState(productImages[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (img, index) => {
    setMainImage(img);
    setCurrentImageIndex(index);
  };

  const navigateImages = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? productImages.length - 1 : currentImageIndex - 1;
    } else {
      newIndex = currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1;
    }
    setMainImage(productImages[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-2">
      {/* Discount Badge */}
      <div className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded inline-block mb-8">
        23% OFF
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 border-gray-200 pb-8 mb-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails (vertical on desktop) */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {productImages.slice(0, 5).map((img, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(img, index)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 order-1 md:order-2">
            <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden relative">
              <img
                src={mainImage}
                alt="Main product view"
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
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
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Product Title */}
          <h1 className="text-2xl font-bold text-emerald-950 mb-2">
            15inch Bronze Skimmer | Kitchen Tools | Cooking Utensils for Kitchen | Skimmer for Deep Frying and Straining – Home Decor, Kitchen Decoration – Kansa
            here how api name 
          </h1>

          {/* Price */}
          <div className="my-4">
            <span className="text-gray-500 line-through text-lg">¥3,575.00 here show api fix price </span>
            <span className="text-2xl font-bold text-yellow-500 ml-2">¥2,750.00 here show api priceDiscount</span>
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
                <span className="text-gray-800 font-medium">Golden</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Size :
                </span>
                <span className="text-gray-800 font-medium">H-15 * W-8 * L-10 inch</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Material :
                </span>
                <span className="text-gray-800 font-medium">Kansa</span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-500 last:border-0">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Utility :
                </span>
                <span className="text-gray-800 font-medium">Home Decor</span>
              </div>
              <div className="flex items-center py-2">
                <span className="w-32 font-medium text-md text-indigo-600">
                  Weight :
                </span>
                <span className="text-gray-800 font-medium">259 gm</span>
              </div>
            </div>
          </div>
          {/* Product Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-emerald-700 border-b-2 border-indigo-100 pb-2">
              Product Description
            </h2>
            <p className="text-gray-700">
              This 15-inch bronze skimmer is a versatile kitchen tool designed for deep frying and straining. Made from high-quality Kansa, it not only serves practical purposes but also adds a touch of elegance to your kitchen decor. Perfect for home chefs who appreciate both functionality and aesthetics.
            </p>
          </div>
        </div>
      </div>
      {/* <ExtraProduct products={products} /> */}
      <SideDetails />
    </div>
  );
};

export default ProductDetails;