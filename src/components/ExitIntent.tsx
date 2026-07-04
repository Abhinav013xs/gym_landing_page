'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ArrowRight } from 'lucide-react';

/* ===================================================================
 * ExitIntent — "Wait! Don't Leave Yet!" Popup
 * Detects when the cursor approaches the top of the viewport (desktop
 * only) and shows a modal offering a free trial pass. Fires at most
 * once per session and only after a 5-second grace period.
 * =================================================================== */

const ExitIntent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');

  /** Close the popup */
  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  /** Handle "Claim" CTA click */
  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In production, send `email` to your backend / email service here.
    close();
  };

  useEffect(() => {
    // Skip on mobile
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    let timeoutReady = false;

    // 5-second grace period before arming the trigger
    const timer = setTimeout(() => {
      timeoutReady = true;
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      if (!timeoutReady || hasTriggered) return;

      // Cursor near the very top of the viewport → intent to leave
      if (e.clientY < 10) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasTriggered]);

  /* ── Backdrop animation variants ── */
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
  } as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-modal="true"
          role="dialog"
          aria-labelledby="exit-intent-heading"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 relative z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted hover:text-primary transition-colors p-1 rounded-full hover:bg-background"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Gift Icon */}
            <motion.div
              className="flex justify-center"
              initial={{ rotate: -15 }}
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Gift
                className="w-16 h-16 text-accent mx-auto"
                aria-hidden="true"
              />
            </motion.div>

            {/* Headline */}
            <h3
              id="exit-intent-heading"
              className="font-heading font-extrabold text-2xl text-primary text-center mt-4"
            >
              Wait! Don&apos;t Leave Yet!
            </h3>

            {/* Subtext */}
            <p className="text-muted text-center mt-2 leading-relaxed">
              Get a <span className="font-bold text-accent">FREE 3-Day Trial Pass</span>{' '}
              and a complimentary fitness assessment!
            </p>

            {/* Email Form */}
            <form onSubmit={handleClaim} className="mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-background rounded-xl px-4 py-3.5 w-full text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-300"
                required
                aria-label="Email address for free trial"
              />

              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white rounded-full w-full py-3.5 font-bold mt-3 flex items-center justify-center gap-2 transition-colors duration-300"
              >
                Claim My Free Trial
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>

            {/* Dismiss Link */}
            <p className="text-center mt-4">
              <button
                onClick={close}
                className="text-muted text-xs cursor-pointer underline hover:text-primary transition-colors"
                type="button"
              >
                No thanks, I don&apos;t want free fitness
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
