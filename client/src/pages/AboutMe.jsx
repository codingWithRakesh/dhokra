import { FaAward, FaUsers, FaGlobeAsia } from "react-icons/fa";
import Video from "../components/Video";
import SocialCommunity from "../components/Social";
import { useVideo } from "../contexts/videoContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHandsHelping, FaRecycle, FaGifts } from "react-icons/fa";
import { GiWaxTablet } from "react-icons/gi";
import { RiAncientGateLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function AboutMe() {
  const [videoControl, setVideoControl] = useVideo();
  
  useEffect(() => {
    // Always scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (videoControl) {
      // When videoControl becomes true, scroll to video section
      setTimeout(() => {
        const videoSection = document.getElementById('vdo');
        if (videoSection) {
          videoSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [videoControl]);

  return (
    <div className="max-w-6xl mx-auto">
      
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
          Authentic Dokra Art – 4,000 Years of Tradition in Every Piece
        </h1>
        <div className="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
        <p className="text-xl text-emerald-700 max-w-4xl mx-auto">
          Welcome to <span className="font-semibold">Unique Dokra Workshop</span>, the home of
          authentic Dokra Art, one of India’s oldest and most celebrated handicrafts. Each piece
          is handmade using the ancient <span className="font-semibold">Lost-Wax Casting</span> technique,
          carrying forward 4,000 years of tradition and craftsmanship.
        </p>
      </motion.div>

      {/* Why Choose Dokra */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow-md p-8 mb-12"
      >
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 flex items-center">
          <RiAncientGateLine className="mr-3 text-emerald-600" /> Why Choose Dokra Art?
        </h2>
        <p className="text-gray-700 text-lg">
          Tracing its roots back to the Indus Valley Civilization, Dokra art is a legacy of{" "}
          <span className="font-semibold">4,000 years</span>. The famous “Dancing Girl” statue was
          created using the same technique still practiced today. Each piece reflects{" "}
          tribal traditions, folk stories, and cultural beliefs – giving it soul and meaning.
        </p>
      </motion.div>

      {/* Lost-Wax Process */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-emerald-800 text-white rounded-xl p-8 mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <GiWaxTablet className="mr-3 text-emerald-200" /> How Dokra Art is Made
        </h2>
        <p className="mb-6">
          The true beauty of Dokra lies in its <span className="font-semibold">Lost-Wax Casting</span>{" "}
          process. Every piece is 100% handmade through these intricate steps:
        </p>
        <ul className="space-y-3">
          <li>① Creating the wax model with beeswax</li>
          <li>② Applying fine clay mould layers</li>
          <li>③ Heating to melt & drain wax</li>
          <li>④ Pouring molten brass into the mould</li>
          <li>⑤ Breaking the mould & polishing the brass figure</li>
        </ul>
        <p className="mt-4 text-emerald-200">
          👉 Every Dokra artifact is unique and one-of-a-kind.
        </p>
      </motion.div>

      {/* Collection */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 mb-12"
      >
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-3">Dokra Idols & Figurines</h3>
          <p className="text-gray-700">
            Handcrafted idols of deities, tribal couples & animal figurines that add tradition to your décor.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-3">Dokra Home Décor</h3>
          <p className="text-gray-700">
            Elegant candle stands, wall décor, vases, and centerpieces – sustainable and timeless.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-3">Dokra Jewelry & Accessories</h3>
          <p className="text-gray-700">
            Unique necklaces, earrings, and bangles – a perfect blend of heritage & fashion.
          </p>
        </div>
      </motion.div>

      {/* Why Buy From Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow-md p-8 mb-12"
      >
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">Why Buy from Unique Dokra Workshop?</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          <li className="flex items-center">
            <FaCheckCircle className="text-emerald-600 mr-2" /> 100% Authentic Handmade Dokra Art
          </li>
          <li className="flex items-center">
            <FaHandsHelping className="text-emerald-600 mr-2" /> Fair Trade – Direct from Artisans
          </li>
          <li className="flex items-center">
            <FaRecycle className="text-emerald-600 mr-2" /> Eco-Friendly & Sustainable Craft
          </li>
          <li className="flex items-center">
            <FaGifts className="text-emerald-600 mr-2" /> Perfect for Home Décor, Gifting & Collectors
          </li>
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-emerald-800 mb-4">Own a Piece of History Today</h2>
        <p className="text-lg text-emerald-700 max-w-3xl mx-auto mb-6">
          Every Dokra artifact tells a story of tradition and culture. By choosing our collection,
          you’re supporting Indian artisans and preserving a 4,000-year-old heritage.
        </p>
        
        <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-emerald-800 transition">
          <Link to="/product/trending">Shop Now</Link>
        </button>
      </motion.div>
    


        <section id="vdo">
            <Video />
        </section>

        <section>
            <SocialCommunity />
        </section>
      </div>
    </div>
  );
}