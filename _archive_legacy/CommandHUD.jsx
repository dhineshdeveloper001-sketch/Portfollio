import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Sparkles, Code2, Cpu, ExternalLink, Volume2, VolumeX, Check } from 'lucide-react';
import { personalInfo, projectsData, skillsData } from '../data/portfolioData';
import { playClickSound, playOpenSound, isSoundEnabled, toggleSound } from '../utils/soundEffects';

const INITIAL_LOGS = [
  { type: 'system', text: 'DHINESH_OS v3.2.0-PROD initialized.' },
  { type: 'info', text: 'Type "help" or click one of the quick actions below to query the portfolio.' }
];

const QUICK_COMMANDS = [
  { label: 'View Backend Stack', cmd: 'skills backend' },
  { label: 'Filter Live Demos', cmd: 'projects --live' },
  { label: 'Spring Boot Architecture', cmd: 'projects --java' },
  { label: 'Engineering Telemetry', cmd: 'whoami' },
  { label: 'Direct Contact Details', cmd: 'contact' }
];

const CommandHUD = ({ isOpen, onClose, onSelectProject }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const logEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      playOpenSound();
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (rawCmd) => {
    playClickSound();
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'user', text: `$ ${rawCmd}` }];

    if (cmd === 'clear' || cmd === 'cls') {
      setLogs([{ type: 'system', text: 'Terminal output cleared.' }]);
      setInputVal('');
      return;
    }

    if (cmd === 'help') {
      newLogs.push({
        type: 'response',
        text: `AVAILABLE COMMANDS:
• projects [--live | --java | --saas] : Filter & list software projects
• skills [backend | frontend | database | ai] : View technical competency matrix
• whoami : View developer background, degree, CGPA, and credentials
• jump <hero|about|skills|howibuild|projects|experience|contact> : Scroll to section
• contact : Direct email, phone, and professional handles
• sound : Toggle audio effects (current: ${isSoundEnabled() ? 'ON' : 'OFF'})
• clear : Clear terminal console output`
      });
    } else if (cmd.startsWith('projects') || cmd === 'p') {
      let filtered = projectsData;
      if (cmd.includes('--live')) {
        filtered = projectsData.filter((p) => p.liveDemoUrl || p.liveUrl);
        newLogs.push({ type: 'accent', text: `Filtered ${filtered.length} projects with active live deployments:` });
      } else if (cmd.includes('--java')) {
        filtered = projectsData.filter((p) => p.tags.some((t) => t.includes('Java') || t.includes('Spring')));
        newLogs.push({ type: 'accent', text: `Filtered ${filtered.length} Java Spring Boot architectures:` });
      } else if (cmd.includes('--saas')) {
        filtered = projectsData.filter((p) => p.category.includes('SaaS') || p.category.includes('FinTech'));
        newLogs.push({ type: 'accent', text: `Filtered ${filtered.length} Enterprise SaaS products:` });
      } else {
        newLogs.push({ type: 'accent', text: `Displaying all ${projectsData.length} production projects:` });
      }

      filtered.forEach((p) => {
        newLogs.push({
          type: 'project_item',
          project: p,
          text: `[${p.number}] ${p.title} (${p.category}) — ${p.impact || p.description.slice(0, 75) + '...'}`
        });
      });
    } else if (cmd.startsWith('skills') || cmd === 'skills') {
      const parts = cmd.split(' ');
      const sub = parts[1];
      if (sub && skillsData.items[sub]) {
        const cat = skillsData.items[sub];
        newLogs.push({
          type: 'response',
          text: `Competencies for ${sub.toUpperCase()}:\n` +
            cat.map((s) => `• ${s.name} (${s.version}) — Level: ${s.level} | ${s.readiness}\n  Applied: ${s.capability}`).join('\n')
        });
      } else {
        newLogs.push({
          type: 'response',
          text: `CORE TECHNICAL STACK SUMMARY:
• Java 21 LTS & Spring Boot 3.2 (REST, Security, JPA, Microservices)
• React 19 & JavaScript ES6+ (Component Architecture, Hooks, State)
• MySQL 8.0 & PostgreSQL 16 (Normalized Schemas, ACID Transactions)
• GenAI Workflow Integration & Prompt Engineering
• LeetCode Problem Solving (Arrays, Trees, Dynamic Programming)`
        });
      }
    } else if (cmd === 'whoami' || cmd === 'about') {
      newLogs.push({
        type: 'response',
        text: `DEVELOPER TELEMETRY:
• Identity: Dhineshkumar J
• Role: Full Stack Developer & GenAI Engineer
• Degree: B.E. Computer Science and Engineering (2023 - 2027)
• Institution: Government College of Engineering, Srirangam
• Academic Merit: 7.76 CGPA
• Internship: Java Full Stack Intern (1 Month) @ The Mind IT Company
• Specialty: High-throughput Spring Boot Backends, Relational Schemas, React SPAs`
      });
    } else if (cmd === 'contact') {
      newLogs.push({
        type: 'response',
        text: `COMMUNICATION CHANNELS:
• Email: ${personalInfo.email}
• Phone: ${personalInfo.phone}
• GitHub: ${personalInfo.github}
• LeetCode: ${personalInfo.leetcode}
• Location: Srirangam, Tamil Nadu, India`
      });
    } else if (cmd === 'sound') {
      const state = toggleSound();
      setSoundActive(state);
      newLogs.push({
        type: 'accent',
        text: `Sound effects synthesized via Web Audio API: ${state ? 'ENABLED' : 'MUTED'}`
      });
    } else if (cmd.startsWith('jump ') || cmd.startsWith('goto ')) {
      const section = cmd.split(' ')[1];
      const target = document.getElementById(section);
      if (target) {
        onClose();
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 200);
      } else {
        newLogs.push({
          type: 'error',
          text: `Section "${section}" not found. Try: hero, about, skills, howibuild, projects, experience, contact.`
        });
      }
    } else {
      newLogs.push({
        type: 'error',
        text: `Command not recognized: "${rawCmd}". Type "help" for valid commands.`
      });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#090b10] border border-white/[0.14] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col h-[560px] font-mono text-xs"
          >
            {/* Top Bar */}
            <div className="px-4 py-3 bg-[#0d1017] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-slate-300 font-bold ml-2 text-[0.72rem] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00d4ff]" />
                  <span>DHINESH_TERMINAL // COMMAND HUD</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const state = toggleSound();
                    setSoundActive(state);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  title="Toggle Sound Effects"
                >
                  {soundActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                  title="Close Terminal [ESC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Chips Strip */}
            <div className="p-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[0.62rem] text-slate-500 uppercase tracking-wider shrink-0 pl-1">
                Quick:
              </span>
              {QUICK_COMMANDS.map((qc, i) => (
                <button
                  key={i}
                  onClick={() => executeCommand(qc.cmd)}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 text-slate-300 border border-white/[0.08] text-[0.68rem] shrink-0 transition-colors cursor-pointer"
                >
                  {qc.label}
                </button>
              ))}
            </div>

            {/* Output Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2.5 text-slate-300">
              {logs.map((log, index) => {
                if (log.type === 'user') {
                  return (
                    <div key={index} className="text-white font-bold flex items-start gap-1">
                      <span className="text-[#ff1e42]">▶</span>
                      <span>{log.text}</span>
                    </div>
                  );
                }
                if (log.type === 'accent') {
                  return (
                    <div key={index} className="text-[#00d4ff] font-semibold">
                      {log.text}
                    </div>
                  );
                }
                if (log.type === 'error') {
                  return (
                    <div key={index} className="text-rose-400">
                      {log.text}
                    </div>
                  );
                }
                if (log.type === 'project_item' && log.project) {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        onClose();
                        onSelectProject(log.project.id);
                      }}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#00d4ff]/40 hover:bg-[#00d4ff]/5 transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-white font-bold group-hover:text-[#00d4ff] transition-colors">
                          {log.project.title}
                        </span>
                        <span className="text-slate-400 text-[0.68rem] block">
                          {log.project.category} • {log.project.tags.slice(0, 3).join(', ')}
                        </span>
                      </div>
                      <span className="text-[0.65rem] text-[#00d4ff] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect Architecture</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={index} className="whitespace-pre-wrap text-slate-300 leading-relaxed text-[0.72rem]">
                    {log.text}
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0d1017] border-t border-white/[0.08] flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command (e.g. 'projects', 'skills', 'whoami', 'help')..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 text-xs font-mono"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="px-2.5 py-1 rounded bg-[#ff1e42] hover:bg-[#e00b2e] text-white text-[0.7rem] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>RUN</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CommandHUD);
