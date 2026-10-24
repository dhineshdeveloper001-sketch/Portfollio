import { useState, useEffect } from 'react';

/**
 * Custom hook to track window media query status (e.g. screen sizes or reduced motion preferences)
 * @param {string} query Media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);

    // Initial check
    setMatches(media.matches);

    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
