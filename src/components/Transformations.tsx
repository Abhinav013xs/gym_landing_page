"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Scale, Percent, Clock } from "lucide-react";
import { transformations, type Transformation } from "@/lib/data";

/* ── Animation Variants ─────────────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

/* ── Before / After Image Comparison Slider ───────────────────────── */

interface ComparisonSliderProps {
  beforeGradient: string;
  afterGradient: string;
  weightBefore: number;
  weightAfter: number;
  fatBefore: number;
  fatAfter: number;
  name: string;
  heightClass?: string;
}

function ComparisonSlider({
  beforeGradient,
  afterGradient,
  weightBefore,
  weightAfter,
  fatBefore,
  fatAfter,
  name,
  heightClass = "h-72 sm:h-80",
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage (0 - 100)
  const isDragging = useRef<boolean>(false);

  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      calculatePosition(e.clientX);
    },
    [calculatePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches.length > 0) {
        calculatePosition(e.touches[0].clientX);
      }
    },
    [calculatePosition]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  }, []);

  const handleTouchStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

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
      {/* ── BEFORE layer (left background) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${beforeGradient} flex flex-col items-center justify-center`}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest mb-2 font-extrabold">
          Before
        </span>
        <svg
          className="w-16 h-16 text-white/10 mb-3"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="32" cy="16" rx="10" ry="12" />
          <path d="M16 60 C16 38 48 38 48 60Z" />
        </svg>
        <span className="text-white font-extrabold text-xl">{weightBefore} kg</span>
        <span className="text-white/60 text-xs mt-1 font-semibold">{fatBefore}% Fat</span>
      </div>

      {/* ── AFTER layer (clipped slider layer) ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${afterGradient} flex flex-col items-center justify-center`}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-extrabold">
          After
        </span>
        <svg
          className="w-16 h-16 text-white/20 mb-3"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden="true"
        >
          <ellipse cx="32" cy="14" rx="9" ry="11" />
          <path d="M20 58 C20 36 44 36 44 58Z" />
        </svg>
        <span className="text-accent font-black text-2xl">{weightAfter} kg</span>
        <span className="text-accent/80 text-xs mt-1 font-bold">{fatAfter}% Fat</span>
      </div>

      {/* ── Divider line + handle ── */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-accent/60 mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-accent/40 shadow-lg flex items-center justify-center gap-0.5 pointer-events-none">
          <ChevronLeft className="w-3.5 h-3.5 text-accent" />
          <ChevronRight className="w-3.5 h-3.5 text-accent" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Metrics helper ──────────────────── */

function getStatsSummary(beforeW: number, afterW: number, beforeF: number, afterF: number) {
  const weightDiff = Math.abs(beforeW - afterW);
  const fatDiff = Math.abs(beforeF - afterF);
  return { weightDiff, fatDiff };
}

/* ──────────────────── Transformation Card ──────────────────── */

interface TransformationCardProps {
  item: Transformation;
  index: number;
  onViewStory: (id: number) => void;
}

function TransformationCard({ item, index, onViewStory }: TransformationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { weightDiff, fatDiff } = getStatsSummary(item.weightBefore, item.weightAfter, item.fatBefore, item.fatAfter);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-accent/20 transition-all duration-300 min-h-[580px]"
    >
      <div>
        {/* Comparison Slider */}
        <ComparisonSlider
          beforeGradient={item.beforeGradient}
          afterGradient={item.afterGradient}
          weightBefore={item.weightBefore}
          weightAfter={item.weightAfter}
          fatBefore={item.fatBefore}
          fatAfter={item.fatAfter}
          name={item.name}
          heightClass="h-72 sm:h-80"
        />

        {/* Card info with generous spacing */}
        <div className="p-8">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-accent transition-colors">
                {item.name}
              </h3>
              <p className="text-muted text-xs mt-1.5 font-semibold">
                {item.age} Years • {item.gender}
              </p>
            </div>
            <span className="bg-accent/10 text-accent text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {item.program}
            </span>
          </div>

          {/* Stats grid with increased spacing */}
          <div className="grid grid-cols-2 gap-4 mt-6 bg-background/50 border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-accent" />
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest block font-bold">Lost Weight</span>
                <span className="font-heading font-black text-base text-white">-{weightDiff} kg</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Percent className="w-5 h-5 text-accent" />
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest block font-bold">Fat Reduced</span>
                <span className="font-heading font-black text-base text-white">-{fatDiff}% Fat</span>
              </div>
            </div>
          </div>

          <p className="text-muted italic text-xs mt-6 leading-relaxed line-clamp-2 font-medium">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 pt-2">
        <button
          onClick={() => onViewStory(item.id)}
          className="w-full bg-white/5 hover:bg-cta hover:text-white border border-white/10 hover:border-cta text-white font-display text-2xl uppercase tracking-wider py-3.5 rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center leading-none cursor-pointer"
        >
          View Success Story
        </button>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Lightbox Modal ───────────────────────── */

interface LightboxProps {
  item: Transformation;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  current: number;
  total: number;
}

function Lightbox({ item, onClose, onPrev, onNext, current, total }: LightboxProps) {
  const { weightDiff, fatDiff } = getStatsSummary(item.weightBefore, item.weightAfter, item.fatBefore, item.fatAfter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background border border-white/10 shadow flex items-center justify-center hover:border-accent/40 transition-colors cursor-pointer text-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Larger comparison slider */}
        <ComparisonSlider
          beforeGradient={item.beforeGradient}
          afterGradient={item.afterGradient}
          weightBefore={item.weightBefore}
          weightAfter={item.weightAfter}
          fatBefore={item.fatBefore}
          fatAfter={item.fatAfter}
          name={item.name}
          heightClass="h-80 sm:h-96"
        />

        {/* Body with generous spacing */}
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                {item.name}
              </h3>
              <p className="text-muted text-sm mt-1.5 font-semibold">
                {item.age} years • {item.gender}
              </p>
            </div>
            <span className="inline-block bg-accent/15 text-accent text-xs font-extrabold px-4 py-2 rounded-full whitespace-nowrap uppercase tracking-widest">
              {item.program}
            </span>
          </div>

          {/* Full stats breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 bg-background border border-white/5 rounded-2xl p-6">
            <div className="text-center">
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-2 font-bold">Before</span>
              <span className="font-heading font-black text-base text-white">{item.weightBefore} kg ({item.fatBefore}%)</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-2 font-bold">After</span>
              <span className="font-heading font-black text-base text-white">{item.weightAfter} kg ({item.fatAfter}%)</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-2 font-bold">Weight Loss</span>
              <span className="font-heading font-black text-base text-accent">-{weightDiff} kg</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-muted uppercase tracking-widest block mb-2 font-bold">Fat Reduced</span>
              <span className="font-heading font-black text-base text-accent">-{fatDiff}% Fat</span>
            </div>
          </div>

          <blockquote className="mt-8 border-l-4 border-accent pl-4">
            <p className="text-muted italic text-base leading-relaxed font-medium">
              &ldquo;{item.quote}&rdquo;
            </p>
          </blockquote>

          {/* Details */}
          <div className="mt-8">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-widest text-accent">
              Transformation Process
            </h4>
            <p className="text-white font-extrabold text-base mt-2">{item.program} Blueprint</p>
            <p className="text-muted text-sm mt-1.5 leading-relaxed font-medium">
              Completed under elite metabolic planning over a duration of {item.duration}. Includes custom calorie distributions and progressive loading metrics.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-white transition-colors cursor-pointer"
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
              className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-white transition-colors cursor-pointer"
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

/* ═══════════════════ Transformations Section ═══════════════════════ */

export default function Transformations() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeIndex = activeId !== null
    ? transformations.findIndex((t) => t.id === activeId)
    : -1;

  const activeItem = activeIndex >= 0 ? transformations[activeIndex] : null;

  const openStory = useCallback((id: number) => {
    setActiveId(id);
    document.body.style.overflow = "hidden";
  }, []);

  const closeStory = useCallback(() => {
    setActiveId(null);
    document.body.style.overflow = "";
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

  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [closeStory, goPrev, goNext]
  );

  return (
    <section
      id="transformations"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="transformations-heading"
    >
      {/* Glow Highlight */}
      <div className="glow-spot glow-gold top-1/2 left-0 -translate-y-1/2 scale-150 opacity-5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <span className="text-accent tracking-[0.2em] text-sm font-bold uppercase">
            Real Results
          </span>
          <h2
            id="transformations-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-3"
          >
            Incredible <span className="gradient-text">Transformations</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
            Our members don&apos;t just change their bodies — they transform their lives.
            Browse real results from real people who trusted us with their fitness journey.
          </p>
        </motion.div>

        {/* ── Cards Grid with Expanded Spacing ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
          {transformations.slice(0, 6).map((item, index) => (
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
          animate={sectionInView ? "visible" : "hidden"}
          className="text-center mt-20"
        >
          <a
            href="#lead-form"
            className="inline-flex bg-cta hover:bg-cta-dark text-white font-display text-2xl uppercase tracking-wider rounded-full px-12 py-4.5 transition-all duration-300 hover:scale-105 active:scale-95 items-center justify-center leading-none shadow-lg shadow-cta/35 cursor-pointer"
          >
            Start My Transformation
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
