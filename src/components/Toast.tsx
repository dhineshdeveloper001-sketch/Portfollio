import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type?: "success" | "error" | "info";
}

let toastListener: ((toast: ToastMessage) => void) | null = null;

export function showToast(text: string, type: "success" | "error" | "info" = "success") {
  if (toastListener) {
    toastListener({ id: Math.random().toString(), text, type });
  }
}

export function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastListener = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto px-4 py-3 rounded-xl backdrop-blur-xl border shadow-xl text-xs font-mono flex items-center gap-2.5 ${
              t.type === "error"
                ? "bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800/60 text-rose-800 dark:text-rose-200"
                : "bg-white/95 dark:bg-[#0A0A0E]/95 border-emerald-500/30 dark:border-emerald-500/40 text-[#0F172A] dark:text-[#F8FAFC]"
            }`}
          >
            {t.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            )}
            <span className="leading-snug">{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
