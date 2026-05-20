import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-green-dark text-white py-12 px-6 border-t border-brand-gold/15">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Works Address */}
          <div>
            <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-5 border-b border-brand-gold/10 pb-2">
              Works Address
            </h3>
            <address className="not-italic text-stone-300 text-sm leading-relaxed space-y-1">
              <p>Vill: Dharmadaspur,</p>
              <p>P.O. : Purandarpur</p>
              <p>P.S./Dist. : Bankura</p>
              <p>PIN: 722155</p>
              <p className="text-brand-gold font-medium">West Bengal, India</p>
            </address>
          </div>

          {/* Showroom Address */}
          <div>
            <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-5 border-b border-brand-gold/10 pb-2">
              Showroom
            </h3>
            <address className="not-italic text-stone-300 text-sm leading-relaxed space-y-1">
              <p>Vill: Dharmadaspur,</p>
              <p>P.O. : Purandarpur</p>
              <p>P.S./Dist. : Bankura</p>
              <p>PIN: 722155</p>
              <p className="text-brand-gold font-medium">West Bengal, India</p>
            </address>
          </div>

          {/* Connect with Us */}
          <div>
            <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-5 border-b border-brand-gold/10 pb-2">
              Connect With Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:animesh.metalart@gmail.com" className="text-stone-300 hover:text-brand-gold transition duration-200 block">
                  <span className="text-brand-gold font-semibold">Email: </span> 
                  animesh.metalart@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918101161016" className="text-stone-300 hover:text-brand-gold transition duration-200 block">
                  <span className="text-brand-gold font-semibold">Call: </span> 
                  +91 81011 61016
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-5 border-b border-brand-gold/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><Link to="/" className="hover:text-brand-gold transition duration-200 block">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition duration-200 block">About</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-brand-gold transition duration-200 block">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-brand-gold transition duration-200 block">Terms & Conditions</Link></li>
              <li><Link to="/refund-and-returns-policy" className="hover:text-brand-gold transition duration-200 block">Refund & Returns</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 border-t border-brand-gold/10 gap-4">
          <p>Copyright © {new Date().getFullYear()} Unique Dokra Workshop. All rights reserved.</p>
          
          <div className="flex gap-4">
            <Link to="/admin" 
              className="text-brand-gold hover:text-white transition-colors duration-200 font-semibold"
            >
              Admin Portal
            </Link>
            <span className="text-stone-600">|</span>
            <a
              href="mailto:sujoycode999@gmail.com"
              className="text-brand-gold hover:text-white transition-colors duration-200 font-semibold"
            >
              Developer Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
