import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const MobileFloatingActions = () => {
  const [whatsappLink, setWhatsappLink] = useState("#");

  useEffect(() => {
    const phoneNumber = "918101161016";
    const message = "Hi! I am browsing the Unique Dokra Workshop storefront and would like to inquire about handcrafted metal art. Page details:\n";
    const pageUrl = window.location.href;
    const encodedMessage = encodeURIComponent(`${message}${pageUrl}`);
    const fullLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    setWhatsappLink(fullLink);
  }, []);

  return (
    <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-40 animate-slideUp">
      <div className="glassmorphic bg-brand-green/90 backdrop-blur-xl border border-brand-gold/25 px-3 py-2.5 rounded-2xl shadow-xl flex justify-between items-center gap-2">
        {/* Call Now Action */}
        <a
          href="tel:+918101161016"
          className="flex-1 flex justify-center items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-green-dark text-[11px] min-[360px]:text-xs font-bold py-2 px-3 rounded-xl shadow-md transition-all duration-300 active:scale-95 whitespace-nowrap"
        >
          <FaPhoneAlt className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5" />
          <span>Call Us</span>
        </a>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-white/10" />

        {/* WhatsApp Action */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] min-[360px]:text-xs font-bold py-2 px-3 rounded-xl shadow-md transition-all duration-300 active:scale-95 border border-emerald-500/20 whitespace-nowrap"
        >
          <FaWhatsapp className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
};

export default MobileFloatingActions;
