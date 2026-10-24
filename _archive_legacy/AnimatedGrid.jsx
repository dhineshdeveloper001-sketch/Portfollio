import React from 'react';

/**
 * Ultra-Lightweight Clean Ambient Mesh & Micro-Grid Background
 * Zero CPU/GPU canvas loop overhead for maximum frame rate and instant loading.
 */
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#06070a]">
      {/* Precision Micro Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Subtle Static Ambient Glow Accents (Zero animation lag) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#ff1e42]/12 via-[#ff1e42]/4 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#00d4ff]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06070a_90%)]" />
    </div>
  );
};

export default React.memo(AnimatedGrid);
