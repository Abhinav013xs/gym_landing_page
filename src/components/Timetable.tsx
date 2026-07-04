"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Filter } from "lucide-react";
import { timetable, ClassSlot } from "@/lib/data";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
type DayType = typeof days[number];

const classTypes = ["Yoga", "HIIT", "CrossFit", "Strength", "Zumba", "Cardio"] as const;
type ClassType = typeof classTypes[number];

// Helper to get color dot for each class type
const getClassColor = (className: string) => {
  switch (className) {
    case "Yoga":
      return "bg-emerald-500 shadow-emerald-500/50";
    case "HIIT":
      return "bg-red-500 shadow-red-500/50";
    case "CrossFit":
      return "bg-amber-500 shadow-amber-500/50";
    case "Strength":
      return "bg-blue-500 shadow-blue-500/50";
    case "Zumba":
      return "bg-pink-500 shadow-pink-500/50";
    case "Cardio":
      return "bg-teal-500 shadow-teal-500/50";
    default:
      return "bg-gray-500 shadow-gray-500/50";
  }
};

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<DayType>("monday");
  const [activeFilter, setActiveFilter] = useState<ClassType | "All">("All");

  // Get active classes for the day, filtered by type if activeFilter is set
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
  
  // Split classes into morning (before 12 PM) and evening (after 12 PM)
  const morningClasses = currentClasses.filter((c) => c.time.includes("AM"));
  const eveningClasses = currentClasses.filter((c) => c.time.includes("PM"));

  return (
    <section id="timetable" className="section-padding bg-white relative overflow-hidden" aria-labelledby="timetable-heading">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
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
            className="text-3xl md:text-5xl font-heading font-extrabold text-primary mt-2"
          >
            Daily Timetable
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base mt-4 leading-relaxed"
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
          transition={{ delay: 0.3 }}
          className="flex justify-start md:justify-center overflow-x-auto pb-4 mb-8 no-scrollbar gap-2 px-2"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 font-heading font-bold text-sm rounded-full transition-all duration-300 capitalize shrink-0 cursor-pointer ${
                selectedDay === day
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-background text-primary hover:bg-accent/10"
              }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Class Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10 items-center px-4"
        >
          <span className="text-sm font-semibold text-muted flex items-center gap-1.5 mr-2">
            <Filter className="w-4 h-4 text-accent" /> Filter:
          </span>
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              activeFilter === "All"
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted border-border hover:border-muted"
            }`}
          >
            All Classes
          </button>
          {classTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                activeFilter === type
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-white text-muted border-border hover:border-accent/40"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${getClassColor(type)}`} />
              {type}
            </button>
          ))}
        </motion.div>

        {/* Timetable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Morning Sessions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Morning Sessions
              </h3>
              <span className="text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-wider">
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
                        ? "bg-white border-border shadow-sm hover:border-accent/30 hover:shadow-md translate-x-0"
                        : "bg-background/40 border-transparent opacity-40 scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono font-bold text-lg text-primary bg-background px-3 py-1.5 rounded-xl">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-base text-primary">
                          {item.className}
                        </h4>
                        <span className="text-xs text-muted">Group Session • 50 mins</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted capitalize hidden sm:inline">
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
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Evening Sessions
              </h3>
              <span className="text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full uppercase tracking-wider">
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
                        ? "bg-white border-border shadow-sm hover:border-accent/30 hover:shadow-md translate-x-0"
                        : "bg-background/40 border-transparent opacity-40 scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono font-bold text-lg text-primary bg-background px-3 py-1.5 rounded-xl">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-heading font-bold text-base text-primary">
                          {item.className}
                        </h4>
                        <span className="text-xs text-muted">Group Session • 50 mins</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted capitalize hidden sm:inline">
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
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-3.5 rounded-full font-heading font-bold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Calendar className="w-5 h-5" /> Book a Trial Class Slot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
