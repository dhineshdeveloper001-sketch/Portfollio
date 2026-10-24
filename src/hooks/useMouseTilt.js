import { useState, useCallback, useRef } from 'react';
import { useDeviceCapability } from './useDeviceCapability';

/**
 * Lightweight GPU-accelerated mouse tilt hook (no 3D library)
 * Calculates rotateX and rotateY based on mouse position relative to target element.
 * 
 * @param {Object} options Configuration options
 * @param {number} options.maxTilt Maximum tilt angle in degrees (default: 7)
 * @returns {Object} { tiltStyle, handleMouseMove, handleMouseLeave }
 */
export function useMouseTilt({ maxTilt = 7 } = {}) {
  const { isLowPower } = useDeviceCapability();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (isLowPower) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setTilt({
        rotateX: -y * maxTilt * 2,
        rotateY: x * maxTilt * 2
      });
    });
  }, [isLowPower, maxTilt]);

  const handleMouseLeave = useCallback(() => {
    if (isLowPower) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      setTilt({ rotateX: 0, rotateY: 0 });
    });
  }, [isLowPower]);

  const tiltStyle = isLowPower
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      };

  return {
    tiltStyle,
    handleMouseMove,
    handleMouseLeave
  };
}

export default useMouseTilt;
