'use client';

/* ===================================================================
 * Pricing — "Choose Your Plan" membership section
 * Three-tier card layout with the middle plan visually emphasised.
 * Uses Framer Motion for staggered scroll-reveal animations.
 * =================================================================== */

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { pricingPlans, type PricingPlan } from '@/lib/data';

/* ── Animation Variants ─────────────────────────────────────────── */

/** Container variant staggers children into view */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/** Individual card fade-up animation */
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

/* ── Pricing Card ───────────────────────────────────────────────── */

interface PricingCardProps {
  plan: PricingPlan;
}

/** Renders a single pricing card, with special styling for the highlighted plan */
function PricingCard({ plan }: PricingCardProps) {
  const { highlighted } = plan;

  return (
    <motion.div
      variants={cardVariants}
      className={`
        card-hover relative overflow-hidden rounded-3xl p-8
        ${
          highlighted
            ? 'bg-primary text-white shadow-2xl md:scale-105'
            : 'bg-white text-primary shadow-sm'
        }
      `}
    >
      {/* ── "Most Popular" badge (highlighted only) ── */}
      {highlighted && plan.badge && (
        <span className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-lg">
          <Sparkles className="h-3.5 w-3.5" />
          {plan.badge}
        </span>
      )}

      {/* ── Decorative glow for highlighted card ── */}
      {highlighted && (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
      )}

      {/* ── Plan name ── */}
      <h3 className="font-heading text-xl font-bold">{plan.name}</h3>

      {/* ── Price ── */}
      <p className="mt-4 font-heading text-5xl font-extrabold">
        {plan.price}
        <span className="text-base font-normal opacity-70">
          {plan.period}
        </span>
      </p>

      {/* ── Description ── */}
      <p className="mt-2 text-sm opacity-70">{plan.description}</p>

      {/* ── Divider ── */}
      <div className="my-6 h-px bg-current opacity-10" />

      {/* ── Feature list ── */}
      <ul className="space-y-3" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            {/* Check icon circle */}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                highlighted
                  ? 'bg-white/20 text-white'
                  : 'bg-accent/10 text-accent'
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* ── CTA button ── */}
      <button
        type="button"
        className={`
          mt-8 w-full rounded-full py-3.5 text-center font-bold transition-colors duration-200
          ${
            highlighted
              ? 'bg-accent text-white hover:bg-accent-dark'
              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
          }
        `}
        aria-label={`Get started with the ${plan.name} plan`}
      >
        Get Started
      </button>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding bg-background"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-accent">
            Membership Plans
          </span>

          <h2
            id="pricing-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-primary md:text-5xl"
          >
            Choose Your{' '}
            <span className="gradient-text">Plan</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Flexible membership options designed to fit every goal and budget.
            All plans include access to our world-class facility.
          </p>
        </motion.div>

        {/* ---------- Pricing grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-3"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
