import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="hidden md:block text-black p-4 shadow-md">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        {/* Left side - Brand Name */}
        <div className="text-2xl font-bold italic text-emerald-700">
            <Link to="/">UnickDhokraWorkshop</Link>
        </div>
        
        <div className="flex items-center space-x-6">
        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-8 font-semibold italic">
          <Link to="/" className="hover:text-emerald-800 transition duration-300">
            Home
          </Link>
          <Link to="#" className="hover:text-emerald-800 transition duration-300">
            About
          </Link>
          <Link to="#" className="hover:text-emerald-800 transition duration-300">
            Contact
          </Link>
        </nav>
        {/* Right side - Phone Number (visible on all screens) */}
        <div className="flex items-center bg-emerald-700 px-4 py-2.5 rounded text-white hover:bg-emerald-800 transition duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium">+91 1234567890</span>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;