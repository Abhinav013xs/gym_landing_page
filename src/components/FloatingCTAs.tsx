'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

/* ===== Constants ===== */
const WHATSAPP_URL = 'https://wa.me/919876543210';
const PHONE_URL = 'tel:+919876543210';
const SCROLL_SHOW_THRESHOLD = 500;

/* ===== Animation Variants ===== */
const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const tooltipVariants = {
  hidden: { opacity: 0, x: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.15, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    x: 10,
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

/* ===== Tooltip Wrapper ===== */
interface FloatingButtonProps {
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className: string;
  ariaLabel: string;
  isExternal?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  label,
  children,
  href,
  onClick,
  className,
  ariaLabel,
  isExternal = false,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const sharedProps = {
    className: `relative rounded-full p-3.5 shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
    'aria-label': ariaLabel,
  };

  const content = (
    <>
      {/* Tooltip label — appears to the left */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-lg pointer-events-none"
          >
            {label}
            {/* Arrow */}
            <span className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-2 h-2 bg-primary rotate-45" />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...sharedProps}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps} type="button">
      {content}
    </button>
  );
};

/* ===== Main Component ===== */
const FloatingCTAs: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  /* --- Track scroll position for back-to-top visibility --- */
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > SCROLL_SHOW_THRESHOLD);
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --- Smooth scroll to top handler --- */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3"
      role="group"
      aria-label="Quick actions"
    >
      {/* Back to Top — conditionally rendered */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FloatingButton
              label="Back to Top"
              onClick={scrollToTop}
              className="bg-primary text-white hover:bg-surface-dark"
              ariaLabel="Scroll back to top of page"
            >
              <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
            </FloatingButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Button */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <FloatingButton
          label="Call Us"
          href={PHONE_URL}
          className="bg-accent text-white hover:bg-accent-dark"
          ariaLabel="Call Jerai Fitness"
        >
          <Phone className="w-5 h-5" strokeWidth={2.5} />
        </FloatingButton>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.0 }}
      >
        <FloatingButton
          label="WhatsApp"
          href={WHATSAPP_URL}
          className="bg-[#25D366] text-white hover:brightness-110"
          ariaLabel="Chat with us on WhatsApp"
          isExternal
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
        </FloatingButton>
      </motion.div>
    </div>
  );
};

export default FloatingCTAs;
