"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Dumbbell,
  Apple,
  Users,
  Clock,
  BadgeIndianRupee,
  type LucideIcon,
} from "lucide-react";
import { trustBadges, type TrustBadge } from "@/lib/data";

/* ── Icon Map ───────────────────────────────────────────────────── */

const iconMap: Record<string, LucideIcon> = {
  Award,
  Dumbbell,
  Apple,
  Users,
  Clock,
  BadgeIndianRupee,
};

/* ── Single Badge Card ──────────────────────────────────────────── */

interface BadgeCardProps {
  badge: TrustBadge;
  index: number;
}

function BadgeCard({ badge, index }: BadgeCardProps) {
  const Icon = iconMap[badge.icon];

  return (
    <motion.div
      className="bg-surface border border-white/5 rounded-3xl p-6 text-center card-hover hover:border-accent/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Icon container */}
      <div
        className="rounded-2xl bg-accent/10 w-14 h-14 flex items-center justify-center mx-auto"
        aria-hidden="true"
      >
        {Icon ? (
          <Icon className="text-accent w-6 h-6" />
        ) : (
          <span className="text-accent text-xl font-bold">?</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-white text-lg mt-5">
        {badge.title}
      </h3>

      {/* Description */}
      <p className="text-muted text-sm mt-2 font-medium leading-relaxed">{badge.description}</p>
    </motion.div>
  );
}

/* ═══════════════════ Trust Badges Section ═══════════════════════ */

export default function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="trust-badges"
      ref={sectionRef}
      className="bg-background py-20 relative overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Background ambient light */}
      <div className="glow-spot glow-orange top-0 left-10 scale-125 opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold text-sm tracking-[0.2em] uppercase">
            Why Members Trust Us
          </span>
          <h2
            id="trust-heading"
            className="text-3xl md:text-4xl font-heading font-extrabold text-white text-center mt-3"
          >
            Built on Trust &amp; Results
          </h2>
        </motion.div>

        {/* ── Badges grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {trustBadges.map((badge, index) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
