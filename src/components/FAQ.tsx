"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/data";

/* ===================================================================
 * FAQ — Accordion Section
 * Luxury gold highlighted accordions with smooth spring transitions.
 * =================================================================== */

export default function FAQ() {
  const [openId, setOpenId] = useState<number>(-1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? -1 : id));
  };

  return (
    <section
      id="faq"
      className="section-padding bg-surface-dark relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background glow highlights */}
      <div className="glow-spot glow-gold top-1/3 left-10 scale-125 opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10 px-4">
        {/* ───────── Section Header ───────── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold text-sm tracking-widest uppercase">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-3"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* ───────── Accordion Items ───────── */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-accent/30 bg-surface shadow-2xl shadow-accent/5 text-white"
                    : "bg-surface border-white/5 text-white/80 hover:border-white/10"
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left group focus:outline-none rounded-2xl cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <HelpCircle
                      className={`w-5 h-5 mr-3.5 shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-accent" : "text-muted group-hover:text-accent"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-heading font-bold text-white text-base md:text-lg group-hover:text-accent transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Icon with rotation animation */}
                  <motion.span
                    className="ml-4 shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-accent" aria-hidden="true" />
                    ) : (
                      <Plus className="w-5 h-5 text-accent" aria-hidden="true" />
                    )}
                  </motion.span>
                </button>

                {/* Answer — AnimatePresence handles enter/exit */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted text-sm leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ───────── Bottom CTA ───────── */}
        <motion.p
          className="text-center mt-12 text-sm text-muted font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Still have questions?{" "}
          <a
            href="#contact"
            className="text-accent font-bold hover:underline transition-colors ml-1"
          >
            Contact us directly
          </a>
        </motion.p>
      </div>
    </section>
  );
}
