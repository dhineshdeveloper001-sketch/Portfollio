import { useEffect } from 'react';

/**
 * Custom hook to listen for specific key press events cleanly.
 * Ignores key events when user is typing inside input or textarea elements.
 * 
 * @param {string | string[]} targetKey Key name or array of key names to listen for (e.g. 'Escape', ['v', 'V'])
 * @param {Function} handler Callback function triggered when target key is pressed
 * @param {Object} options Options object (e.g., eventType: 'keydown')
 */
export function useKeyPress(targetKey, handler, { eventType = 'keydown' } = {}) {
  useEffect(() => {
    if (typeof window === 'undefined' || !handler) return;

    const handleKey = (event) => {
      // Ignore if user is currently typing in an input or textarea
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) || document.activeElement?.isContentEditable;
      
      if (isInput && event.key !== 'Escape') {
        return;
      }

      const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
      if (keys.includes(event.key)) {
        handler(event);
      }
    };

    window.addEventListener(eventType, handleKey);
    return () => window.removeEventListener(eventType, handleKey);
  }, [targetKey, handler, eventType]);
}

export default useKeyPress;
