import React, { useState, useEffect } from 'react';

const TerminalPrompt = ({ command = "whoami", text, delay = 250 }) => {
  const [typedCommand, setTypedCommand] = useState('');
  const [typedText, setTypedText] = useState('');
  const [stage, setStage] = useState(0); // 0: typing cmd, 1: typing text, 2: complete

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedCommand(command);
      setTypedText(text);
      setStage(2);
      return;
    }

    let isMounted = true;
    let timer;

    // Stage 0: Type command
    let cmdIdx = 0;
    const typeCmd = () => {
      if (cmdIdx <= command.length) {
        if (isMounted) setTypedCommand(command.slice(0, cmdIdx));
        cmdIdx++;
        timer = setTimeout(typeCmd, 50);
      } else {
        timer = setTimeout(() => {
          if (isMounted) setStage(1);
        }, delay);
      }
    };

    timer = setTimeout(typeCmd, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [command, text, delay]);

  useEffect(() => {
    if (stage !== 1) return;
    let isMounted = true;
    let textIdx = 0;
    let timer;

    const typeText = () => {
      if (textIdx <= text.length) {
        if (isMounted) setTypedText(text.slice(0, textIdx));
        textIdx++;
        timer = setTimeout(typeText, 20);
      } else {
        if (isMounted) setStage(2);
      }
    };

    timer = setTimeout(typeText, 60);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [stage, text]);

  return (
    <div className="font-mono text-xs sm:text-sm bg-[#080808]/90 border border-white/15 rounded-xl p-4 max-w-2xl shadow-2xl backdrop-blur-md space-y-2.5 relative overflow-hidden group">
      {/* Top Bar Decoration */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[0.68rem] text-white/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-[#ff0a2d] font-semibold tracking-wider uppercase text-[0.65rem]">terminal — interactive</span>
      </div>

      {/* Terminal Command Input */}
      <div className="flex items-center gap-2 text-[#ff0a2d] font-semibold">
        <span className="text-white/60">$</span>
        <span>{typedCommand}</span>
        {stage === 0 && (
          <span className="inline-block w-2 h-4 bg-[#ff0a2d] animate-pulse" />
        )}
      </div>

      {/* Terminal Output */}
      {stage >= 1 && (
        <div className="text-white/90 leading-relaxed font-body text-xs sm:text-sm flex items-baseline flex-wrap pt-0.5">
          <span className="text-[#ff0a2d] font-mono mr-2 text-xs font-bold">&gt;</span>
          <span>{typedText}</span>
          <span className="inline-block w-2.5 h-4 bg-[#ff0a2d] ml-1.5 animate-pulse shadow-[0_0_10px_#ff0a2d]" />
        </div>
      )}
    </div>
  );
};

export default TerminalPrompt;
