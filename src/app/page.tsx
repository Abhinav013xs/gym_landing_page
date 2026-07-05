"use client";

import React, { useState, useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulated preloading delay to organize visual assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute w-full h-full border-4 border-accent/20 rounded-full" />
          <div className="absolute w-full h-full border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-heading font-extrabold text-3xl text-accent animate-pulse">L</span>
        </div>
        <p className="mt-5 font-heading font-bold tracking-[0.25em] text-xs text-white/50 uppercase">
          Legacy Athletics Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col bg-background text-primary">
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

      {/* Exit Intent free trial pass voucher */}
      <ExitIntent />
    </div>
  );
}
