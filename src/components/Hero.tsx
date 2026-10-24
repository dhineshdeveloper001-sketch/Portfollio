import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react";
import { identity, education } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { scrollToSection } from "../utils/useScroll";
import { MagneticButton } from "./MagneticButton";

const typewriterWords = [
  "Full Stack Developer",
  "GenAI Enthusiast",
  "Java Backend Engineer",
];

export function Hero() {
  const letters = identity.fullName.split("");

  // Smooth Typewriter Hook
  const [wordIdx, setWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[wordIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % typewriterWords.length);
    } else {
      const typingSpeed = isDeleting ? 40 : 80;
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIdx]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[92vh] flex flex-col justify-center items-center text-center py-20 px-6 max-w-6xl mx-auto pt-32 pb-16 overflow-hidden w-full"
    >
      {/* Background Ambience: Subtle Red Glow + Grid Pattern (NO WebGL) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[700px] h-[340px] sm:h-[460px] bg-[#E11D48]/10 dark:bg-[#FF1E1E]/12 blur-[130px] rounded-full pointer-events-none -z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-md mb-6 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 transition-colors"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48] dark:bg-[#FF1E1E]"></span>
          </span>
          <span className="font-mono text-xs text-[#475569] dark:text-[#94A3B8] tracking-wide font-medium">
            {identity.subheadline}
          </span>
        </motion.div>

        {/* Kinetic Headline: DHINESHKUMAR J */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#0F172A] dark:text-white mb-4 flex flex-wrap justify-center select-none"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={`inline-block ${
                char === " "
                  ? "w-3 sm:w-5"
                  : "hover:text-[#E11D48] dark:hover:text-[#FF1E1E] transition-colors duration-200"
              }`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-3">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E11D48] dark:text-[#FF1E1E] tracking-tight flex items-center">
            <span>{displayedText}</span>
            <span
              aria-hidden="true"
              className="inline-block w-0.5 h-6 sm:h-8 bg-[#E11D48] dark:bg-[#FF1E1E] ml-1.5 animate-pulse"
            />
          </p>
        </div>

        {/* Institution & Engineering Focus */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] font-mono max-w-xl mb-10 flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
          <span>{education.college}</span>
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* [View Projects] Primary Magnetic Button */}
          <MagneticButton
            strength={0.35}
            onClick={() => {
              sound.pulse();
              scrollToSection("projects");
            }}
            onMouseEnter={() => sound.hover()}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E11D48] dark:bg-[#FF1E1E] text-white font-medium text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(225,29,72,0.35)] dark:shadow-[0_0_25px_rgba(255,30,30,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.55)] dark:hover:shadow-[0_0_35px_rgba(255,30,30,0.65)] cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              <Code2 className="w-4 h-4" />
              <span>View Projects</span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out" />
          </MagneticButton>

          {/* [Contact Me] Secondary Magnetic Button */}
          <MagneticButton
            strength={0.35}
            onClick={() => {
              sound.click();
              scrollToSection("contact");
            }}
            onMouseEnter={() => sound.hover()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/80 dark:bg-[#0A0A0E]/90 hover:bg-white dark:hover:bg-[#121218] text-[#0F172A] dark:text-[#F8FAFC] font-medium text-sm sm:text-base tracking-wide border border-black/10 dark:border-white/10 hover:border-[#E11D48]/50 dark:hover:border-[#FF1E1E]/50 transition-all duration-300 cursor-pointer backdrop-blur-xl shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
            <span className="font-semibold">Contact Me</span>
          </MagneticButton>
        </motion.div>

        {/* Quick Highlights Glass Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-md w-full max-w-2xl flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#475569] dark:text-[#94A3B8]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">CGPA</span>
            <span className="text-[#0F172A] dark:text-white font-bold">{education.cgpa}</span>
            <span className="text-[#64748B]">/ 10.0</span>
          </div>
          <span className="text-black/10 dark:text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">STACK</span>
            <span className="text-[#0F172A] dark:text-white font-medium">Java · Spring Boot · React</span>
          </div>
          <span className="text-black/10 dark:text-white/20">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">FOCUS</span>
            <span className="text-[#0F172A] dark:text-white font-medium">Full Stack & GenAI</span>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => {
          sound.click();
          scrollToSection("about");
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full text-[#64748B] hover:text-[#E11D48] dark:hover:text-[#FF1E1E] transition-colors cursor-pointer"
        aria-label="Scroll to About section"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.section>
  );
}
