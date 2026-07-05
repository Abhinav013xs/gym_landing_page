"use client";

import { motion } from "framer-motion";
import { programs } from "@/lib/data";
import TiltCard from "@/components/TiltCard";
import {
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Trophy,
  Medal,
  Flame,
  Zap,
  Activity,
  UserCheck,
  Heart,
  Smile,
  Sparkles,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/* ── Icon map: maps string keys from data to actual Lucide components ── */
const iconMap: Record<string, LucideIcon> = {
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Trophy,
  Medal,
  Flame,
  Zap,
  Activity,
  UserCheck,
  Heart,
  Smile,
  Sparkles,
};

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

/* ===================================================================
 * Programs — Displays all available training programs in a
 * responsive card grid with gradient headers, icons, and 3D tilts.
 * =================================================================== */
export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="programs-heading"
    >
      {/* Background glow highlights */}
      <div className="glow-spot glow-red bottom-10 right-10 scale-150 opacity-10" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ── Section header ── */}
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-accent"
          >
            EXPLORE PROGRAMS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="programs-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-white md:text-5xl"
          >
            Programs Designed For You
          </motion.h2>
        </div>

        {/* ── Program cards grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon];

            return (
              <motion.div
                key={program.id}
                variants={cardVariants}
                custom={index}
                className="h-full"
              >
                <TiltCard className="h-full bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-accent/20">
                  {/* ── Gradient header with icon & title overlay ── */}
                  <div
                    className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${program.gradient}`}
                  >
                    {/* Large translucent background icon */}
                    {Icon ? (
                      <Icon
                        className="h-16 w-16 text-white/20 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : (
                      <Dumbbell
                        className="h-16 w-16 text-white/20 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}

                    {/* Title overlay with glass effect */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-5 py-3.5 backdrop-blur-sm border-t border-white/5">
                      <h3 className="font-heading text-base font-bold text-white tracking-wide">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Description — capped to 3 lines */}
                      <p className="text-sm leading-relaxed text-muted font-medium">
                        {program.description}
                      </p>
                    </div>

                    {/* Footer: duration + learn more */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      {/* Duration */}
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                        <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                        {program.duration}
                      </span>

                      {/* Learn more link */}
                      <a
                        href="#lead-form"
                        className="flex items-center gap-1 text-xs font-bold text-accent transition-colors hover:text-accent-light"
                        aria-label={`Enroll in ${program.title}`}
                      >
                        Enroll Now
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
