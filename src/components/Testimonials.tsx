'use client';

/* ===================================================================
 * Testimonials — Auto-sliding carousel showcasing member reviews.
 * Features: Google rating badge, star ratings, animated cards with
 * AnimatePresence transitions, navigation dots & arrows, and a
 * video testimonials CTA button.
 * =================================================================== */

import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { Star, ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

/** Number of cards visible at once on desktop */
const DESKTOP_VISIBLE = 3;
/** Auto-slide interval in milliseconds */
const AUTO_SLIDE_INTERVAL = 5000;

export default function Testimonials() {
  // ─── State ─────────────────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Total number of "pages" — one card per page on mobile, DESKTOP_VISIBLE on desktop.
  // We calculate based on desktop grouping; mobile shows one at a time using the same index.
  const totalPages = Math.ceil(testimonials.length / DESKTOP_VISIBLE);

  // ─── Navigation helpers ────────────────────────────────────────────
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    setActiveIndex(page);
  }, []);

  // ─── Auto-slide timer ──────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext, isPaused]);

  // Current visible testimonials (desktop shows 3, mobile shows 1 via CSS)
  const startIdx = activeIndex * DESKTOP_VISIBLE;
  const visibleTestimonials = testimonials.slice(
    startIdx,
    startIdx + DESKTOP_VISIBLE
  );

  // ─── Render ────────────────────────────────────────────────────────
  return (
    <section
      id="testimonials"
      className="section-padding bg-white"
      aria-label="Testimonials"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Subtitle */}
          <span className="inline-block text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            What Members Say
          </span>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary leading-tight">
            Real Reviews,{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
        </motion.div>

        {/* ── Google Rating Badge ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-14"
        >
          <div className="glass-light rounded-2xl px-6 py-3 inline-flex items-center gap-3">
            {/* Google "G" logo approximation */}
            <span className="font-bold text-2xl select-none" aria-hidden="true">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>

            {/* Numeric rating */}
            <span className="text-xl font-bold text-primary">4.9</span>

            {/* 5 filled stars */}
            <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            {/* Review count */}
            <span className="text-muted text-sm">(200+ Reviews)</span>
          </div>
        </motion.div>

        {/* ── Carousel Container ──────────────────────────────────── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Member testimonials"
        >
          {/* Prev / Next arrows — hidden on very small screens */}
          <button
            onClick={goToPrev}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-accent hover:text-white transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-accent hover:text-white transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((t, idx) => (
                <article
                  key={t.id}
                  className="bg-background rounded-3xl p-8 relative card-hover"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review by ${t.name}`}
                >
                  {/* Quote icon watermark */}
                  <Quote
                    className="absolute top-4 right-4 w-12 h-12 text-accent/10"
                    aria-hidden="true"
                  />

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                    <span className="text-white font-bold text-lg select-none">
                      {t.initials}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-heading font-bold text-lg mt-4 text-primary">
                    {t.name}
                  </h3>

                  {/* Program */}
                  <p className="text-accent text-sm font-semibold">
                    {t.program}
                  </p>

                  {/* Star rating */}
                  <div
                    className="flex items-center gap-0.5 mt-2"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-muted leading-relaxed mt-3 text-sm">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Navigation Dots ────────────────────────────────────── */}
          <div
            className="flex justify-center gap-2 mt-10"
            role="tablist"
            aria-label="Testimonial pages"
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === activeIndex ? 'bg-accent' : 'bg-muted-light'
                }`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          {/* ── Mobile Prev / Next ─────────────────────────────────── */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Video Testimonials CTA ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <button
            className="bg-primary text-white rounded-full px-8 py-4 flex items-center gap-3 card-hover font-heading font-semibold text-base hover:bg-accent transition-colors"
            aria-label="Watch video testimonials"
          >
            {/* Play icon inside a circle */}
            <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Play className="w-5 h-5 fill-white text-white" />
            </span>
            Watch Video Testimonials
          </button>
        </motion.div>
      </div>
    </section>
  );
}
