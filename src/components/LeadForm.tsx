"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  User,
  Phone as PhoneIcon,
  Mail,
  Target,
  Scale,
  Clock,
  MessageSquare,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

/* ===================================================================
 * LeadForm — Your Transformation Starts Today
 * Spacious, matte charcoal layout with validated inputs.
 * =================================================================== */

interface FormData {
  name: string;
  phone: string;
  email: string;
  goal: string;
  weight: string;
  time: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  goal?: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  goal: "",
  weight: "",
  time: "",
  message: "",
};

const fitnessGoals = [
  "Weight Loss Focus",
  "Muscle Gain Split",
  "Strength Training",
  "Bodybuilding Elite",
  "CrossFit Performance",
  "HIIT Conditioning",
];

const preferredTimes = [
  "Morning 5:00 AM - 9:00 AM",
  "Mid-Morning 9:00 AM - 12:00 PM",
  "Afternoon 12:00 PM - 4:00 PM",
  "Evening 4:00 PM - 8:00 PM",
  "Night 8:00 PM - 11:00 PM",
];

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.goal) {
      newErrors.goal = "Please select a fitness goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      setIsSubmitting(false);
      setFormData(initialFormData);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#E53935", "#FFFFFF"],
      });
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="lead-form"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="lead-heading"
    >
      <div className="glow-spot glow-gold bottom-1/4 left-1/3 scale-125 opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="glass-premium rounded-3xl border border-white/5 p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Internal gradient decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-white/5 pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-12">
            <span className="text-accent font-bold text-sm tracking-[0.25em] uppercase">
              Start Today
            </span>
            <h2
              id="lead-heading"
              className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-4"
            >
              Your Transformation <span className="gradient-text">Starts Today.</span>
            </h2>
            <p className="text-muted text-sm mt-4 font-medium max-w-lg mx-auto leading-relaxed">
              Book your complimentary 1-day pass. Includes InBody body composition scan and custom consultation.
            </p>
          </div>

          {isSuccess ? (
            /* ── Success State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
              >
                <CheckCircle className="w-16 h-16 text-success mx-auto" aria-hidden="true" />
              </motion.div>

              <h3 className="font-heading font-extrabold text-2xl text-white mt-6">
                Reservation Confirmed!
              </h3>
              <p className="text-muted text-sm mt-4 max-w-sm mx-auto leading-relaxed font-semibold">
                Our coaching staff will contact you within 30 minutes to finalize your schedule.
              </p>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white rounded-full px-10 py-4.5 font-bold mt-10 transition-colors duration-300 shadow-md shadow-cta/25 cursor-pointer"
              >
                <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                Call Coaching Desk
              </a>
            </motion.div>
          ) : (
            /* ── Form Inputs with Expanded Spacing ── */
            <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full transition-colors duration-300 text-sm font-semibold"
                      required
                    />
                  </div>
                  {errors.name && <span className="text-cta text-xs font-bold mt-2">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Phone Number <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full transition-colors duration-300 text-sm font-semibold"
                      required
                    />
                  </div>
                  {errors.phone && <span className="text-cta text-xs font-bold mt-2">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full transition-colors duration-300 text-sm font-semibold"
                      required
                    />
                  </div>
                  {errors.email && <span className="text-cta text-xs font-bold mt-2">{errors.email}</span>}
                </div>

                {/* Fitness Goal */}
                <div className="flex flex-col">
                  <label htmlFor="goal" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Fitness Goal <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full appearance-none cursor-pointer transition-colors duration-300 text-sm font-semibold"
                      required
                    >
                      <option value="" disabled className="text-white/30 bg-surface">Select a goal</option>
                      {fitnessGoals.map((g) => (
                        <option key={g} value={g} className="text-white bg-surface">{g}</option>
                      ))}
                    </select>
                  </div>
                  {errors.goal && <span className="text-cta text-xs font-bold mt-2">{errors.goal}</span>}
                </div>

                {/* Current Weight (Optional) */}
                <div className="flex flex-col">
                  <label htmlFor="weight" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Current Weight (kg) <span className="text-muted-light font-medium">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="70"
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full transition-colors duration-300 text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Preferred Time (Optional) */}
                <div className="flex flex-col">
                  <label htmlFor="time" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Preferred Time <span className="text-muted-light font-medium">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full appearance-none cursor-pointer transition-colors duration-300 text-sm font-semibold"
                    >
                      <option value="" disabled className="text-white/30 bg-surface">Select a slot</option>
                      {preferredTimes.map((t) => (
                        <option key={t} value={t} className="text-white bg-surface">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Message */}
                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-widest text-muted mb-3">
                    Additional Context <span className="text-muted-light font-medium">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-white/30 w-5 h-5 pointer-events-none" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your fitness baseline or target goals..."
                      rows={4}
                      className="bg-background border border-white/5 focus:border-accent/40 rounded-xl text-white placeholder:text-white/20 focus:ring-1 focus:ring-accent/45 outline-none pl-12 pr-4 py-4 w-full resize-none transition-colors duration-300 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button & Disclaimer */}
              <div className="mt-10 flex flex-col items-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cta hover:bg-cta-dark text-white rounded-full px-12 py-5 font-heading font-extrabold text-sm uppercase tracking-widest w-full md:w-auto flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg shadow-cta/25 cursor-pointer animate-pulse-glow"
                  aria-label="Submit free trial pass form"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Verifying Pass…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Claim My Free Trial
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 mt-5 text-xs text-muted/75 font-bold tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  <span>No Spam. We&apos;ll contact you within 30 minutes.</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
