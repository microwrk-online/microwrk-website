import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-QT9PZ7HNHY', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}

export default usePageTracking;
