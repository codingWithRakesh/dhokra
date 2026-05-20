import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { navItems } from "../store/store";
import logo from "../assets/logo/logo.webp"
import { ChevronRight } from 'lucide-react';

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
    <nav className="bg-brand-green sticky top-0 text-white shadow-md z-50 border-b border-brand-gold/10">
      <div className="container max-w-8xl mx-auto px-4 md:px-6">
        {/* Desktop Navbar */}
        <div className="hidden lg:flex justify-center items-center py-4">
          <ul className="flex space-x-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-brand-gold text-brand-green-dark shadow-sm scale-105"
                        : "hover:bg-white/10 hover:text-brand-gold-light"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="p-0">
        {/* Mobile Navbar Header */}
        <div className="lg:hidden flex justify-between items-center py-2.5 px-4 bg-white border-b border-stone-100 shadow-sm w-full">
          <Link to="/">
            <div className="text-xl font-bold flex items-center">
              <img src={logo} alt="logo" className="h-10 w-auto" />
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="text-brand-green focus:outline-none p-1.5 rounded-lg hover:bg-stone-50 transition-colors"
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
          <div className="lg:hidden bg-brand-green-dark/95 backdrop-blur-lg border-t border-brand-gold/15 p-5 shadow-2xl animate-fadeIn">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3.5 px-5 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-brand-gold text-brand-green-dark shadow-md border border-brand-gold/20"
                          : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-brand-green-dark translate-x-0.5" : "text-brand-gold/40"}`} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;