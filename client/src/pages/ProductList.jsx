import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiEye } from "react-icons/fi";
import productStore from "../store/productStore.js";
import trendingStore from "../store/trendingStore.js";
import availableCollectionStore from "../store/availableCollectionStore.js";
import ProductGridSkeleton from "../components/ProductSkeleton.jsx";

const ProductList = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(category || "all");
  const [priceFilter, setPriceFilter] = useState("all");
  const productsPerPage = 12;

  // Stores
  const { allTrending, setAllTrending, isLoading: isTrendingLoading } = trendingStore();
  const { allAvailableCollection, setAllAvailableCollection, isLoading: isCollectionLoading } =
    availableCollectionStore();
  const {
    availableProductByCategory,
    setAvailableProductByCategory,
    message,
    error,
    isLoading,
  } = productStore();

  const truncateTitle = (title, maxLength = 50) =>
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

  // Fetch products based on category
  useEffect(() => {
    if (category === "trending") {
      setAllTrending();
      setActiveTab("trending");
    } else if (category === "available-collection") {
      setAllAvailableCollection();
      setActiveTab("available-collection");
    } else if (category) {
      setAvailableProductByCategory(category);
      setActiveTab(category);
    } else {
      setActiveTab("all");
    }
  }, [category, setAvailableProductByCategory, setAllTrending, setAllAvailableCollection]);

  // Update displayed products
  useEffect(() => {
    if (activeTab === "trending") {
      setDisplayedProducts(allTrending.map((item) => item.product || item));
    } else if (activeTab === "available-collection") {
      setDisplayedProducts(allAvailableCollection.map((item) => item.product || item));
    } else if (category) {
      setDisplayedProducts(availableProductByCategory);
    } else {
      setDisplayedProducts([]);
    }
  }, [activeTab, allTrending, allAvailableCollection, availableProductByCategory, category]);

  // Calculate discount percentage
  const calculateDiscount = (original, discounted) =>
    Math.round(((original - discounted) / original) * 100);

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Scroll to top on category change
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [category]);

  // 🔎 Apply price filter
  const filterByPrice = (products) => {
    switch (priceFilter) {
      case "below-5000":
        return products.filter((p) => (p.priceDiscount || p.priceFixed) < 5000);
      case "5000-10000":
        return products.filter((p) => {
          const price = p.priceDiscount || p.priceFixed;
          return price >= 5000 && price <= 10000;
        });
      case "10000-50000":
        return products.filter((p) => {
          const price = p.priceDiscount || p.priceFixed;
          return price >= 10000 && price <= 50000;
        });
      case "50000+":
        return products.filter((p) => (p.priceDiscount || p.priceFixed) > 50000);
      default:
        return products;
    }
  };

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

  // Pagination logic (✅ now paginates filtered products)
  const filteredProducts = filterByPrice(displayedProducts);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const isLoadingState = isLoading || isTrendingLoading || isCollectionLoading;

  // Loading
  if (isLoadingState) {
    return (
      <div className="min-h-full py-8 px-4 lg:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-stone-200 shimmer-gradient mx-auto rounded-md mb-3" />
            <div className="h-5 w-96 bg-stone-200 shimmer-gradient mx-auto rounded-md" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-full py-8 px-4 lg:px-0">
        <div className="max-w-7xl mx-auto">
          {/* Elegant error notification */}
          <div className="mb-10 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-amber-900">Temporary Connection Issue</h3>
                <p className="text-amber-700 mt-1 text-sm font-medium">
                  We are experiencing a temporary network issue. Showing product placeholders below. Please verify your connection or try again later.
                </p>
                <div className="mt-3">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-brand-green hover:bg-brand-green-light transition-all"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-60">
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full py-8 px-4 lg:px-0 bg-brand-warm-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-1">
            Browse Our Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-green-dark font-serif">
            {activeTab === "trending"
              ? "Gift Items"
              : activeTab === "available-collection"
              ? "Available Collection"
              : category
              ? toTitleCase(category.replace(/-/g, " ") + " Products")
              : "Our Products"}
          </h1>
          {message && <p className="text-brand-green-light font-semibold mt-2">{message}</p>}
        </div>

        {/* Price Filter UI */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { key: "all", label: "All" },
            { key: "below-5000", label: "Below ₹5000" },
            { key: "5000-10000", label: "₹5000 – ₹10000" },
            { key: "10000-50000", label: "₹10000 – ₹50000" },
            { key: "50000+", label: "Above ₹50000" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setPriceFilter(key);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border ${
                priceFilter === key 
                  ? "bg-brand-green text-white border-brand-green shadow-sm scale-105" 
                  : "bg-white text-stone-600 border-stone-200 hover:border-brand-gold hover:text-brand-green"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full premium-hover-card"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-stone-50/50 p-4 flex items-center justify-center">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain justify-center transition-transform duration-500 group-hover:scale-105 rounded-xl"
                    />

                    {/* Discount Badge */}
                    {product.priceDiscount && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                        {calculateDiscount(product.priceFixed, product.priceDiscount)}% OFF
                      </span>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-brand-green-dark/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(product._id);
                        }}
                        className={`p-3 rounded-full shadow-md transition-all duration-300 ${
                          favorites.includes(product._id)
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-white text-stone-700 hover:bg-stone-50 hover:scale-105"
                        }`}
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/product/${product.category}/${product._id}`}
                        className="p-3 rounded-full bg-white shadow-md text-stone-700 hover:bg-stone-50 hover:scale-105 transition-all duration-300"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-2 block">
                      {product.category?.replace(/-/g, " ")}
                    </span>
                    
                    <h3 className="text-base md:text-lg font-bold text-brand-green-dark mb-1 line-clamp-2 h-12 md:h-14 font-serif-premium">
                      {truncateTitle(product.name)}
                    </h3>

                    {/* Price & Specs row */}
                    <div className="mt-auto pt-3 border-t border-stone-50 flex flex-col">
                      <div className="flex items-baseline">
                        {product.priceDiscount ? (
                          <div className="flex items-baseline">
                            <p className="text-xl font-extrabold text-brand-green">
                              ₹{product.priceDiscount.toFixed(2)}
                            </p>
                            <p className="ml-2 text-xs font-semibold text-stone-400 line-through">
                              ₹{product.priceFixed.toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl font-extrabold text-brand-green">
                            ₹{product.priceFixed.toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* View Product Button */}
                      <Link
                        to={`/product/${product.category}/${product._id}`}
                        className="mt-4 block w-full text-center bg-brand-green hover:bg-brand-green-light text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full border border-stone-200 text-brand-green hover:border-brand-gold bg-white hover:bg-stone-50 font-semibold text-xs md:text-sm transition-all disabled:opacity-40 shadow-sm"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border font-semibold text-xs md:text-sm transition-all ${
                        currentPage === i + 1
                          ? "bg-brand-green border-brand-green text-white shadow-sm"
                          : "bg-white border-stone-200 hover:border-brand-gold text-brand-green hover:bg-stone-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full border border-stone-200 text-brand-green hover:border-brand-gold bg-white hover:bg-stone-50 font-semibold text-xs md:text-sm transition-all disabled:opacity-40 shadow-sm"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <p className="text-stone-400 font-medium italic">
              No products available in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
