import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

export function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isRunning = false;
    let particles: Particle[] = [];
    const colors = ["#FF1E1E", "#FF4D4D", "#DC2626", "#FFA3A3"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const addParticles = (x: number, y: number, count: number = 2) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.4;

        particles.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          size,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 20 + 15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      if (particles.length > 50) {
        particles = particles.slice(particles.length - 50);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length === 0) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.02;

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);
        const currentSize = Math.max(0.2, p.size * (1 - progress * 0.6));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      particles = particles.filter((p) => p.life < p.maxLife);
      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 6) {
        addParticles(e.clientX, e.clientY, 2);
        lastX = e.clientX;
        lastY = e.clientY;
        startAnimation();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    />
  );
}
