import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import BracketTitle from './BracketTitle';
import { ArrowLeft, ArrowRight, ExternalLink, Code2, Cpu } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const Projects = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const projectCount = projectsData.length;
  const currentProject = projectsData[page];

  const paginate = useCallback((newDirection) => {
    playClickSound();
    setPage(([prevPage]) => {
      let next = prevPage + newDirection;
      if (next < 0) next = projectCount - 1;
      if (next >= projectCount) next = 0;
      return [next, newDirection];
    });
  }, [projectCount]);

  const goToProject = useCallback((index) => {
    playClickSound();
    setPage(([prevPage]) => {
      const dir = index > prevPage ? 1 : -1;
      return [index, dir];
    });
  }, []);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Swipe gesture handling for mobile
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = Math.abs(offset.x) * velocity.x;

    if (swipePower < -swipeConfidenceThreshold || offset.x < -60) {
      paginate(1);
    } else if (swipePower > swipeConfidenceThreshold || offset.x > 60) {
      paginate(-1);
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 font-body overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="space-y-1.5">
          <BracketTitle subtitle="Featured Software Projects">
            Engineering Showcase
          </BracketTitle>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Full-stack systems engineered with Java Spring Boot, React, and relational database architectures.
          </p>
        </div>

        {/* Minimal Project Counter & Navigation Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <span className="text-xs font-mono font-semibold text-slate-400">
            {String(page + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => paginate(-1)}
              onMouseEnter={playHoverSound}
              aria-label="Previous project"
              className="p-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.2] text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => paginate(1)}
              onMouseEnter={playHoverSound}
              aria-label="Next project"
              className="p-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.2] text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Single-Project Carousel Showcase */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentProject.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="w-full glass-card p-5 sm:p-8 bg-[#0c0e14]/90 border-white/[0.1] rounded-2xl shadow-xl flex flex-col justify-between space-y-6 select-none"
          >
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <span className="text-[0.7rem] font-mono uppercase tracking-wider text-[#00d4ff] font-semibold">
                {currentProject.category}
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">
                PROJ #{currentProject.number}
              </span>
            </div>

            {/* Project Visual Area */}
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border border-white/[0.08] bg-black/50 relative">
              {currentProject.webpImage || currentProject.pngImage || currentProject.screenshot ? (
                <picture>
                  <source srcSet={currentProject.webpImage || currentProject.screenshot} type="image/webp" />
                  <img
                    src={currentProject.pngImage || currentProject.webpImage || currentProject.screenshot}
                    alt={currentProject.alt || currentProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </picture>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Cpu className="w-10 h-10 text-[#00d4ff] mb-2" />
                  <span className="font-display text-base text-slate-300 font-bold">
                    {currentProject.title}
                  </span>
                </div>
              )}
            </div>

            {/* Project Content Info */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {currentProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {currentProject.description}
              </p>

              {/* Clean Typography Tech Stack (No big card chips) */}
              <div className="pt-2 text-xs font-mono text-slate-400">
                <span className="text-slate-500 mr-2">Technologies:</span>
                <span className="text-slate-200">{currentProject.techDisplay}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              {currentProject.liveDemoUrl && (
                <a
                  href={currentProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-4 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}

              {(currentProject.githubUrl || currentProject.codeUrl) && (
                <a
                  href={currentProject.githubUrl || currentProject.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-2 px-4 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#ff1e42]" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Position Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {projectsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToProject(idx)}
            aria-label={`Go to project ${idx + 1}`}
            className={`transition-all duration-200 cursor-pointer rounded-full ${
              idx === page
                ? 'w-6 h-1.5 bg-[#00d4ff]'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Projects);
