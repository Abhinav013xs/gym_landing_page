"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { pricingPlans, type PricingPlan } from "@/lib/data";
import TiltCard from "@/components/TiltCard";

/* ── Animation Variants ─────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

/* ── Pricing Card ───────────────────────────────────────────────── */

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  const { highlighted } = plan;

  return (
    <motion.div variants={cardVariants} className="h-full">
      <TiltCard
        max={5}
        className={`
          h-full relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between border shadow-2xl transition-colors duration-300
          ${
            highlighted
              ? "bg-gradient-to-b from-surface to-accent/10 border-accent/30 text-white md:scale-105 shadow-accent/10"
              : "bg-surface border-white/5 text-white hover:border-white/10"
          }
        `}
      >
        {/* ── "Most Popular" badge (highlighted only) ── */}
        {highlighted && plan.badge && (
          <span className="absolute -top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/25 animate-pulse-glow">
            <Sparkles className="h-3.5 w-3.5" />
            {plan.badge}
          </span>
        )}

        {/* ── Decorative glow for highlighted card ── */}
        {highlighted && (
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
        )}

        <div>
          {/* ── Plan name ── */}
          <h3 className="font-heading text-xl font-bold tracking-wide">{plan.name}</h3>

          {/* ── Price ── */}
          <p className="mt-4 font-heading text-5xl font-extrabold tracking-tight">
            {plan.price}
            <span className="text-base font-normal opacity-70 ml-1">
              {plan.period}
            </span>
          </p>

          {/* ── Description ── */}
          <p className="mt-3 text-sm text-muted font-medium leading-relaxed">{plan.description}</p>

          {/* ── Divider ── */}
          <div className="my-6 h-px bg-white/10" />

          {/* ── Feature list ── */}
          <ul className="space-y-3.5" role="list">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm font-medium text-white/80">
                {/* Check icon circle */}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    highlighted
                      ? "bg-accent/20 text-accent"
                      : "bg-white/5 text-white/65"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA button ── */}
        <a
          href="#lead-form"
          className={`
            mt-8 block w-full rounded-full py-3.5 text-center font-heading font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer
            ${
              highlighted
                ? "bg-cta text-white hover:bg-cta-dark shadow-cta/25"
                : "border-2 border-white/20 text-white hover:border-white hover:bg-white hover:text-black"
            }
          `}
          aria-label={`Get started with the ${plan.name} plan`}
        >
          Get Started
        </a>
      </TiltCard>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Ambient background lights */}
      <div className="glow-spot glow-red top-10 left-10 scale-150 opacity-5" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-accent">
            Membership Plans
          </span>

          <h2
            id="pricing-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl"
          >
            Choose Your <span className="gradient-text">Plan</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted font-medium">
            Flexible membership options designed to fit every goal and budget.
            All plans include access to our world-class facility.
          </p>
        </motion.div>

        {/* ---------- Pricing grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-3 px-4"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
