import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaHome, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { GiMetalBar } from "react-icons/gi";
import PropTypes from "prop-types";

const CreativeBreadcrumb = ({ items = [] }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex justify-between items-center" aria-label="Breadcrumb">
      <ol className="flex justify-between items-center space-x-1 md:space-x-2 overflow-x-auto py-1">
        <li className="flex items-center">
          <Link
            to="/"
            className={`flex items-center group transition-all duration-200 ${
              currentPath === "/" ? "font-bold" : ""
            }`}
            aria-current={currentPath === "/" ? "page" : undefined}
          >
            <div className="p-1 md:p-2 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-sm mr-1 md:mr-2">
              <FaHome className="text-white text-sm md:text-lg" />
            </div>
            <span className="font-medium text-white group-hover:text-white/90 text-xs md:text-base">
              Home
            </span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <FaChevronRight className="mx-1 md:mx-2 text-white/60 text-xs md:text-sm" />
              {isLast ? (
                <span
                  className="flex items-center font-semibold text-white text-xs md:text-base"
                  aria-current="page"
                >
                  {item.icon && (
                    <div className="p-1 md:p-2 rounded-full bg-white/20 backdrop-blur-sm mr-1 md:mr-2">
                      <item.icon className="text-white text-sm md:text-lg" />
                    </div>
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center group transition-all duration-200"
                >
                  {item.icon && (
                    <div className="p-1 md:p-2 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-sm mr-1 md:mr-2">
                      <item.icon className="text-white text-sm md:text-lg" />
                    </div>
                  )}
                  <span className="font-medium text-white/90 group-hover:text-white text-xs md:text-base">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

CreativeBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ),
};

const CreativeBreadcrumbPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to generate paths with ID support
  const getPath = (basePath) => {
    return id ? `${basePath}/${id}` : basePath;
  };

  const breadcrumbMap = {
    "/product/gi-bengal-dokra": [
      { label: "GI Bengal Dokra", path: getPath("/product/gi-bengal-dokra") },
    ],
    "/product/gi-bengal-dokra/:id": [
      { label: "GI Bengal Dokra", path: getPath("/product/gi-bengal-dokra") },
    ],
    "/product/patina-finish-on-dokra": [
      { label: "Patina Finish", path: getPath("/product/pating-finish-on-dokra") },
    ],
    "/product/patina-finish-on-dokra/:id": [
      { label: "Patina Finish", path: getPath("/product/pating-finish-on-dokra") },
    ],
    "/product/wall-hanging": [
      { label: "Wall Hanging", path: getPath("/product/wall-hanging") },
    ],
    "/product/wall-hanging/:id": [
      { label: "Wall Hanging", path: getPath("/product/wall-hanging") },
    ],
    "/product/table-top": [
      { label: "Table Top", path: getPath("/product/table-top") },
    ],
    "/product/table-top/:id": [
      { label: "Table Top", path: getPath("/product/table-top") },
    ],
    "/product/home-decore": [
      { label: "Home Decor", path: getPath("/product/home-decore") },
    ],
    "/product/home-decore/:id": [
      { label: "Home Decor", path: getPath("/product/home-decore") },
    ],
    "/product/candle-stands": [
      { label: "Candle Stands", path: getPath("/product/candle-stands") },
    ],
    "/product/candle-stands/:id": [
      { label: "Candle Stands", path: getPath("/product/candle-stands") },
    ],
    "/product/trending": [
      { label: "Trending", path: getPath("/product/trending") },
    ],
    "/product/trending/:id": [
      { label: "Trending", path: getPath("/product/trending") },
    ],
    "/product/available-collection": [
      { label: "Available Collection", path: getPath("/product/available-collection") },
    ],
    "/product/available-collection/:id": [
      { label: "Available Collection", path: getPath("/product/available-collection") },
    ],
  };

  // Find matching path with or without ID
  const currentPath = Object.keys(breadcrumbMap).find(path => {
    const pathRegex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
    return pathRegex.test(location.pathname);
  });

  const currentBreadcrumbs = currentPath ? breadcrumbMap[currentPath] || [] : [];

  return (
    <div className="min-h-full bg-gradient-to-r from-emerald-500 to-teal-600 p-3 md:p-4 shadow-lg">
      <div className="w-full md:max-w-7xl mx-auto flex flex-row sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <div className="w-auto overflow-hidden">
          <CreativeBreadcrumb items={currentBreadcrumbs} />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 md:gap-2 text-xs sm:text-sm text-white font-medium hover:text-yellow-300 transition-colors whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
        >
          <FaArrowLeft className="text-xs md:text-sm" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default CreativeBreadcrumbPage;