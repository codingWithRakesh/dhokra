// src/App.jsx
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";

function whatsapp() {
  const [whatsappLink, setWhatsappLink] = useState("#");

  useEffect(() => {
    const phoneNumber = "916294178990"; // ✅ Replace with your WhatsApp number
    const message = "Hi! I want to buy this. Here is the page I was on: \n";
    const pageUrl = window.location.href;

    const encodedMessage = encodeURIComponent(`${message}${pageUrl}`);
    const fullLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setWhatsappLink(fullLink);
  }, []);

  return (
    <div className="flex justify-start items-center p-0">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-3 px-6 flex justify-center items-center rounded-lg shadow-lg transition duration-300"
      >
        <FaWhatsapp className="inline-block mr-2 h-6 w-auto" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export default whatsapp;
