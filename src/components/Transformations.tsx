'use client';

/* ===================================================================
 * Transformations — Premium before/after gallery section.
 *
 * Features:
 *  • Interactive comparison slider (mouse + touch) per card
 *  • Framer Motion scroll-reveal & lightbox animations
 *  • Full-screen modal with prev/next navigation
 *  • Fully responsive grid layout
 * =================================================================== */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { transformations, Transformation } from '@/lib/data';

/* ──────────────────── Animation Variants ──────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
      delay: i * 0.08,
    },
  }),
};

const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContentVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
} as const;

/* ──────────────────── Comparison Slider (per‑card) ──────────────────── */

interface ComparisonSliderProps {
  beforeGradient: string;
  afterGradient: string;
  weightBefore: number;
  weightAfter: number;
  name: string;
  /** Container height class — lets the modal version be taller */
  heightClass?: string;
}

function ComparisonSlider({
  beforeGradient,
  afterGradient,
  weightBefore,
  weightAfter,
  name,
  heightClass = 'h-64',
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0–100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  /** Convert a pointer clientX into a 0–100 percentage relative to the container */
  const getPercentage = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  /* ── Mouse handlers ── */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      setSliderPos(getPercentage(e.clientX));
    },
    [getPercentage],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      setSliderPos(getPercentage(e.clientX));
    },
    [getPercentage],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  /* ── Touch handlers ── */
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      setSliderPos(getPercentage(e.touches[0].clientX));
    },
    [getPercentage],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      setSliderPos(getPercentage(e.touches[0].clientX));
    },
    [getPercentage],
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`comparison-slider relative ${heightClass} overflow-hidden select-none cursor-ew-resize`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="slider"
      aria-label={`Before and after comparison for ${name}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
    >
      {/* ── BEFORE layer (full width, sits behind) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${beforeGradient} flex flex-col items-center justify-center`}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest mb-1 font-semibold">
          Before
        </span>
        {/* Silhouette icon */}
        <svg
          className="w-16 h-16 text-white/20 mb-2"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="32" cy="16" rx="10" ry="12" />
          <path d="M16 60 C16 38 48 38 48 60Z" />
        </svg>
        <span className="text-white font-bold text-lg">{weightBefore} kg</span>
      </div>

      {/* ── AFTER layer (clipped from the right) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${afterGradient} flex flex-col items-center justify-center`}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <span className="text-white/70 text-xs uppercase tracking-widest mb-1 font-semibold">
          After
        </span>
        {/* Silhouette icon (fitter) */}
        <svg
          className="w-16 h-16 text-white/30 mb-2"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="32" cy="14" rx="9" ry="11" />
          <path d="M20 58 C20 36 44 36 44 58Z" />
        </svg>
        <span className="text-white font-bold text-lg">{weightAfter} kg</span>
      </div>

      {/* ── Divider line + handle ── */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="w-0.5 h-full bg-white/80 mx-auto" />

        {/* Circular handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center gap-0.5 pointer-events-none">
          <ChevronLeft className="w-3.5 h-3.5 text-primary" />
          <ChevronRight className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Weight‑change helper ──────────────────── */

function getWeightChange(before: number, after: number) {
  const diff = Math.abs(before - after);
  const label = before > after ? 'Lost' : 'Gained';
  return { diff, label };
}

/* ──────────────────── Transformation Card ──────────────────── */

interface TransformationCardProps {
  item: Transformation;
  index: number;
  onViewStory: (id: number) => void;
}

function TransformationCard({ item, index, onViewStory }: TransformationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { diff, label } = getWeightChange(item.weightBefore, item.weightAfter);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-white rounded-3xl overflow-hidden shadow-md card-hover"
    >
      {/* ── Before / After comparison area ── */}
      <ComparisonSlider
        beforeGradient={item.beforeGradient}
        afterGradient={item.afterGradient}
        weightBefore={item.weightBefore}
        weightAfter={item.weightAfter}
        name={item.name}
      />

      {/* ── Card info ── */}
      <div className="p-6">
        {/* Name */}
        <h3 className="font-heading font-bold text-xl text-primary">{item.name}</h3>

        {/* Age & Gender */}
        <p className="text-muted text-sm mt-0.5">
          {item.age} years • {item.gender}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div>
            <span className="text-xs text-muted uppercase tracking-wide block">Before</span>
            <span className="font-bold text-primary">{item.weightBefore} kg</span>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wide block">After</span>
            <span className="font-bold text-primary">{item.weightAfter} kg</span>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wide block">{label}</span>
            <span className="font-bold text-primary">{diff} kg</span>
          </div>
          <div>
            <span className="text-xs text-muted uppercase tracking-wide block">Duration</span>
            <span className="font-bold text-primary">{item.duration}</span>
          </div>
        </div>

        {/* Program badge */}
        <div className="mt-4">
          <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {item.program}
          </span>
        </div>

        {/* Quote */}
        <p className="text-muted italic text-sm mt-3 leading-relaxed">
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* View Full Story */}
        <button
          onClick={() => onViewStory(item.id)}
          className="mt-4 text-accent font-semibold text-sm flex items-center gap-1 group cursor-pointer"
          aria-label={`View full story of ${item.name}`}
        >
          View Full Story
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

/* ──────────────────── Lightbox Modal ──────────────────── */

interface LightboxProps {
  item: Transformation;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  /** 1‑indexed for display */
  current: number;
  total: number;
}

function Lightbox({ item, onClose, onPrev, onNext, current, total }: LightboxProps) {
  const { diff, label } = getWeightChange(item.weightBefore, item.weightAfter);

  return (
    <motion.div
      key="lightbox-overlay"
      variants={modalOverlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Transformation story of ${item.name}`}
    >
      {/* Content card — stop click propagation so clicking inside doesn't close */}
      <motion.div
        key={`lightbox-${item.id}`}
        variants={modalContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-primary" />
        </button>

        {/* Larger comparison slider */}
        <ComparisonSlider
          beforeGradient={item.beforeGradient}
          afterGradient={item.afterGradient}
          weightBefore={item.weightBefore}
          weightAfter={item.weightAfter}
          name={item.name}
          heightClass="h-72 sm:h-80"
        />

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-primary">
                {item.name}
              </h3>
              <p className="text-muted text-sm mt-1">
                {item.age} years • {item.gender}
              </p>
            </div>
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {item.program}
            </span>
          </div>

          {/* Full stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 bg-background rounded-2xl p-4">
            <div className="text-center">
              <span className="text-xs text-muted uppercase tracking-wider block mb-1">
                Before
              </span>
              <span className="font-bold text-xl text-primary">{item.weightBefore} kg</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted uppercase tracking-wider block mb-1">
                After
              </span>
              <span className="font-bold text-xl text-primary">{item.weightAfter} kg</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted uppercase tracking-wider block mb-1">
                {label}
              </span>
              <span className="font-bold text-xl text-accent">{diff} kg</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted uppercase tracking-wider block mb-1">
                Duration
              </span>
              <span className="font-bold text-xl text-primary">{item.duration}</span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mt-6 border-l-4 border-accent pl-4">
            <p className="text-muted italic text-base leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
          </blockquote>

          {/* Program details */}
          <div className="mt-6">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-muted">
              Program
            </h4>
            <p className="text-primary font-semibold mt-1">{item.program}</p>
            <p className="text-muted text-sm mt-1">
              Completed in {item.duration} with personalized coaching and nutrition support.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors cursor-pointer"
              aria-label="Previous transformation"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <span className="text-xs text-muted">
              {current} / {total}
            </span>

            <button
              onClick={onNext}
              className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors cursor-pointer"
              aria-label="Next transformation"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────── Main Section Component ──────────────────── */

export default function Transformations() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  /* ── Modal helpers ── */
  const activeIndex = activeId !== null
    ? transformations.findIndex((t) => t.id === activeId)
    : -1;

  const activeItem = activeIndex >= 0 ? transformations[activeIndex] : null;

  const openStory = useCallback((id: number) => {
    setActiveId(id);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeStory = useCallback(() => {
    setActiveId(null);
    document.body.style.overflow = '';
  }, []);

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) {
      setActiveId(transformations[transformations.length - 1].id);
    } else {
      setActiveId(transformations[activeIndex - 1].id);
    }
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex >= transformations.length - 1) {
      setActiveId(transformations[0].id);
    } else {
      setActiveId(transformations[activeIndex + 1].id);
    }
  }, [activeIndex]);

  /* ── Keyboard support for modal ── */
  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeStory();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [closeStory, goPrev, goNext],
  );

  return (
    <section
      id="transformations"
      ref={sectionRef}
      className="section-padding bg-background"
      aria-labelledby="transformations-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-accent tracking-[0.2em] text-sm font-semibold uppercase">
            Real Results
          </span>
          <h2
            id="transformations-heading"
            className="font-heading font-extrabold text-3xl md:text-5xl text-primary mt-3"
          >
            Incredible Transformations
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Our members don&apos;t just change their bodies — they transform their lives.
            Browse real results from real people who trusted us with their fitness journey.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((item, index) => (
            <TransformationCard
              key={item.id}
              item={item}
              index={index}
              onViewStory={openStory}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <a
            href="#pricing"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold rounded-full px-8 py-4 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Transformation Today
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {activeItem && (
          <div onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
            <Lightbox
              item={activeItem}
              onClose={closeStory}
              onPrev={goPrev}
              onNext={goNext}
              current={activeIndex + 1}
              total={transformations.length}
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
