"use client";

import { motion } from "framer-motion";
import { whyChooseUs } from "@/lib/data";
import TiltCard from "@/components/TiltCard";
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
} from "lucide-react";

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
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="section-padding bg-surface-dark relative overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="glow-spot glow-gold top-1/2 left-0 -translate-y-1/2 scale-125 opacity-10" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ── Section header ── */}
        <div className="mb-20 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-accent"
          >
            OUR ADVANTAGE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="why-choose-us-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl"
          >
            Why Choose Us
          </motion.h2>
        </div>

        {/* ── Feature grid with expanded gaps ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                custom={index}
                className="h-full"
              >
                <TiltCard className="h-full bg-background/50 border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg transition-colors hover:border-accent/25 min-h-[280px] justify-center">
                  {/* Icon container */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 transition-transform duration-300 group-hover:scale-110">
                    {Icon ? (
                      <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                    ) : (
                      <Dumbbell className="h-7 w-7 text-accent" aria-hidden="true" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 font-heading text-lg font-bold text-white transition-colors group-hover:text-accent tracking-wide">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted font-medium">
                    {item.description}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
