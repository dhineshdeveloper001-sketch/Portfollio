import React, { useState, useEffect, lazy, Suspense } from 'react';
import AnimatedGrid from './components/AnimatedGrid';
import BootSequence from './components/BootSequence';
import CreativeCursor from './components/CreativeCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import HowIBuild from './components/HowIBuild';
import ExperienceEducation from './components/ExperienceEducation';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

// Lazy-loaded components for optimal bundle splitting
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Fallback loader for lazy-loaded sections
const SectionLoader = () => (
  <div className="w-full py-16 flex items-center justify-center text-[#00d4ff]">
    <Loader2 className="w-5 h-5 animate-spin" />
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Intersection observer for active navigation section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-15% 0px -35% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen font-body relative overflow-x-hidden bg-[#06070a] text-white selection:bg-[#ff1e42] selection:text-white">
      {/* 1. Cinematic Opening Sequence */}
      <BootSequence onComplete={() => {}} />

      {/* 2. Context-Aware Cursor (Disabled on mobile) */}
      <CreativeCursor />

      {/* 3. Subtle Ambient Background Mesh */}
      <AnimatedGrid />

      {/* 4. Sleek Minimal Navbar */}
      <Navbar activeSection={activeSection} />

      {/* 5. Main Content Flow with Consistent Spacing */}
      <main className="w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-32 pb-20 space-y-20 sm:space-y-28 relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="w-full">
          <Hero />
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="w-full">
          <About />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="w-full">
          <Skills />
        </section>

        {/* HOW I BUILD SECTION */}
        <section id="howibuild" className="w-full">
          <HowIBuild />
        </section>

        {/* PROJECTS CAROUSEL SHOWCASE */}
        <section id="projects" className="w-full">
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="w-full">
          <ExperienceEducation />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full">
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </section>

      </main>

      {/* 6. Clean Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
