"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Dumbbell, Shield, Trophy } from "lucide-react";
import { heroStats, type Stat } from "@/lib/data";

/* ─────────────────────── Animated Counter ─────────────────────── */

function useCountUp(target: number, duration: number = 2000, start: boolean = false): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

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
      className="flex flex-col items-center p-4 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* 3D glow hover underlay */}
      <div className="absolute inset-0 bg-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <span className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-tight flex items-baseline">
        {count}
        <span className="text-accent ml-0.5 text-2xl md:text-3xl">{stat.suffix}</span>
      </span>
      <span className="text-white/60 text-xs md:text-sm font-semibold tracking-wider uppercase mt-2">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════ Hero Section ═══════════════════════════ */

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const handleScrollDown = useCallback(() => {
    const nextSection = document.getElementById("trust-badges");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
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
        className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background"
        aria-hidden="true"
      />

      {/* ── Ambient Glow Lights (3D Neon atmosphere) ── */}
      <div className="glow-spot glow-red top-1/4 left-1/4 scale-150" />
      <div className="glow-spot glow-orange bottom-1/3 right-1/4 scale-125" />

      {/* ── 3D Floating Particle Elements ── */}
      <motion.div
        className="absolute left-[10%] top-[25%] hidden md:block opacity-40 hover:opacity-85 transition-opacity"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="shape-dumbbell shadow-2xl" />
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[30%] hidden md:block opacity-35 hover:opacity-80 transition-opacity"
        animate={{
          y: [0, 18, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-16 h-16 border-8 border-white/5 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-accent/25 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[15%] bottom-[25%] hidden md:block opacity-25 hover:opacity-75 transition-opacity"
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Trophy className="w-12 h-12 text-white/20" />
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto flex-1 pt-24">
        {/* Outline Typography Headline */}
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white font-heading leading-tight tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-outline uppercase tracking-wider block text-3xl md:text-5xl mb-4 font-bold">
            Premium Fitness Club
          </span>
          Transform Your Body.
          <br />
          <span className="gradient-text drop-shadow-[0_10px_30px_rgba(229,57,53,0.3)]">Your Life.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Join hundreds of members who achieved real fitness results with expert
          coaching, custom nutrition, and state-of-the-art machinery.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 mt-10 w-full sm:w-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#pricing"
            className="bg-accent hover:bg-accent-dark text-white rounded-full px-10 py-4.5 font-heading font-bold text-lg animate-pulse-glow transition-all duration-300 hover:scale-105 active:scale-95 text-center shadow-lg shadow-accent/35"
            aria-label="Join Now — view pricing plans"
          >
            Join Now
          </a>
          <a
            href="#lead-form"
            className="border-2 border-white/20 text-white hover:border-white hover:bg-white/5 rounded-full px-10 py-4.5 font-heading font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center backdrop-blur-md"
            aria-label="Book a free trial session"
          >
            Book Free Trial
          </a>
        </motion.div>
      </div>

      {/* ── Statistics Row (Layered Glassmorphic Panel) ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 mb-16" ref={statsRef}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-premium rounded-3xl p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inside gradient highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-white/5 pointer-events-none" />
          
          {heroStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={statsInView}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={handleScrollDown}
        className="relative z-10 flex flex-col items-center gap-2 mb-8 group cursor-pointer bg-transparent border-none focus:outline-none"
        aria-label="Scroll down to explore more"
      >
        <span className="text-white/40 text-xs font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-white/40 animate-bounce group-hover:text-white/70 transition-colors mt-1" />
      </button>
    </section>
  );
}
