import { useCallback, useEffect, useState } from 'react';

export const useScroll = () => {
  const [scrollButtonClass, setScrollButtonClass] = useState('inactive');
  const scrollWindow = useCallback(() => {
    setScrollButtonClass(window.scrollY >= 200 ? 'active' : 'inactive');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollWindow);
    return () => {
      window.removeEventListener('scroll', scrollWindow);
    };
  }, [scrollWindow]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    scrollButtonClass,
    scrollToTop,
  };
};
