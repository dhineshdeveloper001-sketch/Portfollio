import React, { useState } from "react";
import { ProjectItem } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { Check, ShieldCheck, Plus, RefreshCw, Trophy } from "lucide-react";

interface ProjectPreviewProps {
  project: ProjectItem;
}

export function ProjectPreviewVisuals({ project }: ProjectPreviewProps) {
  // Pure instant client-side rendering with zero network delay
  switch (project.previewType) {
    case "workflow":
      return <WorkflowSimulator />;
    case "dashboard":
      return <ScholarLinkDashboard />;
    case "calculator":
      return <GSTCalculator />;
    case "cashflow":
      return <LedgerFlowPreview />;
    case "auth":
      return <AuthHandshakeVisual />;
    case "game":
      return <BinaryLogicPuzzle />;
    default:
      return null;
  }
}

// 1. P01: 3-Stage Workflow Simulator
function WorkflowSimulator() {
  const [stage, setStage] = useState(0); // 0: Submitted, 1: Warden Review, 2: Approved
  const stages = ["Submitted", "Warden Review", "Approved"];

  const advance = () => {
    sound.click();
    setStage((prev) => (prev + 1) % 3);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>WORKFLOW AUTOMATION ENGINE</span>
        <span className="text-[#E11D48] dark:text-[#FF1E1E] font-semibold">ACTIVE SIMULATION</span>
      </div>

      <div className="py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between relative px-2">
          {/* Energy Pipe */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-black/10 dark:bg-white/10 -translate-y-1/2 -z-0">
            <div
              className="h-full bg-[#E11D48] dark:bg-[#FF1E1E] transition-all duration-500 shadow-[0_0_10px_#FF1E1E]"
              style={{ width: `${(stage / 2) * 100}%` }}
            />
          </div>

          {stages.map((st, i) => (
            <div key={st} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  i <= stage
                    ? "bg-[#E11D48] dark:bg-[#FF1E1E] border-[#E11D48] dark:border-[#FF1E1E] text-white shadow-[0_0_15px_rgba(255,30,30,0.5)]"
                    : "bg-white dark:bg-[#0A0A0E] border-black/20 dark:border-white/20 text-[#64748B]"
                }`}
              >
                {i < stage ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-[11px] whitespace-nowrap font-medium ${
                  i === stage
                    ? "text-[#0F172A] dark:text-white font-bold"
                    : "text-[#64748B]"
                }`}
              >
                {st}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 text-center text-[#475569] dark:text-[#94A3B8]">
          Current Status:{" "}
          <span className="text-[#0F172A] dark:text-white font-bold">
            {stages[stage]}
          </span>
        </div>
      </div>

      <button
        onClick={advance}
        className="w-full py-2.5 rounded-lg bg-[#E11D48]/15 dark:bg-[#FF1E1E]/20 hover:bg-[#E11D48]/25 dark:hover:bg-[#FF1E1E]/30 border border-[#E11D48]/40 dark:border-[#FF1E1E]/60 text-[#E11D48] dark:text-white font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer active:scale-98"
      >
        Advance Stage →
      </button>
    </div>
  );
}

// 2. P02: ScholarLink Mini Dashboard
function ScholarLinkDashboard() {
  const [attendance, setAttendance] = useState(85);
  const grades = [
    { subject: "Data Structures", val: 92 },
    { subject: "Database Systems", val: 88 },
    { subject: "Operating Systems", val: 84 },
  ];

  const cycleAttendance = () => {
    sound.click();
    const vals = [75, 85, 92];
    const nextIdx = (vals.indexOf(attendance) + 1) % vals.length;
    setAttendance(vals[nextIdx]);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>ACADEMIC ANALYTICS FEED</span>
        <button
          onClick={cycleAttendance}
          className="text-[#E11D48] dark:text-[#FF1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Toggle Attendance</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center py-2">
        {/* Attendance Ring */}
        <div className="flex flex-col items-center justify-center p-3 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-black/10 dark:text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#E11D48] dark:text-[#FF1E1E]"
                strokeDasharray={`${attendance}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-bold text-[#0F172A] dark:text-white">
              {attendance}%
            </span>
          </div>
          <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] mt-2 font-medium">
            Attendance
          </span>
        </div>

        {/* Grade Progress Bars */}
        <div className="flex flex-col gap-3">
          {grades.map((g) => (
            <div key={g.subject} className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#475569] dark:text-[#94A3B8] truncate">{g.subject}</span>
                <span className="text-[#0F172A] dark:text-white font-bold">{g.val}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded overflow-hidden">
                <div
                  className="h-full bg-[#E11D48] dark:bg-[#FF1E1E] rounded"
                  style={{ width: `${g.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2.5 bg-black/[0.03] dark:bg-white/5 rounded-lg text-center text-[#64748B] dark:text-[#94A3B8] text-[11px]">
        Faculty–Student Sync: <span className="text-emerald-600 dark:text-emerald-400 font-bold">ONLINE</span>
      </div>
    </div>
  );
}

// 3. P03: LIVE GST Calculator
function GSTCalculator() {
  const [items, setItems] = useState([
    { name: "Server Unit 1U", price: 1000 },
    { name: "Database Backup Tier", price: 400 },
  ]);

  const addItem = () => {
    sound.click();
    const options = [
      { name: "SSL Certificate 2Y", price: 250 },
      { name: "Load Balancer Addon", price: 600 },
      { name: "Monitoring License", price: 300 },
    ];
    const nextItem = options[items.length % options.length];
    setItems((prev) => [...prev, nextItem]);
  };

  const basePrice = items.reduce((acc, curr) => acc + curr.price, 0);
  const gst = basePrice * 0.18;
  const total = basePrice + gst;

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>REALTIME INVOICE ENGINE</span>
        <button
          onClick={addItem}
          className="text-[#E11D48] dark:text-[#FF1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 py-1">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex justify-between text-[#334155] dark:text-[#CBD5E1] bg-black/[0.03] dark:bg-white/5 px-2.5 py-1 rounded border border-black/5 dark:border-white/5"
          >
            <span>{it.name}</span>
            <span className="text-[#0F172A] dark:text-white font-bold">₹{it.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-3 space-y-1 text-[#64748B] dark:text-[#94A3B8]">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="text-[#0F172A] dark:text-white font-medium">₹{basePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%):</span>
          <span className="text-[#E11D48] dark:text-[#FF1E1E] font-medium">₹{gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-[#0F172A] dark:text-white border-t border-black/10 dark:border-white/10 pt-1">
          <span>Total Invoice:</span>
          <span className="text-[#E11D48] dark:text-[#FF1E1E]">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// 4. P04: LedgerFlow Pro Cashflow Curve & Double-Entry Balancing
function LedgerFlowPreview() {
  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>DOUBLE-ENTRY RECONCILIATION</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">BALANCED</span>
      </div>

      {/* SVG Cashflow Waveform Curve */}
      <div className="w-full h-24 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10 p-2 relative flex items-end">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path
            d="M 0 45 Q 30 15 60 30 T 120 18 T 160 38 T 200 12 L 200 60 L 0 60 Z"
            fill="rgba(225, 29, 72, 0.15)"
          />
          <path
            d="M 0 45 Q 30 15 60 30 T 120 18 T 160 38 T 200 12"
            fill="none"
            stroke="#E11D48"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-[#475569] dark:text-[#94A3B8] border-b border-black/5 dark:border-white/5 pb-1">
          <span>ACCOUNT DEBITS (DR)</span>
          <span className="text-[#0F172A] dark:text-white font-semibold">₹14,500.00</span>
        </div>
        <div className="flex justify-between text-[11px] text-[#475569] dark:text-[#94A3B8] border-b border-black/5 dark:border-white/5 pb-1">
          <span>ACCOUNT CREDITS (CR)</span>
          <span className="text-[#0F172A] dark:text-white font-semibold">₹14,500.00</span>
        </div>
        <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
          <span>NET VARIANCE:</span>
          <span>₹0.00 (VERIFIED)</span>
        </div>
      </div>
    </div>
  );
}

// 5. P05: Gatekeeper Auth Handshake Simulation
function AuthHandshakeVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Credentials", "Hash Verify", "JWT Issued", "Access Granted"];

  const runHandshake = () => {
    sound.click();
    setActiveStep(1);
    setTimeout(() => {
      sound.hover();
      setActiveStep(2);
    }, 400);
    setTimeout(() => {
      sound.hover();
      setActiveStep(3);
    }, 800);
    setTimeout(() => {
      sound.match();
      setActiveStep(4);
    }, 1200);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>AUTH WORKFLOW SIMULATOR</span>
        <ShieldCheck className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
      </div>

      <div className="space-y-2 py-2">
        {steps.map((st, i) => (
          <div
            key={st}
            className={`p-2.5 rounded-lg border flex items-center justify-between transition-all ${
              activeStep > i
                ? "bg-[#E11D48]/10 dark:bg-[#FF1E1E]/15 border-[#E11D48]/40 dark:border-[#FF1E1E]/60 text-[#0F172A] dark:text-white font-medium"
                : "bg-black/[0.02] dark:bg-white/5 border-black/10 dark:border-white/10 text-[#64748B]"
            }`}
          >
            <span>
              {i + 1}. {st}
            </span>
            {activeStep > i ? (
              <Check className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF1E1E]" />
            ) : (
              <span className="text-[10px] text-black/30 dark:text-white/30">PENDING</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={runHandshake}
        className="w-full py-2.5 rounded-lg bg-[#E11D48]/15 dark:bg-[#FF1E1E]/20 hover:bg-[#E11D48]/25 dark:hover:bg-[#FF1E1E]/30 border border-[#E11D48]/40 dark:border-[#FF1E1E]/60 text-[#E11D48] dark:text-white font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer active:scale-98"
      >
        Simulate Auth Handshake
      </button>
    </div>
  );
}

// 6. P06: PLAYABLE 4-Bit Binary Logic Puzzle
function BinaryLogicPuzzle() {
  const [target, setTarget] = useState(11);
  const [bits, setBits] = useState([false, false, false, false]); // [8, 4, 2, 1]
  const [streak, setStreak] = useState(0);
  const [matched, setMatched] = useState(false);

  const bitValues = [8, 4, 2, 1];
  const currentSum = bits.reduce((acc, b, i) => acc + (b ? bitValues[i] : 0), 0);

  const toggleBit = (idx: number) => {
    sound.click();
    const nextBits = [...bits];
    nextBits[idx] = !nextBits[idx];
    setBits(nextBits);

    const newSum = nextBits.reduce((acc, b, i) => acc + (b ? bitValues[i] : 0), 0);
    if (newSum === target) {
      sound.match();
      setMatched(true);
      setStreak((s) => s + 1);

      setTimeout(() => {
        setMatched(false);
        setBits([false, false, false, false]);
        let nextTarget = Math.floor(Math.random() * 15) + 1;
        while (nextTarget === target) {
          nextTarget = Math.floor(Math.random() * 15) + 1;
        }
        setTarget(nextTarget);
      }, 900);
    }
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>4-BIT LOGIC PUZZLE</span>
        <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>STREAK: {streak}</span>
        </div>
      </div>

      <div className="text-center py-2">
        <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">TARGET DECIMAL</div>
        <div className="text-4xl font-extrabold text-[#E11D48] dark:text-[#FF1E1E] my-1">
          {target}
        </div>
        <div className="text-[11px] text-[#64748B]">CURRENT SUM: {currentSum}</div>
      </div>

      {matched ? (
        <div className="p-3 bg-[#E11D48] dark:bg-[#FF1E1E] text-white text-center font-bold tracking-widest rounded shadow-[0_0_20px_#FF1E1E] animate-pulse">
          LOGIC MATCHED!
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {bitValues.map((val, idx) => (
            <button
              key={val}
              onClick={() => toggleBit(idx)}
              className={`p-3 rounded-lg flex flex-col items-center justify-center border transition-all cursor-pointer ${
                bits[idx]
                  ? "bg-[#E11D48] dark:bg-[#FF1E1E] border-[#E11D48] dark:border-[#FF1E1E] text-white shadow-[0_0_12px_rgba(255,30,30,0.5)]"
                  : "bg-black/[0.03] dark:bg-white/5 border-black/10 dark:border-white/15 text-[#475569] dark:text-[#94A3B8] hover:border-black/30 dark:hover:border-white/40"
              }`}
            >
              <span className="text-[10px] text-black/50 dark:text-white/50">+{val}</span>
              <span className="text-base font-bold">{bits[idx] ? "1" : "0"}</span>
            </button>
          ))}
        </div>
      )}

      <div className="text-center text-[10px] text-[#64748B]">
        Toggle the 4 bits to match the target sum
      </div>
    </div>
  );
}
