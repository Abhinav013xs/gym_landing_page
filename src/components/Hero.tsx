"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Star, Flame, Trophy, Award } from "lucide-react";
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
      className="flex flex-col items-center p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <span className="text-4xl md:text-5xl font-extrabold text-primary font-heading tracking-normal flex items-baseline">
        {count}
        <span className="text-accent ml-1 text-2xl md:text-3xl">{stat.suffix}</span>
      </span>
      <span className="text-muted text-[10px] md:text-xs font-extrabold tracking-widest uppercase mt-3">
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
    const nextSection = document.getElementById("social-proof");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background py-20"
    >
      {/* ── Background with dark gradient overlay ── */}
      <div className="absolute inset-0 img-placeholder-gym" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background"
        aria-hidden="true"
      />

      {/* ── Ambient Glow Lights (3D Luxury Gold atmosphere) ── */}
      <div className="glow-spot glow-gold top-1/4 left-1/4 scale-150" />
      <div className="glow-spot glow-crimson bottom-1/3 right-1/4 scale-125" />

      {/* ── 3D Floating Achievement Badges ── */}
      <motion.div
        className="absolute left-[5%] top-[25%] hidden xl:flex items-center gap-3.5 glass-premium border border-accent/20 px-6 py-4 rounded-2xl shadow-2xl z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8 },
        }}
      >
        <Star className="w-5 h-5 text-accent fill-accent" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">1000+ Happy Members</span>
      </motion.div>

      <motion.div
        className="absolute right-[5%] top-[28%] hidden xl:flex items-center gap-3.5 glass-premium border border-accent/20 px-6 py-4 rounded-2xl shadow-2xl z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{
          y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8 },
        }}
      >
        <Flame className="w-5 h-5 text-accent" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">500+ Transformations</span>
      </motion.div>

      <motion.div
        className="absolute left-[8%] bottom-[28%] hidden xl:flex items-center gap-3.5 glass-premium border border-accent/20 px-6 py-4 rounded-2xl shadow-2xl z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8 },
        }}
      >
        <Trophy className="w-5 h-5 text-accent" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">Certified Trainers</span>
      </motion.div>

      <motion.div
        className="absolute right-[8%] bottom-[25%] hidden xl:flex items-center gap-3.5 glass-premium border border-accent/20 px-6 py-4 rounded-2xl shadow-2xl z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.8 },
        }}
      >
        <Award className="w-5 h-5 text-accent" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">10+ Years Experience</span>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto flex-1 pt-32 pb-16">
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl font-black text-white font-heading leading-[1.18] tracking-normal"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Transform Your Body.
          <br />
          <span className="text-gold-gradient drop-shadow-[0_15px_35px_rgba(212,175,55,0.25)] font-black">
            Build Your Legacy.
          </span>
        </motion.h1>

        {/* Subheadline: 4 bullet points stacked beautifully with spacious margins */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-sm md:text-base text-muted font-heading font-bold mt-10 max-w-3xl mx-auto tracking-wider uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <span className="flex items-center gap-2">Premium Coaching</span>
          <span className="w-1.5 h-1.5 bg-accent rounded-full hidden sm:inline" />
          <span className="flex items-center gap-2">Personalized Training</span>
          <span className="w-1.5 h-1.5 bg-accent rounded-full hidden sm:inline" />
          <span className="flex items-center gap-2">Real Transformations</span>
          <span className="w-1.5 h-1.5 bg-accent rounded-full hidden sm:inline" />
          <span className="flex items-center gap-2">No Shortcuts</span>
        </motion.div>

        {/* Three CTA Buttons with increased margins */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14 w-full sm:w-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#pricing"
            className="w-full sm:w-auto bg-cta hover:bg-cta-dark text-white rounded-full px-12 py-4.5 font-display text-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center leading-none shadow-xl shadow-cta/35 cursor-pointer"
          >
            Join Today
          </a>
          <a
            href="#lead-form"
            className="w-full sm:w-auto border-2 border-accent text-accent hover:bg-accent/5 rounded-full px-12 py-4.5 font-display text-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center leading-none backdrop-blur-md cursor-pointer"
          >
            Book Free Trial
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto border-2 border-white/20 text-white hover:border-white hover:bg-white/5 rounded-full px-12 py-4.5 font-display text-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center leading-none backdrop-blur-md cursor-pointer"
          >
            Talk To A Coach
          </a>
        </motion.div>
      </div>

      {/* ── Statistics Row (matte glass deck layout with increased padding) ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mb-12" ref={statsRef}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-premium rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border border-white/5 shadow-2xl relative overflow-hidden"
        >
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
        className="relative z-10 flex flex-col items-center gap-2 mb-4 group cursor-pointer bg-transparent border-none focus:outline-none"
        aria-label="Scroll down to explore more"
      >
        <span className="text-muted text-[10px] font-extrabold tracking-widest uppercase group-hover:text-primary transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-muted animate-bounce group-hover:text-primary transition-colors mt-1" />
      </button>
    </section>
  );
}
