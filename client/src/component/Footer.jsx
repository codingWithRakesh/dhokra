import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Works Address */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">WORKS</h3>
            <address className="not-italic">
              Vill: Dharmadaspur,
              P.O. : Purandarpur <br />
              P.S./Dist. : Bankura <br />
              PIN: 722155 <br />
              West Bengal, India
            </address>
          </div>

          {/* Showroom Address */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">SHOW ROOM</h3>
            <address className="not-italic">
              Vill: Dharmadaspur,
              P.O. : Purandarpur <br />
              P.S./Dist. : Bankura <br />
              PIN: 722155 <br />
              West Bengal, India
            </address>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">CONNECT WITH US</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:animesh.metalart@gmail.com" className="hover:text-amber-400 transition">
                  Email: animesh.metalart@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918101616016" className="hover:text-amber-400 transition">
                  Call: +91 81016 16016
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition">About</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-amber-400 transition">Terms & Conditions</Link></li>
              <li><Link to="/refund-and-returns-policy" className="hover:text-amber-400 transition">Refund and Returns Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 p-5 flex flex-col md:flex-row justify-between items-center text-sm border-t border-gray-200">
        <p>Copyright © {new Date().getFullYear()} Unique Dokra Workshop. All rights reserved.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0">
            <div className="flex gap-4">
            <Link to="/admin" 
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >Admin</Link>
            <Link
                to="mailto:sujoycode999@gmail.com"
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >
                Developer Contact
            </Link>
            </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;