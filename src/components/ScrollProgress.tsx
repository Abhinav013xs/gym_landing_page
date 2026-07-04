'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * ScrollProgress — A thin progress bar fixed at the very top of the viewport.
 * Shows how far the user has scrolled through the page using a smooth
 * gradient bar that scales from 0% to 100% width.
 */
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Use a spring for buttery-smooth animation of the bar width
  const scaleX = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollableHeight = docHeight - winHeight;

      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(scrollTop / scrollableHeight, 1);
      setScrollProgress(progress);
    };

    // Set initial value
    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Sync the spring value whenever scrollProgress changes
  useEffect(() => {
    scaleX.set(scrollProgress);
  }, [scrollProgress, scaleX]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-accent to-accent-light"
        style={{
          scaleX,
          transformOrigin: '0%',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
