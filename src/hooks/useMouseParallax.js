import { useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

/**
 * Custom hook for smooth 3D mouse parallax tilt effect
 * Only active on desktop devices with fine pointer controls and without reduced motion preference.
 * 
 * @param {Object} options Configuration options
 * @param {number} options.maxRotateX Maximum rotateX in degrees (default: 8)
 * @param {number} options.maxRotateY Maximum rotateY in degrees (default: 10)
 * @returns {Object} { rotateX, rotateY, handleMouseMove, handleMouseLeave }
 */
export function useMouseParallax({ maxRotateX = 8, maxRotateY = 10 } = {}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = isDesktop && !isReducedMotion;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Smooth spring physics for smooth, non-janky rotation
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    if (!enabled) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Relative coordinates from center (-0.5 to +0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rawRotateX.set(-y * maxRotateX * 2);
    rawRotateY.set(x * maxRotateY * 2);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
    enabled
  };
}

export default useMouseParallax;
