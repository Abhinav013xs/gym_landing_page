'use client';

/* ===================================================================
 * Gallery — Responsive masonry grid showcasing the gym facility.
 * Features: gradient placeholders, hover zoom-in overlays, lightbox
 * with keyboard support (Escape, ArrowLeft/Right), prev/next nav,
 * and Framer Motion entrance + lightbox animations.
 * =================================================================== */

import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '@/lib/data';
import { X, ZoomIn, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function Gallery() {
  // ─── State ─────────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isLightboxOpen = lightboxIndex !== null;

  // ─── Lightbox helpers ──────────────────────────────────────────────
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );
  }, []);

  // ─── Keyboard navigation ──────────────────────────────────────────
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToNext, goToPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // ─── Render ────────────────────────────────────────────────────────
  return (
    <section
      id="gallery"
      className="section-padding bg-background"
      aria-label="Gym gallery"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Subtitle */}
          <span className="inline-block text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Take a Tour
          </span>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary leading-tight">
            Our World-Class{' '}
            <span className="gradient-text">Facility</span>
          </h2>
        </motion.div>

        {/* ── Masonry Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              /* On mobile, every item takes col-span-1 row-span-1.
                 On md+, use the data-driven spans. */
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                /* Mobile: always 1×1 */
                'col-span-1 row-span-1'
              } ${
                /* md+: use data-driven spans */
                item.span
                  .split(' ')
                  .map((s) => `md:${s}`)
                  .join(' ')
              }`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              {/* Gradient background placeholder */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />

              {/* Centered placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Camera className="w-10 h-10 md:w-12 md:h-12 text-white/20" />
                <span className="text-white/30 text-xs md:text-sm font-medium">
                  {item.title}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <ZoomIn className="w-8 h-8 text-white" />
                <span className="text-white text-sm font-semibold tracking-wide">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isLightboxOpen && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${galleryImages[lightboxIndex].title}`}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Lightbox content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large gradient placeholder */}
              <div
                className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${galleryImages[lightboxIndex].gradient} flex flex-col items-center justify-center gap-4`}
              >
                <Camera className="w-16 h-16 md:w-20 md:h-20 text-white/20" />
                <span className="text-white text-lg md:text-2xl font-heading font-bold">
                  {galleryImages[lightboxIndex].title}
                </span>
              </div>

              {/* Counter */}
              <p className="text-center text-white/60 text-sm mt-4 font-medium">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
