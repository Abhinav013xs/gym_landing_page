'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';

/* ===== Types ===== */
interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

/* ===== Constants ===== */
const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Transformations', href: '#transformations', sectionId: 'transformations' },
  { label: 'Programs', href: '#programs', sectionId: 'programs' },
  { label: 'Testimonials', href: '#testimonials', sectionId: 'testimonials' },
  { label: 'Pricing', href: '#pricing', sectionId: 'pricing' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

const SCROLL_THRESHOLD = 50;

/* ===== Animation Variants ===== */
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
} as const;

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.35, ease: 'easeOut' as const },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

/* ===== Component ===== */
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  /* --- Scroll listener: toggle navbar background --- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* --- IntersectionObserver: track active section --- */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.sectionId);
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one with the largest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* --- Lock body scroll when mobile menu is open --- */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /* --- Handlers --- */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* ===== Main Navigation Bar ===== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[rgba(17,17,17,0.95)] backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* --- Logo --- */}
            <Link
              href="#hero"
              className="flex items-center gap-2.5 group"
              aria-label="Jerai Fitness - Back to top"
              onClick={closeMobileMenu}
            >
              <Dumbbell
                className="w-8 h-8 text-accent transition-transform duration-300 group-hover:rotate-[-12deg]"
                strokeWidth={2.5}
              />
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                JERAI{' '}
                <span className="text-accent">FITNESS</span>
              </span>
            </Link>

            {/* --- Desktop Navigation Links --- */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.sectionId}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg ${
                    activeSection === link.sectionId
                      ? 'text-accent'
                      : 'text-white/80 hover:text-white'
                  }`}
                  aria-current={activeSection === link.sectionId ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {activeSection === link.sectionId && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* --- Desktop CTA + Mobile Hamburger --- */}
            <div className="flex items-center gap-4">
              {/* Join Now CTA (desktop only) */}
              <Link
                href="#pricing"
                className="hidden lg:inline-flex items-center bg-accent hover:bg-accent-dark text-white font-semibold text-sm rounded-full px-6 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 active:scale-95"
              >
                Join Now
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ===== Mobile Full-Screen Menu Overlay ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 lg:hidden glass-dark flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col items-center gap-2 relative z-10" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.sectionId}
                  custom={index}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`block px-8 py-3 text-2xl font-heading font-bold tracking-wide transition-colors duration-300 rounded-xl ${
                      activeSection === link.sectionId
                        ? 'text-accent'
                        : 'text-white/80 hover:text-white'
                    }`}
                    aria-current={activeSection === link.sectionId ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6"
              >
                <Link
                  href="#pricing"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center bg-accent hover:bg-accent-dark text-white font-semibold text-lg rounded-full px-10 py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 active:scale-95"
                >
                  Join Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
