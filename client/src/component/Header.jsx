import { Link } from "react-router-dom";
import { useVideo } from "../contexts/videoContext";
import logo from "../assets/image/logo.webp"

const Header = () => {
  const [videoControl, setVideoControl] = useVideo();
  return (
    <>
    <header className="hidden lg:block text-black p-4 shadow-md">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left side - Navigation */}
        <nav className="flex items-center space-x-8 font-semibold italic">
          <Link to="/" className="hover:text-emerald-800 transition duration-300">
            Home
          </Link>
          <Link onClick={() => setVideoControl(false)} to="/about" className="hover:text-emerald-800 transition duration-300">
            About
          </Link>
          <Link to="/gallery" className="hover:text-emerald-800 transition duration-300">
            Gallery
          </Link>
          <Link onClick={() => setVideoControl(true)} to="/about" className="hover:text-emerald-800 transition duration-300">
            Videos
          </Link>
          <Link to="/contact" className="hover:text-emerald-800 transition duration-300">
            Contact
          </Link>
        </nav>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold italic text-emerald-700">
          <Link to="/">
            <img src={logo} alt="Unique Dokra Workshop" className="h-20" />
          </Link>
        </div>

        {/* Right side - Phone Number */}
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
          <span className="font-medium">+91 8101616016</span>
        </div>
      </div>
    </header>

    <div className="min-w-full lg:hidden container mx-auto h-14 px-4 bg-emerald-700 text-white flex justify-between items-center">
      <div className="flex items-center space-x-6">
        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="flex items-center space-x-8 font-semibold italic">
          <Link to="/" className="hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link  onClick={() => setVideoControl(false)} to="/about" className="hover:text-yellow-400 transition duration-300">
            About
          </Link>
          <Link to="/gallery" className="hover:text-yellow-400 transition duration-300">
            Gallery
          </Link>
          <Link onClick={() => setVideoControl(true)} to="/about" className="hover:text-yellow-400 transition duration-300">
            Videos
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition duration-300">
            Contact
          </Link>
        </nav>
      </div>
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2.5 rounded text-emerald-800 hover:bg-gray-300 transition duration-300 cursor-pointer">
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
        <span className="font-medium">+91 8101616016</span>
      </div>
    </div>
    </>
  );
};

export default Header;