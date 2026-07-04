'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  Dumbbell,
  Apple,
  Users,
  Clock,
  BadgeIndianRupee,
  type LucideIcon,
} from 'lucide-react';
import { trustBadges, type TrustBadge } from '@/lib/data';

/* ─────────────────── Icon Map ─────────────────── */

/**
 * Maps the string icon name stored in data.ts to the
 * actual Lucide React component for dynamic rendering.
 */
const iconMap: Record<string, LucideIcon> = {
  Award,
  Dumbbell,
  Apple,
  Users,
  Clock,
  BadgeIndianRupee,
};

/* ─────────────────── Single Badge Card ─────────────────── */

interface BadgeCardProps {
  badge: TrustBadge;
  index: number;
}

function BadgeCard({ badge, index }: BadgeCardProps) {
  const Icon = iconMap[badge.icon];

  return (
    <motion.div
      className="glass-light rounded-2xl p-6 text-center card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon container */}
      <div
        className="rounded-full bg-accent/10 w-16 h-16 flex items-center justify-center mx-auto"
        aria-hidden="true"
      >
        {Icon ? (
          <Icon className="text-accent w-7 h-7" />
        ) : (
          /* Fallback for unmapped icons */
          <span className="text-accent text-xl font-bold">?</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-primary text-lg mt-4">
        {badge.title}
      </h3>

      {/* Description */}
      <p className="text-muted text-sm mt-2">{badge.description}</p>
    </motion.div>
  );
}

/* ═══════════════════ Trust Badges Section ═══════════════════════ */

export default function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="trust-badges"
      ref={sectionRef}
      className="bg-white py-16"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold text-sm tracking-[0.2em] uppercase">
            Why Members Trust Us
          </span>
          <h2
            id="trust-heading"
            className="text-3xl md:text-4xl font-heading font-extrabold text-primary text-center mt-3"
          >
            Built on Trust &amp; Results
          </h2>
        </motion.div>

        {/* ── Badge Cards Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustBadges.map((badge, index) => (
            <BadgeCard key={badge.id} badge={badge} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
