'use client';

import { motion } from 'framer-motion';
import { programs } from '@/lib/data';
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
} from 'lucide-react';

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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

/* ===================================================================
 * Programs — Displays all available training programs in a
 * responsive card grid with gradient headers, icons, and metadata.
 * =================================================================== */
export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding bg-background"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            EXPLORE PROGRAMS
          </p>
          <h2
            id="programs-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Programs Designed For You
          </h2>
        </div>

        {/* ── Program cards grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon];

            return (
              <motion.div
                key={program.id}
                className="group card-hover overflow-hidden rounded-3xl bg-white shadow-sm"
                variants={cardVariants}
                custom={index}
              >
                {/* ── Gradient header with icon & title overlay ── */}
                <div
                  className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${program.gradient}`}
                >
                  {/* Large translucent background icon */}
                  {Icon ? (
                    <Icon
                      className="h-20 w-20 text-white/20"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ) : (
                    <Dumbbell
                      className="h-20 w-20 text-white/20"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}

                  {/* Title overlay with glass effect */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/30 px-4 py-3 backdrop-blur-sm">
                    <h3 className="font-heading text-lg font-bold text-white">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="p-6">
                  {/* Program title (visible text for accessibility) */}
                  <h3 className="font-heading text-xl font-bold text-primary">
                    {program.title}
                  </h3>

                  {/* Description — capped to 3 lines */}
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {program.description}
                  </p>

                  {/* Footer: duration + learn more */}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    {/* Duration */}
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {program.duration}
                    </span>

                    {/* Learn more link */}
                    <button
                      type="button"
                      className="flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
                      aria-label={`Learn more about ${program.title}`}
                    >
                      Learn More
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
