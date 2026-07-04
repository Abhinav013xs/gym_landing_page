'use client';

import { motion } from 'framer-motion';
import { whyChooseUs } from '@/lib/data';
import {
  GraduationCap,
  ClipboardList,
  Salad,
  HeartHandshake,
  Dumbbell,
  Activity,
  TrendingDown,
  TrendingUp,
  Zap,
  Flame,
  Trophy,
  Target,
  type LucideIcon,
} from 'lucide-react';

/* ── Icon map: maps string keys from data to actual Lucide components ── */
const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  ClipboardList,
  Salad,
  HeartHandshake,
  Dumbbell,
  Activity,
  TrendingDown,
  TrendingUp,
  Zap,
  Flame,
  Trophy,
  Target,
};

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

/* ===================================================================
 * WhyChooseUs — Highlights the gym's competitive advantages in a
 * responsive grid of animated cards with themed icons.
 * =================================================================== */
export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="section-padding bg-white"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            OUR ADVANTAGE
          </p>
          <h2
            id="why-choose-us-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Why Choose Us
          </h2>
        </div>

        {/* ── Feature grid ── */}
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.div
                key={item.id}
                className="card-hover rounded-2xl bg-background p-6 text-center"
                variants={cardVariants}
                custom={index}
              >
                {/* Icon container */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  {Icon ? (
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  ) : (
                    <Dumbbell className="h-6 w-6 text-accent" aria-hidden="true" />
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-4 font-heading text-base font-bold text-primary">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
