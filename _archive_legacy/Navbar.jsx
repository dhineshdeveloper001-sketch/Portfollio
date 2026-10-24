import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { Menu, X, Download } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const Navbar = ({ activeSection = 'hero' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-200">
      <div className={`max-w-5xl mx-auto flex items-center justify-between px-4 py-2 rounded-2xl border transition-all duration-200 ${
        isScrolled
          ? 'bg-[#090b10]/95 backdrop-blur-xl border-white/[0.1] shadow-xl shadow-black/60'
          : 'bg-[#090b10]/60 backdrop-blur-md border-white/[0.06]'
      }`}>
        
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Dhineshkumar J Home"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#ff1e42] flex items-center justify-center text-white font-mono font-black text-xs shadow-sm">
            DK
          </div>
          <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-[#00d4ff] transition-colors">
            DHINESH<span className="text-[#ff1e42]">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={playHoverSound}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'text-white bg-white/[0.08] font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="/resume.pdf"
            download="Dhineshkumar_J_Resume.pdf"
            onClick={playClickSound}
            className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00d4ff]" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary !py-1.5 !px-3.5 text-xs font-semibold rounded-lg"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-slate-200" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-[#0a0c12]/98 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-3"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/[0.08] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <a
                href="/resume.pdf"
                download="Dhineshkumar_J_Resume.pdf"
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-mono text-slate-200 flex items-center gap-1.5 flex-1 justify-center border border-white/[0.08]"
              >
                <Download className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Resume</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary !py-1.5 text-xs font-semibold rounded-lg flex-1 text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default React.memo(Navbar);
