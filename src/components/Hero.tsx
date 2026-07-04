'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroStats, type Stat } from '@/lib/data';

/* ─────────────────────── Animated Counter ─────────────────────── */

/**
 * Custom hook that counts from 0 to `target` over `duration` ms
 * using requestAnimationFrame for buttery-smooth animation.
 * Only starts counting when `start` is true (tied to useInView).
 */
function useCountUp(target: number, duration: number = 2000, start: boolean = false): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when not in view
    if (!start) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, start]);

  return count;
}

/* ─────────────────────── Single Stat Card ─────────────────────── */

interface StatCardProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const count = useCountUp(stat.value, 2000, isInView);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <span className="text-3xl md:text-4xl font-extrabold text-white">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </span>
      <span className="text-white/60 text-sm mt-1">{stat.label}</span>
    </motion.div>
  );
}

/* ═══════════════════════ Hero Section ═══════════════════════════ */

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  /**
   * Smooth-scroll to the next section when the user clicks
   * the scroll indicator at the bottom.
   */
  const handleScrollDown = useCallback(() => {
    const nextSection = document.getElementById('trust-badges');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background with dark gradient overlay ── */}
      <div className="absolute inset-0 img-placeholder-gym" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"
        aria-hidden="true"
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto flex-1">
        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Body.
          <br />
          <span className="gradient-text">Your Life.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join hundreds of members who achieved real fitness results with expert
          coaching and personalized training.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="#pricing"
            className="bg-accent hover:bg-accent-dark text-white rounded-full px-8 py-4 font-bold text-lg animate-pulse-glow transition-colors duration-300"
            aria-label="Join Now — view pricing plans"
          >
            Join Now
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-8 py-4 font-bold text-lg transition-colors duration-300"
            aria-label="Book a free trial session"
          >
            Book Free Trial
          </a>
        </motion.div>
      </div>

      {/* ── Statistics Row ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mb-16" ref={statsRef}>
        <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {heroStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={statsInView}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={handleScrollDown}
        className="relative z-10 flex flex-col items-center gap-2 mb-8 group cursor-pointer bg-transparent border-none"
        aria-label="Scroll down to explore more"
      >
        <span className="text-white/50 text-sm tracking-wide group-hover:text-white/70 transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce group-hover:text-white/70 transition-colors" />
      </button>
    </section>
  );
}
