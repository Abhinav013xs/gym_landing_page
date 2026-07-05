"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, Flame, Award, ShieldCheck } from "lucide-react";

interface SocialProofItem {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const socialProofItems: SocialProofItem[] = [
  {
    id: 1,
    label: "Average Rating",
    value: "4.9/5 Rating",
    icon: <Star className="text-accent w-6 h-6 fill-accent" />,
    description: "Verified reviews on Google and fitness forums",
  },
  {
    id: 2,
    label: "Active Roster",
    value: "1000+ Members",
    icon: <Users className="text-accent w-6 h-6" />,
    description: "High-performing athletic community",
  },
  {
    id: 3,
    label: "Proof of Concept",
    value: "500+ Transformations",
    icon: <Flame className="text-accent w-6 h-6" />,
    description: "Measured body fat and weight reductions",
  },
  {
    id: 4,
    label: "Expert Coaching",
    value: "Certified Coaches",
    icon: <Award className="text-accent w-6 h-6" />,
    description: "ACE, ISSA, and NASM accredited trainers",
  },
  {
    id: 5,
    label: "Athletic Trust",
    value: "Trusted by Athletes",
    icon: <ShieldCheck className="text-accent w-6 h-6" />,
    description: "Endorsed by competitive physique athletes",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="bg-background py-16 border-b border-white/5 relative overflow-hidden"
      aria-labelledby="social-proof-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 id="social-proof-heading" className="sr-only">Social Proof and Trust Metrics</h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {socialProofItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-surface border border-white/5 rounded-2xl p-6 text-center card-hover hover:border-accent/20 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div
                  className="rounded-xl bg-accent/5 w-12 h-12 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-110"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                {/* Main Metric Value */}
                <h3 className="font-heading font-extrabold text-white text-lg mt-4 tracking-tight">
                  {item.value}
                </h3>

                {/* Sub-label */}
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mt-1">
                  {item.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted text-xs mt-3 leading-relaxed font-semibold">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
