import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle2, ArrowRight, Sparkles, Building2, Ruler,
  Calendar, MapPin, Phone, Mail, User, IndianRupee, MessageCircle, FileText
} from "lucide-react";
import { sendEnquiry } from "@/lib/sendEnquiry";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
}

const PROJECT_TYPES = [
  "Luxury Villa Construction",
  "Residential Interior Design",
  "Commercial & Office Space",
  "Turnkey Architecture & Build",
  "Apartment / Penthouse Interiors",
  "Complete Home Renovation",
];

const BUDGET_RANGES = [
  "Under ₹15 Lakhs",
  "₹15 – 35 Lakhs",
  "₹35 – 75 Lakhs",
  "₹75 Lakhs – 1.5 Crore",
  "₹1.5 Crore – 3 Crore",
  "₹3 Crore+ (Ultra Luxury)",
];

const TIMELINES = [
  "Immediate (Within 1 Month)",
  "1 – 3 Months",
  "3 – 6 Months",
  "Planning Phase (6+ Months)",
];

export function QuoteModal({ isOpen, onClose, defaultProjectType }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    projectType: defaultProjectType || PROJECT_TYPES[0],
    areaSqFt: "",
    budget: BUDGET_RANGES[1],
    timeline: TIMELINES[0],
    notes: "",
  });

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      projectType: formData.projectType,
      areaSqFt: formData.areaSqFt,
      budget: formData.budget,
      timeline: formData.timeline,
      notes: formData.notes,
      source: "Quote Request Modal",
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `*New Quote Request — Moon Construction & Interiors*\n\n` +
      `*Name:* ${formData.name || "N/A"}\n` +
      `*Phone:* ${formData.phone || "N/A"}\n` +
      `*Email:* ${formData.email || "N/A"}\n` +
      `*Location:* ${formData.location || "N/A"}\n` +
      `*Project Type:* ${formData.projectType}\n` +
      `*Area:* ${formData.areaSqFt ? formData.areaSqFt + " Sq. Ft" : "N/A"}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Timeline:* ${formData.timeline}\n` +
      (formData.notes ? `*Notes:* ${formData.notes}\n` : "")
    );
    window.open(`https://wa.me/919000169145?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0e1424] text-white border border-[color:var(--gold)]/40 shadow-[0_20px_70px_rgba(0,0,0,0.8)] z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            {/* Top Gold Accent Bar */}
            <div className="h-1.5 w-full shrink-0" style={{ background: "var(--gradient-gold)" }} />

            {/* Header */}
            <div className="relative px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
              <button
                onClick={onClose}
                aria-label="Close quote modal"
                className="absolute top-6 right-6 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Bespoke Estimate &amp; Consultation</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Request a Custom Quote
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
                Fill in your project specifications below. Our senior architects and interior project leads will prepare a detailed cost and timeline breakdown for you.
              </p>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 flex-grow custom-scrollbar">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full grid place-items-center shadow-lg" style={{ background: "var(--gradient-gold)" }}>
                    <CheckCircle2 className="h-9 w-9 text-[#0e1424]" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-display text-2xl font-bold text-white">Quote Request Received!</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Thank you, <span className="text-gold font-semibold">{formData.name || "valued client"}</span>. Our architectural estimating team has logged your enquiry for a <span className="text-white font-medium">{formData.projectType}</span>.
                    </p>
                    <p className="text-white/60 text-xs">
                      We will review your requirements and reach out via phone ({formData.phone || "provided number"}) within 24 hours.
                    </p>
                  </div>

                  {/* WhatsApp Quick Connect */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto space-y-3">
                    <div className="text-xs text-white/70 font-medium">Want an immediate instant response?</div>
                    <button
                      type="button"
                      onClick={handleWhatsAppQuote}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition shadow-md cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" /> Send directly via WhatsApp to Principal Architect
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="btn-gold btn-gold-hover !py-2.5 !px-8 !text-sm cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Project Scope */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> 1. Project Specifications
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Project Type */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">Project Type *</span>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        >
                          {PROJECT_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-[#0e1424] text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Approx Area */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">Approx. Area (Sq. Ft) *</span>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. 2,400"
                            value={formData.areaSqFt}
                            onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                            className="w-full rounded-xl bg-white/5 border border-white/20 p-3 pr-16 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                          />
                          <span className="absolute right-3 top-3 text-[11px] uppercase font-semibold text-white/50 tracking-wider">
                            Sq. Ft
                          </span>
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1">
                          <IndianRupee className="h-3 w-3 text-gold" /> Estimated Budget *
                        </span>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        >
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b} className="bg-[#0e1424] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Timeline */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gold" /> Target Timeline *
                        </span>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        >
                          {TIMELINES.map((t) => (
                            <option key={t} value={t} className="bg-[#0e1424] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Location & Client Details */}
                  <div className="pt-2 border-t border-white/10">
                    <label className="block text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> 2. Contact &amp; Location Details
                    </label>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">Full Name *</span>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">Phone Number *</span>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">Email Address *</span>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        />
                      </div>

                      {/* Project Location */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gold" /> Site Location / City *
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Madhapur, Hyderabad"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 flex items-center gap-1">
                      <FileText className="h-3 w-3 text-gold" /> Specific Ideas or Requirements (Optional)
                    </span>
                    <textarea
                      rows={2}
                      placeholder="e.g. Italian marble flooring, modular kitchen with island, home theatre, contemporary exterior elevation..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl bg-white/5 border border-white/20 p-3 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleWhatsAppQuote}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" /> Share via WhatsApp
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto btn-gold btn-gold-hover !py-3 !px-8 !text-xs cursor-pointer shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending Request..." : <>Submit Quote Request <ArrowRight className="h-4 w-4" /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
