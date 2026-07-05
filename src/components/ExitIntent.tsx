"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

/* ===== Animation Variants ===== */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 25 },
  },
  exit: { scale: 0.9, opacity: 0, y: 50, transition: { duration: 0.2 } },
} as const;

const ExitIntent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [hasShown, setHasShown] = useState<boolean>(false);

  /* --- Open the popup --- */
  const show = useCallback(() => {
    setIsVisible(true);
    // Prevent background scroll while open
    document.body.style.overflow = "hidden";
  }, []);

  /* --- Close the popup --- */
  const close = useCallback(() => {
    setIsVisible(false);
    document.body.style.overflow = "";
  }, []);

  /* --- Check cursor leaving the top viewport bounds --- */
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // clientY < 10 matches cursor departing the top window edge
      if (e.clientY < 10 && !hasShown) {
        show();
        setHasShown(true);
        localStorage.setItem("exit-intent-shown", "true");
      }
    },
    [hasShown, show]
  );

  useEffect(() => {
    // If user has already dismissed it in the past, skip
    const isDismissed = localStorage.getItem("exit-intent-shown");
    if (isDismissed === "true") {
      setHasShown(true);
      return;
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  /* --- Submit and claim pass --- */
  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    close();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#D4AF37", "#E53935", "#FFFFFF"],
    });

    // Auto-fill form email if user goes to form later
    sessionStorage.setItem("claimed-email", email);
    
    // Redirect user to lead form to finish booking
    const leadSection = document.getElementById("lead-form");
    if (leadSection) {
      leadSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className="bg-surface border border-white/5 text-white rounded-3xl p-8 sm:p-10 max-w-md w-full mx-4 relative z-10 shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
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
                className="w-14 h-14 text-accent mx-auto"
                aria-hidden="true"
              />
            </motion.div>

            {/* Headline */}
            <h3
              id="exit-intent-heading"
              className="font-heading font-extrabold text-2xl text-center mt-5 tracking-tight"
            >
              Wait! Don&apos;t Leave Yet!
            </h3>

            {/* Subtext */}
            <p className="text-muted text-center mt-2.5 text-sm leading-relaxed font-semibold">
              Get a <span className="font-bold text-accent">FREE 3-Day Trial Pass</span>{" "}
              and a complimentary body composition scan!
            </p>

            {/* Email Form */}
            <form onSubmit={handleClaim} className="mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-background border border-white/5 rounded-xl px-4 py-3.5 w-full text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/45 transition-colors duration-300 text-sm font-semibold"
                required
                aria-label="Email address for free trial"
              />

              <button
                type="submit"
                className="bg-cta hover:bg-cta-dark text-white font-display text-2xl uppercase tracking-wider rounded-full w-full py-3.5 mt-3 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md shadow-cta/25 cursor-pointer leading-none"
              >
                Claim My Free Trial
                <ArrowRight className="w-4.5 h-4.5" aria-hidden="true" />
              </button>
            </form>

            {/* Dismiss Link */}
            <p className="text-center mt-5">
              <button
                onClick={close}
                className="text-muted text-xs cursor-pointer underline hover:text-white transition-colors font-semibold"
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
