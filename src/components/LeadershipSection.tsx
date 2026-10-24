import React from "react";
import { leadership } from "../data/portfolioData";
import { Users2 } from "lucide-react";

export function LeadershipSection() {
  const item = leadership[0];

  return (
    <section className="relative max-w-6xl mx-auto px-6 md:px-10 pb-14 md:pb-20">
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-sm font-semibold text-[#FF1E1E]">
            // 06B — LEADERSHIP
          </span>
          <span className="w-8 h-[1px] bg-[#FF1E1E]/40" />
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 text-[#FF1E1E] shrink-0">
              <Users2 className="w-6 h-6" />
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#FF1E1E] uppercase tracking-wider font-semibold">
                {item.event}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {item.role}
              </h3>
              <p className="mt-3 text-[#CBD5E1] text-sm md:text-base font-ui leading-relaxed">
                "{item.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
