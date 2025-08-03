import { FaAward, FaUsers, FaGlobeAsia } from "react-icons/fa";
import Video from "../components/Video";
import SideDetails from "../components/SideDetails";
import SocialCommunity from "../components/Social";

export default function AboutMe() {
  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6">
          A Heritage of Exquisite Craftsmanship
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
        <p className="text-xl text-amber-700 max-w-4xl mx-auto">
          Preserving the ancient Dhokra art of Bengal through authenticity, innovation, and empowerment of artisans.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
            Our Legacy
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Established in [Year], [Your Business Name] is a [GI Certified?] manufacturer and exporter of authentic Bengal Dhokra art. 
            We honor the 4,000-year-old lost-wax casting technique, ensuring each piece carries the soul of tribal heritage.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full flex items-center">
             GI Certified
            </span>
            <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full flex items-center">
             100% Handmade
            </span>
          </div>
        </div>

        {/* Mission & Impact */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-amber-800 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaUsers className="mr-3" /> Our Mission
            </h3>
            <p className="mb-4">
              To bridge the gap between artisans and global markets, ensuring fair wages and preserving Dhokra as a living art form.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-amber-200 mr-2">✓</span>
                <span>Revive neglected crafts through design workshops</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-200 mr-2">✓</span>
                <span>Generate sustainable employment for tribal artisans</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
              <FaGlobeAsia className="mr-3" /> Global Reach
            </h3>
            <p className="mb-4 text-gray-700">
              From local fairs to international exhibitions, our art now thrives across continents:
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold">Pragati Maidan, Delhi</h4>
                  <p className="text-sm text-gray-600">Participating since [Year]</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-amber-600 text-2xl mr-3">🌐</div>
                <div>
                  <h4 className="font-semibold">India Expo Mart, Greater Noida</h4>
                  <p className="text-sm text-gray-600">Permanent showroom since 2006</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Crafting the Future</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-amber-700 mb-3">Craft Design Bank & Gallery</h3>
              <p className="text-gray-700">
                Our upcoming facility will showcase the Dhokra process and serve as a hub for:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Buyer-manufacturer interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Artisan training programs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-700 mb-3">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-amber-800">40+</p>
                  <p className="text-sm">Artisans Employed</p>
                </div>
                <div className="bg-amber-100 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-amber-800">30+</p>
                  <p className="text-sm">Countries Reached</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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