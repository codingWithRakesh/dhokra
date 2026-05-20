import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col h-full premium-hover-card">
      {/* Shimmering Image Area */}
      <div className="relative aspect-square w-full shimmer-gradient bg-stone-200/60 p-4 flex items-center justify-center">
        {/* Placeholder Icon inside */}
        <div className="w-16 h-16 rounded-full bg-stone-300/40 animate-pulse" />
      </div>

      {/* Shimmering Details Area */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        {/* Category Badge Mockup */}
        <div className="h-4 w-1/3 rounded bg-stone-200 shimmer-gradient" />
        
        {/* Title Mockup */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-stone-200 shimmer-gradient" />
          <div className="h-5 w-5/6 rounded bg-stone-200 shimmer-gradient" />
        </div>

        {/* Pricing Mockup */}
        <div className="pt-2 flex items-center space-x-3 mt-auto">
          <div className="h-6 w-1/4 rounded bg-stone-200 shimmer-gradient" />
          <div className="h-4 w-1/6 rounded bg-stone-200 shimmer-gradient" />
        </div>

        {/* Specs Mockup */}
        <div className="pt-2 border-t border-stone-100 space-y-1.5">
          <div className="h-3 w-3/4 rounded bg-stone-100 shimmer-gradient" />
          <div className="h-3 w-1/2 rounded bg-stone-100 shimmer-gradient" />
        </div>

        {/* Button Mockup */}
        <div className="h-10 w-full rounded-xl bg-stone-200 shimmer-gradient mt-4" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
