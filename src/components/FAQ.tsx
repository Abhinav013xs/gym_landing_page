'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqs } from '@/lib/data';

/* ===================================================================
 * FAQ — Accordion Section
 * Single-item-open-at-a-time accordion with smooth height + opacity
 * animations powered by Framer Motion's AnimatePresence.
 * =================================================================== */

const FAQ = () => {
  // Track which FAQ item is currently open (-1 = none)
  const [openId, setOpenId] = useState<number>(-1);

  /** Toggle a specific FAQ — close if already open, open otherwise */
  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? -1 : id));
  };

  return (
    <section
      id="faq"
      className="section-padding bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* ───────── Section Header ───────── */}
        <motion.div
          className="text-center mb-12"
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
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary mt-3"
          >
            Frequently Asked Questions
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
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'ring-2 ring-accent/20 bg-white shadow-lg'
                    : 'bg-background'
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <HelpCircle
                      className={`w-5 h-5 mr-3 shrink-0 transition-colors duration-300 ${
                        isOpen ? 'text-accent' : 'text-muted-light group-hover:text-accent'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-heading font-bold text-primary text-base md:text-lg">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Icon with rotation animation */}
                  <motion.span
                    className="ml-4 shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-accent" aria-hidden="true" />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-accent"
                        aria-hidden="true"
                      />
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
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted leading-relaxed">
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
          className="text-center mt-10 text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Still have questions?{' '}
          <a
            href="#contact"
            className="text-accent font-semibold hover:underline transition-colors"
          >
            Contact us directly
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default FAQ;
