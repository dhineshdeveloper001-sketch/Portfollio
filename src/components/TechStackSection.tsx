import React, { useState } from "react";
import { skills } from "../data/portfolioData";

export function TechStackSection() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredRow(idx);
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section
      id="tech-stack"
      className="min-h-screen relative flex items-center max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full flex flex-col">
        {/* Monospace Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
            // 03 — TECH ARSENAL
          </span>
          <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8">
          Data Cathedral &amp; Engineering Matrix
        </h2>

        {/* Precision 5-Row Spec Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5 shadow-2xl">
          {skills.map((skillGroup, idx) => {
            const isHovered = hoveredRow === idx;
            return (
              <div
                key={skillGroup.index}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className="relative p-5 md:p-6 transition-colors duration-200 group overflow-hidden"
                style={{
                  borderColor: isHovered ? "var(--border-active)" : undefined
                }}
              >
                {/* Radial Red Spotlight Tracking Cursor within row */}
                {isHovered && (
                  <div
                    className="absolute pointer-events-none -inset-px rounded transition-opacity duration-150"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 30, 30, 0.12), transparent 75%)`
                    }}
                  />
                )}

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Left Column: Mono Index + Category */}
                  <div className="md:col-span-5 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#FF1E1E] font-semibold">
                      {skillGroup.index}
                    </span>
                    <span className="font-mono text-xs md:text-sm font-semibold text-white tracking-wider group-hover:text-[#FF1E1E] transition-colors">
                      {skillGroup.category}
                    </span>
                  </div>

                  {/* Right Column: Inline pill nodes separated by red micro-dots */}
                  <div className="md:col-span-7 flex flex-wrap items-center gap-2">
                    {skillGroup.items.map((item, itemIdx) => (
                      <React.Fragment key={item}>
                        <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs md:text-sm font-mono text-[#CBD5E1] group-hover:border-[#FF1E1E]/40 transition-colors">
                          {item}
                        </span>
                        {itemIdx < skillGroup.items.length - 1 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E1E]/70" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
