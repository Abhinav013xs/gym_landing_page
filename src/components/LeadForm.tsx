'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  User,
  Phone,
  Mail,
  Target,
  Scale,
  Clock,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';

/* ===================================================================
 * LeadForm — Book Your Free Trial
 * Dark-section lead-gen form with glassmorphism card, client-side
 * validation, loading simulation, confetti celebration on success.
 * =================================================================== */

/** Shape of the form data */
interface FormData {
  name: string;
  phone: string;
  email: string;
  goal: string;
  weight: string;
  time: string;
  message: string;
}

/** Shape of validation errors (keys mirror FormData) */
interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  goal?: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  goal: '',
  weight: '',
  time: '',
  message: '',
};

/** Fitness goal dropdown options */
const fitnessGoals = [
  'Weight Loss',
  'Weight Gain',
  'Muscle Building',
  'General Fitness',
  'Strength Training',
];

/** Preferred time dropdown options */
const preferredTimes = [
  'Morning 6-9 AM',
  'Mid-Morning 9-12 PM',
  'Afternoon 12-3 PM',
  'Evening 4-7 PM',
  'Night 7-10 PM',
];

const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* ── Helpers ── */

  /** Update a single field */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /** Validate required fields — returns true when valid */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.goal) {
      newErrors.goal = 'Please select a fitness goal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Handle form submission */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // 🎉 Confetti celebration
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1500);
  };

  /* ── Reusable field wrapper ── */
  const InputWrapper = ({
    children,
    label,
    error,
    className = '',
  }: {
    children: React.ReactNode;
    label: string;
    error?: string;
    className?: string;
  }) => (
    <div className={className}>
      <label className="block text-white/70 text-sm font-medium mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );

  /* ──────────────────────────── Render ──────────────────────────── */

  return (
    <section
      id="lead-form"
      className="section-padding bg-primary"
      aria-labelledby="lead-form-heading"
    >
      <div className="max-w-2xl mx-auto">
        {/* ───────── Section Header ───────── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold text-sm tracking-widest uppercase">
            Take The First Step
          </span>
          <h2
            id="lead-form-heading"
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mt-3"
          >
            Book Your Free Trial
          </h2>
        </motion.div>

        {/* ───────── Form Card ───────── */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {isSuccess ? (
            /* ── Success State ── */
            <motion.div
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                  delay: 0.15,
                }}
              >
                <CheckCircle
                  className="w-20 h-20 text-success mx-auto"
                  aria-hidden="true"
                />
              </motion.div>

              <h3 className="font-heading font-extrabold text-3xl text-white mt-6">
                Thank You!
              </h3>
              <p className="text-white/70 mt-3 max-w-sm mx-auto leading-relaxed">
                Our team will contact you within 24 hours to schedule your free
                trial session.
              </p>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-full px-8 py-3.5 font-bold mt-8 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Us Now
              </a>
            </motion.div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <InputWrapper label="Full Name" error={errors.name}>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full transition-colors duration-300"
                      required
                      minLength={2}
                    />
                  </div>
                </InputWrapper>

                {/* Phone */}
                <InputWrapper label="Phone" error={errors.phone}>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full transition-colors duration-300"
                      required
                    />
                  </div>
                </InputWrapper>

                {/* Email */}
                <InputWrapper label="Email" error={errors.email}>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full transition-colors duration-300"
                      required
                    />
                  </div>
                </InputWrapper>

                {/* Fitness Goal */}
                <InputWrapper label="Fitness Goal" error={errors.goal}>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full appearance-none cursor-pointer transition-colors duration-300"
                      required
                    >
                      <option value="" disabled className="text-primary">
                        Select a goal
                      </option>
                      {fitnessGoals.map((goal) => (
                        <option key={goal} value={goal} className="text-primary">
                          {goal}
                        </option>
                      ))}
                    </select>
                  </div>
                </InputWrapper>

                {/* Current Weight */}
                <InputWrapper label="Current Weight (kg)">
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="70"
                      min={20}
                      max={300}
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full transition-colors duration-300"
                    />
                  </div>
                </InputWrapper>

                {/* Preferred Time */}
                <InputWrapper label="Preferred Time">
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full appearance-none cursor-pointer transition-colors duration-300"
                    >
                      <option value="" disabled className="text-primary">
                        Select a time
                      </option>
                      {preferredTimes.map((t) => (
                        <option key={t} value={t} className="text-primary">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </InputWrapper>

                {/* Message — spans full width */}
                <InputWrapper label="Message" className="md:col-span-2">
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-white/40 w-5 h-5 pointer-events-none" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your fitness goals..."
                      rows={3}
                      className="bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none pl-12 pr-4 py-3.5 w-full resize-none transition-colors duration-300"
                    />
                  </div>
                </InputWrapper>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-dark text-white rounded-full px-10 py-4 font-bold text-lg w-full md:w-auto flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed animate-pulse-glow"
                  aria-label="Submit free trial form"
                >
                  {isSubmitting ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Book Free Trial
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
