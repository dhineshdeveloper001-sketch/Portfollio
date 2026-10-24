import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Code2,
  Copy,
  Check,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Github } from "./GithubIcon";
import { identity } from "../data/portfolioData";
import { sound } from "../utils/sound";
import { showToast } from "./Toast";
import { MagneticButton } from "./MagneticButton";

type FormStatus = "idle" | "sending" | "success";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleCopyEmail = async () => {
    sound.click();
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopiedEmail(true);
      showToast("Email address copied to clipboard!", "success");
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleCopyPhone = async () => {
    sound.click();
    try {
      await navigator.clipboard.writeText(identity.phone);
      setCopiedPhone(true);
      showToast("Phone number copied to clipboard!", "success");
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      // fallback
    }
  };

  const triggerMailtoFallback = (reason?: string) => {
    const targetEmail = identity.email;
    const encodedSubject = encodeURIComponent(
      formData.subject?.trim() || `Inquiry from ${formData.name.trim()} (via Portfolio)`
    );
    const encodedBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoUrl;
    showToast(reason || "Opening default email client as fallback...", "info");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const accessKey =
      (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY ||
      "98cd4dcd-30b0-49b9-b0ff-f65fa23ec55e";

    if (!accessKey) {
      triggerMailtoFallback("Web3Forms key missing. Redirecting to email client...");
      return;
    }

    sound.pulse();
    setStatus("sending");

    try {
      const payload = {
        access_key: accessKey,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject?.trim() || `Portfolio Contact from ${formData.name.trim()}`,
        message: formData.message.trim(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        sound.match();
        setStatus("success");
        showToast("Message delivered successfully to Dhineshkumar!", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } else {
        throw new Error(result.message || "Web3Forms submission failed");
      }
    } catch (err) {
      console.warn("Web3Forms API failed, falling back to mailto:", err);
      triggerMailtoFallback("API dispatch failed. Opening email client directly...");
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 px-6 max-w-6xl mx-auto relative w-full"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-[#E11D48] dark:text-[#FF1E1E] uppercase tracking-widest mb-2">
          <span className="h-px w-6 bg-[#E11D48] dark:bg-[#FF1E1E]" />
          <span>07 // TRANSMISSION & INQUIRIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          Get in Touch
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Communication & Profile Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-2">
                Direct Line & Profiles
              </h3>
              <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                Open for software engineering roles, full-stack opportunities, and technical
                collaboration. Send a message directly or connect via GitHub/LeetCode.
              </p>
            </div>

            {/* Copy Email Button */}
            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-[#64748B]">DIRECT EMAIL</div>
                  <div className="text-xs sm:text-sm font-mono text-[#0F172A] dark:text-white truncate">
                    {identity.email}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-[#E11D48]/15 dark:hover:bg-[#FF1E1E]/20 text-[#334155] dark:text-[#CBD5E1] hover:text-[#E11D48] dark:hover:text-[#FF1E1E] border border-black/10 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 text-xs font-mono transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Copy Phone Button */}
            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#E11D48]/10 dark:bg-[#FF1E1E]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#E11D48] dark:text-[#FF1E1E]" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-[#64748B]">PHONE / WHATSAPP</div>
                  <div className="text-xs sm:text-sm font-mono text-[#0F172A] dark:text-white truncate">
                    {identity.phone}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-[#E11D48]/15 dark:hover:bg-[#FF1E1E]/20 text-[#334155] dark:text-[#CBD5E1] hover:text-[#E11D48] dark:hover:text-[#FF1E1E] border border-black/10 dark:border-white/10 hover:border-[#E11D48]/40 dark:hover:border-[#FF1E1E]/40 text-xs font-mono transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Copy phone to clipboard"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* External Profiles: GitHub and LeetCode */}
            <div className="pt-2 border-t border-black/5 dark:border-white/[0.08] flex flex-col gap-2.5">
              <a
                href={identity.github.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] border border-black/5 dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors" />
                  <span className="text-xs font-mono text-[#334155] dark:text-[#CBD5E1] group-hover:text-[#0F172A] dark:group-hover:text-white">
                    github.com/{identity.github.handle}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#64748B] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors">
                  ↗
                </span>
              </a>

              <a
                href={identity.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] border border-black/5 dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors" />
                  <span className="text-xs font-mono text-[#334155] dark:text-[#CBD5E1] group-hover:text-[#0F172A] dark:group-hover:text-white">
                    leetcode.com/{identity.leetcode.handle}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#64748B] group-hover:text-[#E11D48] dark:group-hover:text-[#FF1E1E] transition-colors">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Glass Panel Direct Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#0A0A0E]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E11D48] dark:text-[#FF1E1E]" />
              <span>Send Direct Message</span>
            </h3>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mb-6 font-mono">
              Direct dispatch to {identity.email}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#475569] dark:text-[#94A3B8] mb-1.5 uppercase font-medium"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-sm focus:border-[#E11D48] dark:focus:border-[#FF1E1E] focus:bg-white dark:focus:bg-white/[0.06] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#475569] dark:text-[#94A3B8] mb-1.5 uppercase font-medium"
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-sm focus:border-[#E11D48] dark:focus:border-[#FF1E1E] focus:bg-white dark:focus:bg-white/[0.06] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono text-[#475569] dark:text-[#94A3B8] mb-1.5 uppercase font-medium"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Project Inquiry / Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-sm focus:border-[#E11D48] dark:focus:border-[#FF1E1E] focus:bg-white dark:focus:bg-white/[0.06] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-[#475569] dark:text-[#94A3B8] mb-1.5 uppercase font-medium"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your requirements or say hello..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[#0F172A] dark:text-white placeholder-slate-400 dark:placeholder-white/20 text-sm focus:border-[#E11D48] dark:focus:border-[#FF1E1E] focus:bg-white dark:focus:bg-white/[0.06] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl bg-[#E11D48] dark:bg-[#FF1E1E] hover:bg-[#E11D48]/90 dark:hover:bg-[#FF1E1E]/90 text-white font-medium text-sm tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.3)] dark:shadow-[0_0_20px_rgba(255,30,30,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] dark:hover:shadow-[0_0_30px_rgba(255,30,30,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                      <span className="font-semibold text-emerald-100">Message Delivered!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
