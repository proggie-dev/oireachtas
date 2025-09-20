import { useEffect, useState } from 'react';
import './../styles/App.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const shouldShow = window.scrollY > window.innerHeight / 2;
    setIsVisible(shouldShow);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollToTop();
        }}
        className='scroll-button'
        aria-label='Scroll to top'
      >
        ^
      </button>
    )
  );
};

export default ScrollToTopButton;
