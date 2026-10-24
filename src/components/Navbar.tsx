import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Volume2, VolumeX, Menu, X, Sun, Moon } from "lucide-react";
import { identity } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { scrollToSection } from "../utils/useScroll";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onOpenCommand: () => void;
}

const navLinks = [
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Certificates", href: "certificates" },
  { name: "Education", href: "education" },
  { name: "Contact", href: "contact" },
];

export function Navbar({ onOpenCommand }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [muted, setMuted] = useState(sound.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = sound.subscribe((isMuted) => setMuted(isMuted));
    return unsub;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    sound.click();
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setMuted(next);
    if (!next) {
      sound.click();
    }
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-10 py-3.5 transition-all duration-300"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl ${
          scrolled ? "shadow-black/10 dark:shadow-black/80" : ""
        }`}
      >
        {/* Left: DK Monogram with Glowing Accent Dot */}
        <button
          onClick={() => {
            sound.pulse();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          aria-label="Dhineshkumar J Home"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 group-hover:border-[#E11D48]/50 dark:group-hover:border-[#FF1E1E]/50 group-hover:bg-[#E11D48]/10 dark:group-hover:bg-[#FF1E1E]/10 transition-all duration-300">
            <span className="font-mono text-sm font-extrabold text-[#0F172A] dark:text-white tracking-wider group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors">
              {identity.monogram}
            </span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E11D48] dark:bg-[#FF1E1E] shadow-[0_0_8px_#FF1E1E]"></span>
            </span>
          </div>
          <span className="hidden md:inline font-mono text-xs text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors">
            dhinesh.dev
          </span>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              onMouseEnter={() => sound.hover()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right: Actions (Theme Toggle + Cmd+K + Mute Toggle + Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button (Dark / Light Mode) */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-[#E11D48]/50 dark:hover:border-[#FF1E1E]/50 text-[#64748B] dark:text-[#94A3B8] transition-all cursor-pointer shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="dark"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <Moon className="w-4 h-4 text-amber-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="light"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              sound.click();
              onOpenCommand();
            }}
            onMouseEnter={() => sound.hover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 text-xs font-mono text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-all cursor-pointer shadow-sm group"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF1E1E] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/15 text-[#475569] dark:text-white/80">
              ⌘K
            </kbd>
          </button>

          {/* Mute Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 text-[#64748B] dark:text-[#94A3B8] hover:text-[#E11D48] dark:hover:text-[#FF1E1E] transition-all cursor-pointer"
            title={muted ? "Unmute Audio FX" : "Mute Audio FX"}
            aria-label="Toggle sound effects"
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-[#94A3B8] dark:text-[#64748B]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 p-4 rounded-2xl bg-white/95 dark:bg-[#0A0A0E]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl max-w-6xl mx-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#334155] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#E11D48]/10 dark:hover:bg-[#FF1E1E]/10 hover:border-[#E11D48]/30 dark:hover:border-[#FF1E1E]/30 border border-transparent transition-all"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
