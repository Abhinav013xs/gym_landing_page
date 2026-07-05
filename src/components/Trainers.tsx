"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { trainers, type Trainer } from "@/lib/data";
import TiltCard from "@/components/TiltCard";

/* ── Animation Variants ─────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

/* ── Social Icon Button ─────────────────────────────────────────── */

interface SocialIconProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

function SocialIcon({ icon, label, href = "#" }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="rounded-full bg-white/10 p-3 text-white transition-all duration-200 hover:bg-accent hover:scale-110"
    >
      {icon}
    </a>
  );
}

/* ── Trainer Card ───────────────────────────────────────────────── */

interface TrainerCardProps {
  trainer: Trainer;
}

function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <TiltCard className="h-full bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-accent/25 min-h-[440px]">
        {/* ---------- Image area ---------- */}
        <div className="relative h-76 overflow-hidden">
          {/* Gradient placeholder simulating a trainer photo */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${trainer.gradient}`}
          />

          {/* Large initials watermark */}
          <span className="absolute inset-0 flex items-center justify-center text-8xl font-black text-white/10 font-heading select-none">
            {trainer.initials}
          </span>

          {/* Social overlay — appears on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]"
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

        {/* ---------- Body with expanded padding ---------- */}
        <div className="p-8 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-xl text-white">
              {trainer.name}
            </h3>

            <p className="mt-2 text-sm font-bold text-accent tracking-wider uppercase">
              {trainer.specialization}
            </p>

            <p className="mt-1 text-xs font-bold text-muted tracking-widest uppercase">
              {trainer.experience} Experience
            </p>
          </div>

          {/* Certification badges */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-5">
            {trainer.certifications.map((cert) => (
              <span
                key={cert}
                className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-[10px] font-extrabold text-accent uppercase tracking-widest"
              >
                <Award className="h-3 w-3" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="section-padding bg-surface-dark relative overflow-hidden"
      aria-labelledby="trainers-heading"
    >
      {/* Background glow highlights */}
      <div className="glow-spot glow-gold top-1/3 right-0 scale-150 opacity-5" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ---------- Section header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <span className="text-accent font-bold text-sm tracking-widest uppercase">
            Meet the Team
          </span>

          <h2
            id="trainers-heading"
            className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl"
          >
            Expert <span className="gradient-text">Trainers</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted font-medium">
            Our nationally certified coaches bring years of experience across
            every discipline — from strength &amp; conditioning to yoga and
            everything in between.
          </p>
        </motion.div>

        {/* ---------- Trainer grid with expanded gaps ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 px-4"
        >
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
