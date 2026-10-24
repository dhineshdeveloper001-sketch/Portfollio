import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // GPU-accelerated cursor tracking using Framer Motion MotionValues
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for lag-free tracking
  const springConfig = { damping: 22, stiffness: 250, mass: 0.5 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices or reduced-motion preference
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if mouse is hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, .dev-card, .electric-card, .project-card, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Canvas particle trail setup
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const emitParticle = (e) => {
      if (particles.length < 18) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          size: Math.random() * 1.5 + 1.2,
          alpha: 0.85,
          life: 0,
          maxLife: 28,
          isBit: Math.random() > 0.65
        });
      }
    };

    window.addEventListener('mousemove', emitParticle, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        p.alpha = Math.max(0, (1 - progress) * 0.85);

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#ff0a2d';
        ctx.shadowColor = '#ff0a2d';
        ctx.shadowBlur = p.isBit ? 4 : 8;

        if (p.isBit) {
          ctx.fillRect(p.x, p.y, p.size * 1.3, p.size * 1.3);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', emitParticle);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Canvas particle trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        style={{ opacity: 0.85 }}
      />

      {/* Lag-free Soft Ambient Radial Glow overlay */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-40 rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 280 : 180,
          height: isHovered ? 280 : 180,
          background: isHovered
            ? 'radial-gradient(circle, rgba(255, 10, 45, 0.22) 0%, rgba(255, 10, 45, 0.05) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(255, 10, 45, 0.12) 0%, rgba(255, 10, 45, 0.02) 45%, transparent 75%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out, background 0.3s ease-out',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default React.memo(CursorTrail);
