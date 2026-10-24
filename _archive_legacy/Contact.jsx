import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Send, Check, Mail, Phone, Code2, Copy, Terminal, MapPin, Loader2 } from 'lucide-react';
import BracketTitle from './BracketTitle';
import { playClickSound, playNotificationSound } from '../utils/soundEffects';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    playClickSound();
    setStatus('submitting');

    try {
      const data = new FormData();
      data.append("access_key", "98cd4dcd-30b0-49b9-b0ff-f65fa23ec55e");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject || "Full Stack Portfolio Inquiry");
      data.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const res = await response.json();

      if (res.success) {
        playNotificationSound();
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error(res.message || "Submission failed");
      }
    } catch (err) {
      console.error("Web3Forms Submit Error:", err);
      // Fallback to mailto
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setStatus('idle');
    }
  };

  return (
    <div className="w-full space-y-8 font-body">
      {/* Section Header */}
      <div className="space-y-2">
        <BracketTitle subtitle="Inquiries & Opportunities">
          Get in Touch
        </BracketTitle>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          Open to full-time Software Engineer, Java Full Stack, and GenAI roles. Reach out via email or send a message directly below.
        </p>
      </div>

      {/* Clean 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2 border-t border-white/[0.08] items-start">
        
        {/* Left Column: Direct Communication Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3">
            {/* Email */}
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 truncate">
                <Mail className="w-4 h-4 text-[#00d4ff] shrink-0" />
                <div className="truncate">
                  <span className="text-[0.68rem] font-mono text-slate-500 block">Email Address</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm text-white hover:text-[#00d4ff] transition-colors truncate block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] flex items-center gap-3 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#00d4ff] shrink-0" />
              <div>
                <span className="text-[0.68rem] font-mono text-slate-500 block">Phone</span>
                <span className="text-xs sm:text-sm text-white">{personalInfo.phone}</span>
              </div>
            </a>

            {/* GitHub & LeetCode */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] flex items-center gap-2.5 transition-colors"
              >
                <Code2 className="w-4 h-4 text-white shrink-0" />
                <div>
                  <span className="text-[0.62rem] font-mono text-slate-500 block">Code</span>
                  <span className="text-xs text-white font-medium">GitHub</span>
                </div>
              </a>

              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15] flex items-center gap-2.5 transition-colors"
              >
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[0.62rem] font-mono text-slate-500 block">DSA</span>
                  <span className="text-xs text-white font-medium">LeetCode</span>
                </div>
              </a>
            </div>

            {/* Location */}
            <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-[#ff1e42] shrink-0" />
              <span>Srirangam, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form (7 Cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 glass-card p-6 sm:p-7 space-y-4 rounded-2xl bg-[#0c0e14]/80 border-white/[0.1]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-mono text-slate-300">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00d4ff] text-white placeholder-slate-600 text-xs sm:text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-mono text-slate-300">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00d4ff] text-white placeholder-slate-600 text-xs sm:text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="subject" className="text-xs font-mono text-slate-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Opportunity / Project Inquiry"
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00d4ff] text-white placeholder-slate-600 text-xs sm:text-sm outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-xs font-mono text-slate-300">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              required
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#00d4ff] text-white placeholder-slate-600 text-xs sm:text-sm outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary w-full py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default React.memo(Contact);
