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
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="programs-heading"
    >
      <div className="glow-spot glow-gold bottom-10 right-10 scale-150 opacity-10" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ── Section header ── */}
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-accent"
          >
            EXPLORE PROGRAMS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="programs-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl"
          >
            Programs Designed For You
          </motion.h2>
        </div>

        {/* ── Program cards grid with expanded gaps ── */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
                <TiltCard className="h-full bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-accent/20 min-h-[380px]">
                  {/* ── Gradient header with icon & title overlay ── */}
                  <div
                    className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${program.gradient}`}
                  >
                    {/* Large translucent background icon */}
                    {Icon ? (
                      <Icon
                        className="h-20 w-20 text-white/20 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : (
                      <Dumbbell
                        className="h-20 w-20 text-white/20 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}

                    {/* Title overlay with glass effect */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/45 px-6 py-4.5 backdrop-blur-sm border-t border-white/5">
                      <h3 className="font-heading text-base font-bold text-white tracking-wide">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Card body with expanded padding ── */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-sm leading-relaxed text-muted font-medium">
                        {program.description}
                      </p>
                    </div>

                    {/* Footer: duration + learn more */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      {/* Duration */}
                      <span className="flex items-center gap-2 text-xs font-semibold text-muted">
                        <Clock className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
                        {program.duration}
                      </span>

                      {/* Learn more link */}
                      <a
                        href="#lead-form"
                        className="flex items-center gap-1.5 text-xs font-extrabold text-accent transition-colors hover:text-accent-light uppercase tracking-wider"
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
