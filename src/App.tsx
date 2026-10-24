import React, { useState, useEffect, Suspense, lazy } from "react";
import { ReactLenis } from "lenis/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { ProjectsCarousel } from "./components/ProjectsCarousel";
import { Experience } from "./components/Experience";
import { Certificates } from "./components/Certificates";
import { Education } from "./components/Education";
import { ContactForm } from "./components/ContactForm";
import { SparkleCursor } from "./components/SparkleCursor";
import { Toast } from "./components/Toast";
import { sound } from "./utils/sound";
import { identity, education } from "./data/portfolioData";
import { ArrowUp } from "lucide-react";

// Lazy load CommandPalette to minimize initial bundle size and speed up first paint
const CommandPalette = lazy(() =>
  import("./components/CommandPalette").then((m) => ({ default: m.CommandPalette }))
);

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.click();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.0, smoothWheel: true }}>
      <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#050505] text-[#0F172A] dark:text-[#F8FAFC] selection:bg-[#E11D48] dark:selection:bg-[#FF1E1E] selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
        {/* CSS Background Grid (Zero WebGL overhead) */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 dark:opacity-40 z-0"
        />

        {/* Optimized Idle-Pausing Sparkle Cursor */}
        <SparkleCursor />

        {/* Floating Glass Navbar with Theme Toggle */}
        <Navbar onOpenCommand={() => setCommandPaletteOpen(true)} />

        {/* Lazily Mounted Command Palette Modal */}
        <Suspense fallback={null}>
          {commandPaletteOpen && (
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={() => setCommandPaletteOpen(false)}
            />
          )}
        </Suspense>

        {/* Global Toast Notifications */}
        <Toast />

        {/* Main Content Sections */}
        <main className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <TechStack />
          <ProjectsCarousel />
          <Experience />
          <Certificates />
          <Education />
          <ContactForm />
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-black/5 dark:border-white/[0.08] bg-white/80 dark:bg-[#0A0A0E]/80 backdrop-blur-md py-12 px-6 md:px-10 transition-colors duration-300">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-[#0F172A] dark:text-white text-sm tracking-wider">
                {identity.monogram}
              </span>
              <span>•</span>
              <p>© {new Date().getFullYear()} {identity.fullName}. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[#64748B] dark:text-[#94A3B8]">
                B.E. CSE · {education.college}
              </span>

              <button
                onClick={() => {
                  sound.pulse();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 text-[#334155] dark:text-[#CBD5E1] hover:text-[#E11D48] dark:hover:text-[#FF1E1E] transition-colors cursor-pointer font-medium"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}
