"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { timetable } from "@/lib/data";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
type DayType = typeof days[number];

const classTypes = ["Yoga", "HIIT", "CrossFit", "Strength", "Zumba", "Cardio"] as const;
type ClassType = typeof classTypes[number];

const getClassColor = (className: string) => {
  switch (className) {
    case "Yoga":
      return "bg-emerald-500 shadow-emerald-500/30";
    case "HIIT":
      return "bg-rose-500 shadow-rose-500/30";
    case "CrossFit":
      return "bg-accent shadow-accent/30"; // Gold
    case "Strength":
      return "bg-sky-500 shadow-sky-500/30";
    case "Zumba":
      return "bg-pink-500 shadow-pink-500/30";
    case "Cardio":
      return "bg-teal-500 shadow-teal-500/30";
    default:
      return "bg-gray-500 shadow-gray-500/30";
  }
};

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<DayType>("monday");
  const [activeFilter, setActiveFilter] = useState<ClassType | "All">("All");

  const getDayClasses = () => {
    return timetable.map((slot) => {
      const className = slot[selectedDay];
      const matchesFilter = activeFilter === "All" || className === activeFilter;
      return {
        time: slot.time,
        className,
        isMatched: matchesFilter,
      };
    });
  };

  const currentClasses = getDayClasses();
  const morningClasses = currentClasses.filter((c) => c.time.includes("AM"));
  const eveningClasses = currentClasses.filter((c) => c.time.includes("PM"));

  return (
    <section id="timetable" className="section-padding bg-background relative overflow-hidden" aria-labelledby="timetable-heading">
      {/* Decorative Background Elements */}
      <div className="glow-spot glow-gold top-10 right-10 scale-125 opacity-5" />
      <div className="glow-spot glow-crimson bottom-10 left-10 scale-125 opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold text-sm tracking-[0.2em] uppercase"
          >
            Class Schedule
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="timetable-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-2"
          >
            Daily Timetable
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base mt-4 leading-relaxed font-medium"
          >
            Plan your workouts with our flexible class schedule. We offer professional group sessions 
            led by certified trainers from early morning to late night.
          </motion.p>
        </div>

        {/* Day Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10 px-4"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                selectedDay === day
                  ? "bg-accent border-accent text-black shadow-lg shadow-accent/25"
                  : "bg-surface border-white/5 text-white/80 hover:text-white hover:border-white/10"
              }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Class Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-16 px-4"
        >
          <span className="text-xs font-bold text-muted uppercase tracking-wider mr-2 hidden sm:inline">
            Filter by:
          </span>
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
              activeFilter === "All"
                ? "border-accent bg-accent/15 text-white"
                : "border-white/10 text-muted hover:text-white hover:border-white/20"
            }`}
          >
            All Classes
          </button>
          {classTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeFilter === type
                  ? "border-accent bg-accent/15 text-white"
                  : "border-white/10 text-muted hover:text-white hover:border-white/20"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${getClassColor(type)}`} />
              {type}
            </button>
          ))}
        </motion.div>

        {/* Timetable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4">
          {/* Morning Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Morning Sessions
              </h3>
              <span className="text-[10px] font-bold bg-accent/15 text-accent px-3 py-1 rounded-full uppercase tracking-wider">
                6:00 AM - 10:00 AM
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {morningClasses.map((item, index) => (
                  <motion.div
                    key={`${selectedDay}-morning-${index}-${item.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                      item.isMatched
                        ? "bg-surface border-white/5 shadow-xl hover:border-accent/20 translate-x-0"
                        : "bg-background/20 border-transparent opacity-20 scale-[0.98] pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono font-extrabold text-sm text-white bg-background border border-white/5 px-3 py-1.5 rounded-xl">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          {item.className}
                        </h4>
                        <span className="text-xs text-muted font-medium">Group Session • 50 mins</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider hidden sm:inline">
                        Instructor Led
                      </span>
                      <span className={`w-3 h-3 rounded-full shadow-lg ${getClassColor(item.className)}`} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Evening Sessions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Evening Sessions
              </h3>
              <span className="text-[10px] font-bold bg-accent/15 text-accent px-3 py-1 rounded-full uppercase tracking-wider">
                5:00 PM - 9:00 PM
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {eveningClasses.map((item, index) => (
                  <motion.div
                    key={`${selectedDay}-evening-${index}-${item.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                      item.isMatched
                        ? "bg-surface border-white/5 shadow-xl hover:border-accent/20 translate-x-0"
                        : "bg-background/20 border-transparent opacity-20 scale-[0.98] pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono font-extrabold text-sm text-white bg-background border border-white/5 px-3 py-1.5 rounded-xl">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-base text-white">
                          {item.className}
                        </h4>
                        <span className="text-xs text-muted font-medium">Group Session • 50 mins</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-wider hidden sm:inline">
                        Instructor Led
                      </span>
                      <span className={`w-3 h-3 rounded-full shadow-lg ${getClassColor(item.className)}`} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Timetable CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white px-10 py-4.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-cta/25 cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> Book a Trial Class Slot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
