'use client';

/* ===================================================================
 * Trainers — "Meet the Team" section
 * Displays trainer cards in a responsive grid with hover overlays
 * revealing social links, plus certification badges.
 * =================================================================== */

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { trainers, type Trainer } from '@/lib/data';

/* ── Animation Variants ─────────────────────────────────────────── */

/** Container variant staggers children into view */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/** Individual card fade-up animation */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

/* ── Social Icon Button ─────────────────────────────────────────── */

interface SocialIconProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

/** Reusable social-media icon rendered inside the hover overlay */
function SocialIcon({ icon, label, href = '#' }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="rounded-full bg-white/20 p-2 text-white transition-colors duration-200 hover:bg-accent"
    >
      {icon}
    </a>
  );
}

/* ── Trainer Card ───────────────────────────────────────────────── */

interface TrainerCardProps {
  trainer: Trainer;
}

/** Single trainer card with gradient image placeholder & hover overlay */
function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="group card-hover overflow-hidden rounded-3xl bg-background"
    >
      {/* ---------- Image area ---------- */}
      <div className="relative h-72 overflow-hidden">
        {/* Gradient placeholder simulating a trainer photo */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${trainer.gradient}`}
        />

        {/* Large initials watermark */}
        <span className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-white/20 font-heading select-none">
          {trainer.initials}
        </span>

        {/* Social overlay — appears on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <SocialIcon
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            }
            label={`${trainer.name} on Instagram`}
          />
          <SocialIcon
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            }
            label={`${trainer.name} on Facebook`}
          />
          <SocialIcon
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            }
            label={`${trainer.name} on Twitter`}
          />
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-primary">
          {trainer.name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-accent">
          {trainer.specialization}
        </p>

        <p className="mt-1 text-sm text-muted">
          {trainer.experience} Experience
        </p>

        {/* Certification badges */}
        <div className="mt-3 flex flex-wrap gap-2">
          {trainer.certifications.map((cert) => (
            <span
              key={cert}
              className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
            >
              <Award className="h-3 w-3" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="section-padding bg-white"
      aria-labelledby="trainers-heading"
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
            Meet the Team
          </span>

          <h2
            id="trainers-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-primary md:text-5xl"
          >
            Expert{' '}
            <span className="gradient-text">Trainers</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Our nationally certified coaches bring years of experience across
            every discipline — from strength &amp; conditioning to yoga and
            everything in between.
          </p>
        </motion.div>

        {/* ---------- Trainer grid ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
