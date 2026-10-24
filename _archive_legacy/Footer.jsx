import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

const Footer = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 px-5 sm:px-8 lg:px-10 bg-[#06070a] text-slate-400 font-body border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#ff1e42] flex items-center justify-center text-white font-black text-[0.65rem]">
            DK
          </div>
          <span className="text-slate-300 font-semibold">{personalInfo.fullName}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Full Stack & GenAI</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>{personalInfo.copyright}</span>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
