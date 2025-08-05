import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { navItems } from "../store/store";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-emerald-800 sticky top-0 text-white shadow-lg font-sans font-medium z-50">
      <div className="container max-w-max mx-auto flex justify-between items-center">
        {/* Desktop Navbar */}
        <div className="hidden xl:flex justify-between items-center py-4 lg:px-0">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`py-3.5 px-1 border-b-4 transition duration-300 ${
                    location.pathname === item.path
                      ? "border-amber-300 text-amber-300 font-medium"
                      : "border-transparent hover:border-amber-200 hover:text-amber-200"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-0">
        {/* Mobile Navbar Header */}
        <div className="xl:hidden flex justify-between items-center py-4 px-4 bg-emerald-800 w-full">
          <Link to="/">
            <div className="text-xl font-bold italic text-white">
              <span className="text-amber-200">Unique Dokra</span>{" "}
              <span className="text-amber-200">Workshop</span>
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-emerald-800 p-4 animate-fadeIn">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 ${
                      location.pathname === item.path
                        ? "bg-emerald-700 text-amber-100 font-medium rounded"
                        : "hover:bg-emerald-700 hover:text-amber-100 rounded transition duration-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;