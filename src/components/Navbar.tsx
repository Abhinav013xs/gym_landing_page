"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell, Sun, Moon, Monitor, ChevronDown } from "lucide-react";

/* ===== Types ===== */
interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

type ThemeType = "light" | "dark" | "system";

/* ===== Constants ===== */
const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero", sectionId: "hero" },
  { label: "Transformations", href: "#transformations", sectionId: "transformations" },
  { label: "Programs", href: "#programs", sectionId: "programs" },
  { label: "Testimonials", href: "#testimonials", sectionId: "testimonials" },
  { label: "Pricing", href: "#pricing", sectionId: "pricing" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

const SCROLL_THRESHOLD = 50;

/* ===== Animation Variants ===== */
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
} as const;

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.35, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

/* ===== Component ===== */
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [theme, setTheme] = useState<ThemeType>("system");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* --- Theme Toggler Logic --- */
  const applyTheme = useCallback((setting: ThemeType) => {
    const root = document.documentElement;
    if (setting === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else if (setting === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      // System Default
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }
  }, []);

  const changeThemeSetting = (setting: ThemeType) => {
    setTheme(setting);
    localStorage.setItem("theme-setting", setting);
    applyTheme(setting);
    setIsThemeDropdownOpen(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme-setting") as ThemeType | null;
    const initialSetting = saved || "system";
    setTheme(initialSetting);
    applyTheme(initialSetting);

    // Watch OS preference changes if theme is system
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const activeSetting = localStorage.getItem("theme-setting") as ThemeType | null;
      if (!activeSetting || activeSetting === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    
    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [applyTheme]);

  /* --- Scroll listener: toggle navbar background --- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* --- Lock body scroll when mobile menu is open --- */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Helper to render active theme icon
  const renderThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "dark":
        return <Moon className="w-4 h-4 text-yellow-400" />;
      case "system":
      default:
        return <Monitor className="w-4 h-4 text-muted" />;
    }
  };

  return (
    <>
      {/* ===== Main Navigation Bar ===== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[rgba(5,5,5,0.95)] light:bg-[rgba(250,249,246,0.95)] backdrop-blur-md border-b border-border/80 light:border-border shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* --- Logo --- */}
            <Link
              href="#hero"
              className="flex items-center gap-2 group"
              aria-label="Legacy Athletics - Back to top"
              onClick={closeMobileMenu}
            >
              <Dumbbell
                className="w-7 h-7 text-accent transition-transform duration-300 group-hover:rotate-[-12deg]"
                strokeWidth={2.5}
              />
              <span className="font-heading font-extrabold text-lg tracking-widest text-primary">
                LEGACY <span className="text-accent">ATHLETICS</span>
              </span>
            </Link>

            {/* --- Desktop Navigation Links --- */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.sectionId}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-heading font-bold tracking-wide transition-colors duration-300 rounded-lg ${
                    activeSection === link.sectionId
                      ? "text-accent"
                      : "text-muted hover:text-primary"
                  }`}
                  aria-current={activeSection === link.sectionId ? "page" : undefined}
                >
                  {link.label}
                  {activeSection === link.sectionId && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* --- Desktop Options & CTA --- */}
            <div className="flex items-center gap-4">
              {/* Theme Dropdown Toggle */}
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold border border-border hover:border-accent/40 rounded-xl transition-all cursor-pointer bg-surface/30"
                  aria-label="Change color theme"
                >
                  {renderThemeIcon()}
                  <ChevronDown className="w-3.5 h-3.5 text-muted" />
                </button>

                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-36 rounded-2xl bg-surface border border-border shadow-xl p-2 z-50 text-left font-body"
                    >
                      {[
                        { id: "light" as ThemeType, label: "Light", icon: Sun },
                        { id: "dark" as ThemeType, label: "Dark", icon: Moon },
                        { id: "system" as ThemeType, label: "System", icon: Monitor },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => changeThemeSetting(item.id)}
                            className={`w-full px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-3 cursor-pointer hover:bg-accent/15 transition-all text-primary ${
                              theme === item.id ? "text-accent bg-accent/5 font-bold" : ""
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Join Now CTA Button */}
              <Link
                href="#pricing"
                className="hidden lg:inline-flex items-center bg-cta hover:bg-cta-dark text-white font-heading font-bold text-xs uppercase tracking-wider rounded-full px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cta/25 active:scale-95 cursor-pointer"
              >
                Join Today
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center text-primary rounded-xl hover:bg-white/5 border border-border transition-colors duration-200"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-40 lg:hidden bg-background flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Background glow highlights */}
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
                    className={`block px-8 py-3 text-2xl font-heading font-extrabold tracking-wide transition-colors duration-300 rounded-xl ${
                      activeSection === link.sectionId
                        ? "text-accent"
                        : "text-primary/70 hover:text-primary"
                    }`}
                    aria-current={activeSection === link.sectionId ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Theme Toggle Buttons */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-4 mt-6 border border-border p-1.5 rounded-full bg-surface/30"
              >
                {[
                  { id: "light" as ThemeType, icon: Sun, label: "Light" },
                  { id: "dark" as ThemeType, icon: Moon, label: "Dark" },
                  { id: "system" as ThemeType, icon: Monitor, label: "System" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => changeThemeSetting(item.id)}
                      className={`p-2.5 rounded-full cursor-pointer transition-all ${
                        theme === item.id ? "bg-accent text-black" : "text-muted"
                      }`}
                      aria-label={`Set theme to ${item.label}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6"
              >
                <Link
                  href="#pricing"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center bg-cta hover:bg-cta-dark text-white font-heading font-bold text-base uppercase tracking-wider rounded-full px-10 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-cta/25 active:scale-95"
                >
                  Join Today
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
