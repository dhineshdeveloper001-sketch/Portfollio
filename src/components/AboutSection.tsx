import React from "react";
import { identity } from "../data/portfolioData";

export function AboutSection() {
  return (
    <section
      id="profile"
      className="min-h-screen relative flex items-center max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Heading and Exact Bio */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
              // 02 — PROFILE
            </span>
            <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
            Observatory &amp; Background
          </h2>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-base md:text-lg text-[#CBD5E1] leading-relaxed font-ui">
              {identity.bio}
            </p>
          </div>
        </div>

        {/* Right Column: Terminal-styled Live Telemetry Panel */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="glass-panel rounded-xl border border-white/10 overflow-hidden shadow-2xl font-mono text-xs">
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-[#64748B] tracking-wider uppercase">
                TELEMETRY :: REEL_FEED
              </span>
            </div>

            {/* Terminal Feed Body */}
            <div className="p-5 flex flex-col gap-3 text-[#94A3B8]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#64748B]">LATITUDE</span>
                <span className="text-white font-medium">12.00°N</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#64748B]">LONGITUDE</span>
                <span className="text-white font-medium">78.60°E</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#64748B]">STATUS</span>
                <span className="text-emerald-400 font-medium">AVAILABLE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#64748B]">MODE</span>
                <span className="text-[#FF1E1E] font-medium">BUILDING</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#64748B]">BUILD</span>
                <span className="text-white font-medium">v2027.1</span>
              </div>

              {/* Blinking Red Cursor */}
              <div className="mt-2 flex items-center gap-2 text-[11px] text-[#FF1E1E]">
                <span>SYS_READY &gt;</span>
                <span className="w-2 h-4 bg-[#FF1E1E] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
