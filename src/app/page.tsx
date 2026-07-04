"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Transformations from "@/components/Transformations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Programs from "@/components/Programs";
import Trainers from "@/components/Trainers";
import Timetable from "@/components/Timetable";
import Pricing from "@/components/Pricing";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ExitIntent from "@/components/ExitIntent";
import FloatingCTAs from "@/components/FloatingCTAs";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Fake initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center text-white">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute w-full h-full border-4 border-accent/20 rounded-full" />
          <div className="absolute w-full h-full border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-heading font-extrabold text-2xl text-accent animate-pulse">J</span>
        </div>
        <p className="mt-4 font-heading font-bold tracking-wider text-sm text-white/60 uppercase">
          Jerai Fitness Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <TrustBadges />
        <Transformations />
        <WhyChooseUs />
        <Programs />
        <Trainers />
        <Timetable />
        <Pricing />
        <Calculator />
        <Testimonials />
        <Gallery />
        <FAQ />
        <LeadForm />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA buttons (WhatsApp, Call, Back to Top) */}
      <FloatingCTAs />

      {/* Exit Intent free trial popup */}
      <ExitIntent />

      {/* Theme Toggle Button (Floating) */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 left-6 z-40 bg-white dark:bg-surface-dark border border-border dark:border-border-dark text-primary dark:text-white p-3.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-800" />}
      </button>
    </div>
  );
}
