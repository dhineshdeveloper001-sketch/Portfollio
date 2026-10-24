import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code,
  Layers,
  FolderGit2,
  Briefcase,
  Award,
  GraduationCap,
  Mail,
  Copy,
  Volume2,
  ExternalLink,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { identity } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { scrollToSection } from "../utils/useScroll";
import { useTheme } from "../context/ThemeContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: "Navigation" | "Quick Action" | "External";
  icon: React.ReactNode;
  perform: () => void;
  keywords?: string[];
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    {
      id: "act-toggle-theme",
      title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Quick Action",
      icon:
        theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-500" />
        ) : (
          <Moon className="w-4 h-4 text-amber-400" />
        ),
      perform: () => toggleTheme(),
      keywords: ["theme", "light", "dark", "mode", "toggle theme"],
    },
    {
      id: "nav-about",
      title: "Jump to Profile & About",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("about"),
      keywords: ["about", "bio", "profile", "origin"],
    },
    {
      id: "nav-skills",
      title: "Jump to Tech Stack",
      category: "Navigation",
      icon: <Code className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("skills"),
      keywords: ["skills", "stack", "java", "react", "spring boot", "python", "mysql"],
    },
    {
      id: "nav-projects",
      title: "Jump to Featured Projects",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("projects"),
      keywords: ["projects", "mess reduction", "scholarlink", "billing", "ledgerflow", "auth"],
    },
    {
      id: "nav-experience",
      title: "Jump to Career Timeline",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("experience"),
      keywords: ["experience", "internship", "the mind it company", "work"],
    },
    {
      id: "nav-certificates",
      title: "Jump to Certifications & Awards",
      category: "Navigation",
      icon: <Award className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("certificates"),
      keywords: ["certificates", "awards", "java", "spring boot", "bug bounty"],
    },
    {
      id: "nav-education",
      title: "Jump to Academic Foundation (CGPA)",
      category: "Navigation",
      icon: <GraduationCap className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("education"),
      keywords: ["education", "college", "cgpa", "degree", "srirangam"],
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Form",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />,
      perform: () => scrollToSection("contact"),
      keywords: ["contact", "email", "message", "hire"],
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      category: "Quick Action",
      icon: <Copy className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        navigator.clipboard.writeText(identity.email);
        sound.match();
      },
      keywords: ["copy email", "email address", identity.email],
    },
    {
      id: "act-copy-phone",
      title: "Copy Phone Number",
      category: "Quick Action",
      icon: <Copy className="w-4 h-4 text-emerald-500" />,
      perform: () => {
        navigator.clipboard.writeText(identity.phone);
        sound.match();
      },
      keywords: ["copy phone", "phone number", identity.phone],
    },
    {
      id: "act-toggle-sound",
      title: "Toggle Micro-Sound FX",
      category: "Quick Action",
      icon: <Volume2 className="w-4 h-4 text-amber-500" />,
      perform: () => sound.toggleMute(),
      keywords: ["sound", "audio", "mute", "unmute"],
    },
    {
      id: "ext-github",
      title: "Open GitHub Profile",
      category: "External",
      icon: <ExternalLink className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />,
      perform: () => window.open(identity.github.url, "_blank"),
      keywords: ["github", "code", "repos"],
    },
    {
      id: "ext-leetcode",
      title: "Open LeetCode Profile",
      category: "External",
      icon: <ExternalLink className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />,
      perform: () => window.open(identity.leetcode.url, "_blank"),
      keywords: ["leetcode", "dsa", "algorithm"],
    },
  ];

  const filteredActions = actions.filter((action) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    if (action.title.toLowerCase().includes(q)) return true;
    if (action.category.toLowerCase().includes(q)) return true;
    if (action.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
    return false;
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sound.hover();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sound.hover();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          sound.click();
          filteredActions[selectedIndex].perform();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#0A0A0E] border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-black/10 dark:border-white/10 gap-3">
              <Search className="w-5 h-5 text-[#E11D48] dark:text-[#FF1E1E]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a section or command (e.g., projects, theme, skills)..."
                className="w-full bg-transparent text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-white/30 text-sm focus:outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#64748B] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[#64748B]">
                  No commands matched "{query}"
                </div>
              ) : (
                filteredActions.map((action, idx) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      sound.click();
                      action.perform();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      idx === selectedIndex
                        ? "bg-[#E11D48]/15 dark:bg-[#FF1E1E]/15 border border-[#E11D48]/40 dark:border-[#FF1E1E]/40 text-[#0F172A] dark:text-white"
                        : "text-[#334155] dark:text-[#CBD5E1] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/10">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </div>

                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">
                      {action.category}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/5 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[#E11D48] dark:text-[#FF1E1E] font-semibold">DK // PORTFOLIO</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
