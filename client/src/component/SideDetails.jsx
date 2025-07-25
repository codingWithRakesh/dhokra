import React from 'react';
import { 
  Gem, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Award, 
  Palette, 
  Wallet,
  Package 
} from 'lucide-react';

const SideDetails = () => {
  const features = [
    {
      icon: <Gem className="w-6 h-6 text-emerald-600" />,
      title: "Authentic",
      description: "100% genuine Bengal Dhokra art, handcrafted by skilled artisans with traditional techniques."
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: "Premium Quality",
      description: "Meticulously crafted with superior materials for durability and timeless appeal."
    },
    {
      icon: <Palette className="w-6 h-6 text-emerald-600" />,
      title: "Customized Production",
      description: "Unique handcrafted designs tailored to your specific requirements."
    },
    {
      icon: <Wallet className="w-6 h-6 text-emerald-600" />,
      title: "Budget Friendly",
      description: "Premium craftsmanship at accessible prices for everyone."
    },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-0">
      {/* Main Header */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900">
          Authentic Dhokra Art
        </h1>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-4 md:px-6 lg:px-0">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-2 bg-emerald-50 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-emerald-800 mb-1.5">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-lg w-full mx-auto lg:w-3/4">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideDetails;