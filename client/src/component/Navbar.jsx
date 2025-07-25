import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "GI Bengal Dokra", path: "/gi-bengal-dokra" },
    { name: "Pating Finish on Dokra", path: "/pating-finish-on-dokra" },
    { name: "Wall hanging", path: "/wall-hanging" },
    { name: "Table Top", path: "/table-top" },
    { name: "Home Decore", path: "/home-decore" },
    { name: "Candle Stand", path: "/candle-stand" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-amber-800 sticky top-0 text-white shadow-lg font-sans font-medium">
        <div className="container mx-auto flex justify-between items-center">
            {/* Desktop Navbar */}
            <div className="hidden md:flex justify-between items-center py-4">
                <ul className="flex space-x-6">
                    {navItems.map((item) => (
                    <li key={item.path}>
                        <a
                        href={item.path}
                        className={`py-3.5 px-1 border-b-4 transition duration-300 ${
                            location.pathname === item.path
                            ? "border-amber-300 text-amber-300 font-medium"
                            : "border-transparent hover:border-amber-200 hover:text-amber-200"
                        }`}
                        >
                        {item.name}
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="">
            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-between items-center py-4 px-4 bg-amber-800 w-full">
                <Link to="/">
                    <div className="text-xl font-bold italic text-white">
                        <span className="text-amber-200">Unick Dhokra</span>{" "}
                        <span className="text-white">Workshop</span>
                    </div>
                </Link>

                <button
                    onClick={toggleMenu}
                    className="text-white focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                    // Close icon
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
                    // Hamburger menu icon
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
            <div className="md:hidden h-screen bg-amber-800 p-4">
                <ul className="flex flex-col space-y-2">
                {navItems.map((item) => (
                    <li key={item.path}>
                    <a
                        href={item.path}
                        className={`block py-2 px-4 ${
                        location.pathname === item.path
                            ? "bg-amber-700 text-amber-100 font-medium rounded"
                            : "hover:bg-amber-700 hover:text-amber-100 rounded transition duration-300"
                        }`}
                    >
                        {item.name}
                    </a>
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