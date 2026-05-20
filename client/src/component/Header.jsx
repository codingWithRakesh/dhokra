import { Link } from "react-router-dom";
import { useVideo } from "../contexts/videoContext";
import logo from "../assets/image/logo.webp"
import { FaLocationDot } from "react-icons/fa6";

const Header = () => {
  const [videoControl, setVideoControl] = useVideo();
  return (
    <>
      <header className="hidden lg:block text-black bg-white py-5 border-b border-stone-100">
        <div className="container max-w-7xl mx-auto flex justify-between items-center px-6">
          
          {/* Left side - Navigation */}
          <nav className="flex items-center space-x-8 font-semibold text-brand-green">
            <Link to="/" className="hover:text-brand-gold transition duration-300">
              Home
            </Link>
            <Link onClick={() => setVideoControl(false)} to="/about" className="hover:text-brand-gold transition duration-300">
              About
            </Link>
            <Link to="/gallery" className="hover:text-brand-gold transition duration-300">
              Gallery
            </Link>
            <Link onClick={() => setVideoControl(true)} to="/about" className="hover:text-brand-gold transition duration-300">
              Videos
            </Link>
            <Link to="/contact" className="hover:text-brand-gold transition duration-300">
              Contact
            </Link>
          </nav>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold flex items-center">
            <Link to="/">
              <img src={logo} alt="Unique Dokra Workshop" className="h-16 hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right side - Phone Number */}
          <div className="flex gap-6 justify-center items-center">
            <div className="flex gap-2 justify-center items-center text-stone-500 font-semibold text-sm">
              <FaLocationDot className="text-brand-gold text-lg" />
              <p>Bankura, West Bengal - 722155</p>
            </div>
            <a 
              href="tel:+918101161016"
              className="flex items-center bg-brand-green px-5 py-2.5 rounded-full text-white hover:bg-brand-green-light hover:shadow-md transition duration-300 cursor-pointer shadow-sm text-sm font-semibold border border-brand-gold/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-brand-gold"
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
              <span>+91 8101161016</span>
            </a>
          </div>
        </div>
      </header>

    </>
  );
};

export default Header;
