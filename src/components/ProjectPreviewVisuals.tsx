import React, { useState } from "react";
import { ProjectItem } from "../data/portfolioData";
import { sound } from "../utils/sound";
import {
  Check,
  Plus,
  RefreshCw,
  Trophy,
  Share2,
  FolderSync,
  ShoppingCart,
  HardDrive,
  FileCheck,
} from "lucide-react";

interface ProjectPreviewProps {
  project: ProjectItem;
}

export function ProjectPreviewVisuals({ project }: ProjectPreviewProps) {
  switch (project.id) {
    case "01": // Billing Software
      return <GSTCalculator />;
    case "02": // ScholarLink Hub
      return <ScholarLinkDashboard />;
    case "03": // ChikkoShare
      return <ChikkoShareSimulation />;
    case "04": // Smart File Organizer
      return <FileOrganizerSimulation />;
    case "05": // Nexus Cart
      return <NexusCartSimulation />;
    case "06": // SyncTask / Mess Reduction
      return <WorkflowSimulator />;
    case "07": // Binary Logic Game
      return <BinaryLogicPuzzle />;
    default:
      return <GSTCalculator />;
  }
}

// 1. P01: Billing Software - Realtime GST Calculator
function GSTCalculator() {
  const [items, setItems] = useState([
    { name: "Inventory Unit 1U", price: 1200 },
    { name: "POS Terminal License", price: 450 },
  ]);

  const addItem = () => {
    sound.click();
    const options = [
      { name: "Barcode Scanner Addon", price: 350 },
      { name: "Thermal Receipt Paper (x5)", price: 180 },
      { name: "Database Backup Tier", price: 500 },
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
        <span>RETAIL INVOICE & GST ENGINE</span>
        <button
          onClick={addItem}
          className="text-[#E11D48] dark:text-[#FF1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
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

// 2. P02: ScholarLink Hub - Academic Analytics Dashboard
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

// 3. P03: ChikkoShare - WebRTC P2P Transfer Simulator
function ChikkoShareSimulation() {
  const [progress, setProgress] = useState(100);
  const [isTransferring, setIsTransferring] = useState(false);

  const startTransfer = () => {
    sound.click();
    setIsTransferring(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTransferring(false);
          sound.match();
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>WEBRTC P2P & B2 CLOUD PIPE</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5" />
          ENCRYPTED
        </span>
      </div>

      <div className="space-y-4 py-2">
        <div className="p-3 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex items-center justify-between">
          <div>
            <div className="text-[#0F172A] dark:text-white font-bold">dataset_render_50gb.tar.gz</div>
            <div className="text-[10px] text-[#64748B]">Protocol: Direct WebRTC Chunk Stream</div>
          </div>
          <span className="text-[#E11D48] dark:text-[#FF1E1E] font-bold">48.2 MB/s</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-[#475569] dark:text-[#94A3B8]">
            <span>Transfer Progress</span>
            <span className="font-bold text-[#0F172A] dark:text-white">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E11D48] dark:from-[#FF1E1E] to-emerald-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={startTransfer}
        disabled={isTransferring}
        className="w-full py-2.5 rounded-lg bg-[#E11D48]/15 dark:bg-[#FF1E1E]/20 hover:bg-[#E11D48]/25 dark:hover:bg-[#FF1E1E]/30 border border-[#E11D48]/40 dark:border-[#FF1E1E]/60 text-[#E11D48] dark:text-white font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer active:scale-98 disabled:opacity-50"
      >
        {isTransferring ? "Streaming Chunks..." : "Simulate P2P Transfer →"}
      </button>
    </div>
  );
}

// 4. P04: Smart File Organizer - Categorization Simulation
function FileOrganizerSimulation() {
  const [categories, setCategories] = useState([
    { name: "Documents & PDFs", count: 18, size: "142 MB", color: "text-blue-500" },
    { name: "Images & Media", count: 42, size: "380 MB", color: "text-emerald-500" },
    { name: "Audio & Archives", count: 9, size: "89 MB", color: "text-amber-500" },
  ]);

  const organizeMore = () => {
    sound.click();
    setCategories((prev) => [
      { ...prev[0], count: prev[0].count + 2 },
      { ...prev[1], count: prev[1].count + 3 },
      { ...prev[2], count: prev[2].count + 1 },
    ]);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>AUTO-ORGANIZATION ENGINE</span>
        <button
          onClick={organizeMore}
          className="text-[#E11D48] dark:text-[#FF1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <FolderSync className="w-3.5 h-3.5" />
          <span>Ingest Files</span>
        </button>
      </div>

      <div className="space-y-2 py-1">
        {categories.map((c) => (
          <div
            key={c.name}
            className="p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FileCheck className={`w-3.5 h-3.5 ${c.color}`} />
              <span className="text-[#0F172A] dark:text-white font-medium">{c.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#475569] dark:text-[#94A3B8]">{c.count} files</span>
              <span className="text-[#0F172A] dark:text-white font-bold">{c.size}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-black/[0.03] dark:bg-white/5 rounded-lg text-center text-[#64748B] dark:text-[#94A3B8] text-[11px] flex items-center justify-center gap-2">
        <HardDrive className="w-3.5 h-3.5 text-[#E11D48] dark:text-[#FF1E1E]" />
        <span>Storage Analyzed: 611 MB (Auto-Sorted)</span>
      </div>
    </div>
  );
}

// 5. P05: Nexus Cart - E-Commerce Engine Simulation
function NexusCartSimulation() {
  const [cartCount, setCartCount] = useState(3);
  const [checkedOut, setCheckedOut] = useState(false);

  const addCart = () => {
    sound.click();
    setCartCount((c) => c + 1);
    setCheckedOut(false);
  };

  const checkout = () => {
    sound.match();
    setCheckedOut(true);
    setTimeout(() => {
      setCheckedOut(false);
      setCartCount(1);
    }, 2200);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>CHECKOUT & INVENTORY ENGINE</span>
        <button
          onClick={addCart}
          className="text-[#E11D48] dark:text-[#FF1E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add SKU</span>
        </button>
      </div>

      <div className="space-y-2 py-1">
        <div className="p-3 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
            <span className="text-[#0F172A] dark:text-white font-medium">Cart Pipeline:</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E11D48]/15 dark:bg-[#FF1E1E]/20 text-[#E11D48] dark:text-[#FF1E1E] font-bold">
            {cartCount} Items Active
          </span>
        </div>

        <div className="p-3 bg-black/[0.03] dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 space-y-1">
          <div className="flex justify-between text-[#64748B]">
            <span>Payment Gateway:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Stripe / Webhook</span>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Inventory Locks:</span>
            <span className="text-[#0F172A] dark:text-white font-semibold">Real-Time Sync</span>
          </div>
        </div>
      </div>

      <button
        onClick={checkout}
        className={`w-full py-2.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer ${
          checkedOut
            ? "bg-emerald-600 text-white"
            : "bg-[#E11D48]/15 dark:bg-[#FF1E1E]/20 hover:bg-[#E11D48]/25 dark:hover:bg-[#FF1E1E]/30 border border-[#E11D48]/40 dark:border-[#FF1E1E]/60 text-[#E11D48] dark:text-white"
        }`}
      >
        {checkedOut ? "Order Confirmed & Stock Deducted!" : "Simulate Cart Checkout →"}
      </button>
    </div>
  );
}

// 6. P06: Workflow Simulator (SyncTask / Mess Reduction)
function WorkflowSimulator() {
  const [stage, setStage] = useState(0);
  const stages = ["Submitted", "Warden Review", "Approved"];

  const advance = () => {
    sound.click();
    setStage((prev) => (prev + 1) % 3);
  };

  return (
    <div className="w-full h-full min-h-[330px] p-5 sm:p-6 bg-black/[0.03] dark:bg-black/40 rounded-xl flex flex-col justify-between border border-black/10 dark:border-white/10 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between text-[#64748B]">
        <span>WORKFLOW AUTOMATION PIPELINE</span>
        <span className="text-[#E11D48] dark:text-[#FF1E1E] font-semibold">ACTIVE STAGES</span>
      </div>

      <div className="py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between relative px-2">
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
          Pipeline Status:{" "}
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

// 7. P07: PLAYABLE 4-Bit Binary Logic Puzzle
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
