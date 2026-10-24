import { useState, useEffect } from 'react';

/**
 * Custom hook to detect low-performance devices, mobile screens, and reduced motion settings.
 * @returns {Object} { isLowPerformance, isLowPower, isMobile, prefersReducedMotion }
 */
export function useDeviceCapability() {
  const [capability, setCapability] = useState(() => {
    if (typeof window === 'undefined') {
      return { isLowPerformance: false, isLowPower: false, isMobile: false, prefersReducedMotion: false };
    }

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
    const isLowPower = isMobile || prefersReducedMotion || lowCores;

    return { isLowPerformance: isLowPower, isLowPower, isMobile, prefersReducedMotion };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
      const isLowPower = isMobile || prefersReducedMotion || lowCores;

      setCapability({ isLowPerformance: isLowPower, isLowPower, isMobile, prefersReducedMotion });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capability;
}

export default useDeviceCapability;
