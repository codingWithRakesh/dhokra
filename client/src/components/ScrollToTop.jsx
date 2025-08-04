import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Add keyboard event listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isVisible) {
        scrollToTop();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-4 right-4 cursor-pointer lg:bottom-12 lg:right-12
        border-emerald-600 bg-white text-emerald-600
        p-3 rounded-full border-2
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:bg-emerald-600 hover:text-white
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        transform
        z-50
      `}
    >
      <FaArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTop;