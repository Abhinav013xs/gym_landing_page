"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator as CalcIcon, Scale, Flame, Target, Activity, RefreshCw } from "lucide-react";

type TabType = "bmi" | "calories" | "bodyfat" | "macros";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<TabType>("bmi");

  // State for BMI
  const [bmiWeight, setBmiWeight] = useState<string>("70");
  const [bmiHeight, setBmiHeight] = useState<string>("175");
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string; color: string; percent: number } | null>(null);

  // State for Calories
  const [calGender, setCalGender] = useState<"Male" | "Female">("Male");
  const [calAge, setCalAge] = useState<string>("25");
  const [calWeight, setCalWeight] = useState<string>("70");
  const [calHeight, setCalHeight] = useState<string>("175");
  const [calActivity, setCalActivity] = useState<string>("1.55"); // Moderate default
  const [calResult, setCalResult] = useState<{ bmr: number; tdee: number } | null>(null);

  // State for Body Fat
  const [bfGender, setBfGender] = useState<"Male" | "Female">("Male");
  const [bfHeight, setBfHeight] = useState<string>("175");
  const [bfWaist, setBfWaist] = useState<string>("85");
  const [bfNeck, setBfNeck] = useState<string>("38");
  const [bfHip, setBfHip] = useState<string>("90"); // Females only
  const [bfResult, setBfResult] = useState<number | null>(null);

  // State for Macros
  const [macroCalories, setMacroCalories] = useState<string>("2000");
  const [macroGoal, setMacroGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [macroResult, setMacroResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  // Calculation Handlers
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = "";
      let color = "";
      let percent = 0; // slider mapping from 15 to 40 BMI

      if (bmi < 18.5) {
        category = "Underweight";
        color = "text-blue-500";
        percent = Math.max(0, Math.min(100, ((bmi - 12) / 6.5) * 20)); // scale below 18.5
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal Weight";
        color = "text-success";
        percent = 20 + ((bmi - 18.5) / 6.5) * 20; // 18.5 - 25 maps to 20% - 40%
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        color = "text-amber-500";
        percent = 40 + ((bmi - 25) / 5) * 20; // 25 - 30 maps to 40% - 60%
      } else {
        category = "Obese";
        color = "text-red-500";
        percent = 60 + Math.min(40, ((bmi - 30) / 10) * 40); // 30+ maps to 60% - 100%
      }

      setBmiResult({ value: bmi, category, color, percent });
    }
  };

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(calWeight);
    const h = parseFloat(calHeight);
    const age = parseFloat(calAge);
    const multiplier = parseFloat(calActivity);

    if (w > 0 && h > 0 && age > 0) {
      let bmr = 0;
      if (calGender === "Male") {
        bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * age;
      } else {
        bmr = 447.593 + 9.247 * w + 3.098 * h - 4.330 * age;
      }
      const tdee = bmr * multiplier;
      setCalResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });

      // Auto fill macros calories with the calculated maintenance
      setMacroCalories(Math.round(tdee).toString());
    }
  };

  const calculateBodyFat = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(bfHeight);
    const w = parseFloat(bfWaist);
    const n = parseFloat(bfNeck);
    const hip = parseFloat(bfHip);

    if (h > 0 && w > 0 && n > 0) {
      let bf = 0;
      if (bfGender === "Male") {
        bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
      } else {
        if (hip > 0) {
          bf = 163.205 * Math.log10(w + hip - n) - 97.684 * Math.log10(h) - 78.387;
        }
      }
      setBfResult(parseFloat(Math.max(2, Math.min(50, bf)).toFixed(1)));
    }
  };

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    const cal = parseFloat(macroCalories);
    if (cal > 0) {
      let pPct = 0.3; // protein percent
      let cPct = 0.4; // carbs percent
      let fPct = 0.3; // fat percent

      if (macroGoal === "lose") {
        pPct = 0.4;
        cPct = 0.3;
        fPct = 0.3;
      } else if (macroGoal === "gain") {
        pPct = 0.35;
        cPct = 0.45;
        fPct = 0.2;
      }

      const proteinGrams = Math.round((cal * pPct) / 4);
      const carbsGrams = Math.round((cal * cPct) / 4);
      const fatGrams = Math.round((cal * fPct) / 9);

      setMacroResult({ protein: proteinGrams, carbs: carbsGrams, fat: fatGrams });
    }
  };

  return (
    <section id="calculator" className="section-padding bg-background" aria-labelledby="calc-heading">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold text-sm tracking-[0.2em] uppercase"
          >
            Fitness Tools
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="calc-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-primary mt-2"
          >
            Calculate Your Stats
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-sm md:text-base mt-4 leading-relaxed"
          >
            Get instant science-backed insights into your body composition, daily calorie requirements, 
            and targeted macronutrient splits to optimize your health journey.
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "bmi", label: "BMI Calculator", icon: Scale },
            { id: "calories", label: "Calories & TDEE", icon: Flame },
            { id: "bodyfat", label: "Body Fat %", icon: Activity },
            { id: "macros", label: "Macro Split", icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                }}
                className={`px-5 py-3 rounded-full text-sm font-heading font-bold flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "bg-white text-primary border border-border hover:bg-accent/5 hover:border-accent/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white rounded-3xl border border-border shadow-xl p-6 md:p-10 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* BMI Tab */}
            {activeTab === "bmi" && (
              <motion.div
                key="bmi-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <form onSubmit={calculateBMI} className="space-y-6">
                  <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2 mb-4">
                    <Scale className="w-5 h-5 text-accent" /> Body Mass Index (BMI)
                  </h3>
                  
                  {/* Height Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-primary">Height (cm)</label>
                      <span className="text-sm font-mono font-bold text-accent">{bmiHeight} cm</span>
                    </div>
                    <input
                      type="range"
                      min="120"
                      max="220"
                      value={bmiHeight}
                      onChange={(e) => setBmiHeight(e.target.value)}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>

                  {/* Weight Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-primary">Weight (kg)</label>
                      <span className="text-sm font-mono font-bold text-accent">{bmiWeight} kg</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="150"
                      value={bmiWeight}
                      onChange={(e) => setBmiWeight(e.target.value)}
                      className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Calculate BMI
                  </button>
                </form>

                {/* BMI Results display */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border flex flex-col justify-center h-full min-h-[280px]">
                  {bmiResult ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-6"
                    >
                      <div>
                        <span className="text-xs font-bold text-muted uppercase tracking-wider block">Your BMI is</span>
                        <h4 className="text-5xl font-heading font-extrabold text-primary mt-1">{bmiResult.value}</h4>
                        <span className={`text-lg font-bold block mt-1 ${bmiResult.color}`}>
                          {bmiResult.category}
                        </span>
                      </div>

                      {/* BMI Gauge visual */}
                      <div className="relative pt-4">
                        <div className="h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full relative">
                          <motion.div
                            initial={{ left: 0 }}
                            animate={{ left: `${bmiResult.percent}%` }}
                            transition={{ type: "spring", stiffness: 80 }}
                            className="absolute -top-1.5 w-6 h-6 bg-white border-4 border-accent rounded-full -ml-3 shadow-md"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted font-bold mt-2 px-1">
                          <span>18.5 (Under)</span>
                          <span>25.0 (Normal)</span>
                          <span>30.0 (Over)</span>
                        </div>
                      </div>

                      <p className="text-xs text-muted leading-relaxed">
                        *BMI is a general weight indicator. Lean muscle mass, bone density, and body fat percentage 
                        distribution vary by individual.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="text-center text-muted space-y-3 py-10">
                      <Scale className="w-12 h-12 mx-auto text-muted/30 stroke-[1.5]" />
                      <p className="text-sm font-semibold">Enter your height and weight and press calculate.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Calories Tab */}
            {activeTab === "calories" && (
              <motion.div
                key="calories-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <form onSubmit={calculateCalories} className="space-y-4">
                  <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-accent" /> Calorie & TDEE Calculator
                  </h3>
                  
                  {/* Gender Selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setCalGender("Male")}
                      className={`py-2 px-4 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                        calGender === "Male"
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-muted"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalGender("Female")}
                      className={`py-2 px-4 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                        calGender === "Female"
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-muted"
                      }`}
                    >
                      Female
                    </button>
                  </div>

                  {/* Age, Weight, Height Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted block mb-1">Age</label>
                      <input
                        type="number"
                        value={calAge}
                        onChange={(e) => setCalAge(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted block mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={calWeight}
                        onChange={(e) => setCalWeight(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={calHeight}
                        onChange={(e) => setCalHeight(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                  </div>

                  {/* Activity Level Dropdown */}
                  <div>
                    <label className="text-xs font-semibold text-muted block mb-1">Activity Level</label>
                    <select
                      value={calActivity}
                      onChange={(e) => setCalActivity(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-semibold focus:border-accent outline-none"
                    >
                      <option value="1.2">Sedentary (Little or no exercise)</option>
                      <option value="1.375">Light (Exercise 1-3 times/week)</option>
                      <option value="1.55">Moderate (Exercise 3-5 times/week)</option>
                      <option value="1.725">Active (Hard exercise 6-7 times/week)</option>
                      <option value="1.9">Very Active (Intense daily exercise/physical job)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Calculate Calories
                  </button>
                </form>

                {/* Calories Result display */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border flex flex-col justify-center h-full min-h-[300px]">
                  {calResult ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="text-center border-b border-border pb-4">
                        <span className="text-xs font-bold text-muted uppercase tracking-wider block">Maintenance Calories (TDEE)</span>
                        <h4 className="text-4xl font-heading font-extrabold text-accent mt-1">
                          {calResult.tdee} <span className="text-sm font-semibold text-primary">kcal/day</span>
                        </h4>
                        <span className="text-xs text-muted block mt-1">Basal Metabolic Rate (BMR): {calResult.bmr} kcal/day</span>
                      </div>

                      {/* Scenario goals */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border/60">
                          <span className="text-sm font-semibold text-primary">Weight Loss (-500 kcal)</span>
                          <span className="font-mono font-bold text-sm text-blue-500">{calResult.tdee - 500} kcal/day</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border/60">
                          <span className="text-sm font-semibold text-primary">Weight Maintenance</span>
                          <span className="font-mono font-bold text-sm text-muted">{calResult.tdee} kcal/day</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-border/60">
                          <span className="text-sm font-semibold text-primary">Muscle Gain (+500 kcal)</span>
                          <span className="font-mono font-bold text-sm text-emerald-500">{calResult.tdee + 500} kcal/day</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-muted space-y-3 py-10">
                      <Flame className="w-12 h-12 mx-auto text-muted/30 stroke-[1.5]" />
                      <p className="text-sm font-semibold">Enter your metrics and press calculate.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Body Fat Tab */}
            {activeTab === "bodyfat" && (
              <motion.div
                key="bodyfat-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <form onSubmit={calculateBodyFat} className="space-y-4">
                  <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-accent" /> US Navy Body Fat Estimate
                  </h3>
                  
                  {/* Gender Selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setBfGender("Male")}
                      className={`py-2 px-4 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                        bfGender === "Male"
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-muted"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setBfGender("Female")}
                      className={`py-2 px-4 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                        bfGender === "Female"
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-muted"
                      }`}
                    >
                      Female
                    </button>
                  </div>

                  {/* Input dimensions */}
                  <div className={`grid ${bfGender === "Female" ? "grid-cols-4" : "grid-cols-3"} gap-2`}>
                    <div>
                      <label className="text-[10px] font-bold text-muted block mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={bfHeight}
                        onChange={(e) => setBfHeight(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-2 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted block mb-1">Waist (cm)</label>
                      <input
                        type="number"
                        value={bfWaist}
                        onChange={(e) => setBfWaist(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-2 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-muted block mb-1">Neck (cm)</label>
                      <input
                        type="number"
                        value={bfNeck}
                        onChange={(e) => setBfNeck(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl px-2 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                      />
                    </div>
                    {bfGender === "Female" && (
                      <div>
                        <label className="text-[10px] font-bold text-muted block mb-1">Hip (cm)</label>
                        <input
                          type="number"
                          value={bfHip}
                          onChange={(e) => setBfHip(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-2 py-2 text-sm text-primary font-bold text-center focus:border-accent outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Estimate Body Fat
                  </button>
                </form>

                {/* Body Fat results */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border flex flex-col justify-center h-full min-h-[300px]">
                  {bfResult !== null ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-6"
                    >
                      <div>
                        <span className="text-xs font-bold text-muted uppercase tracking-wider block">Estimated Body Fat %</span>
                        <h4 className="text-5xl font-heading font-extrabold text-primary mt-1">
                          {bfResult}%
                        </h4>
                        <span className="text-xs text-muted block mt-2">
                          Calculated using the US Navy Circumference Method. Margin of error ~3%.
                        </span>
                      </div>

                      {/* Simple status scale depending on gender */}
                      <div className="bg-white border border-border/80 rounded-xl p-4 flex justify-around text-xs">
                        <div>
                          <span className="font-semibold block text-muted">Essential Fat</span>
                          <span className="font-bold text-primary">{bfGender === "Male" ? "2-5%" : "10-13%"}</span>
                        </div>
                        <div>
                          <span className="font-semibold block text-muted">Athletes</span>
                          <span className="font-bold text-primary">{bfGender === "Male" ? "6-13%" : "14-20%"}</span>
                        </div>
                        <div>
                          <span className="font-semibold block text-muted">Average Fitness</span>
                          <span className="font-bold text-primary">{bfGender === "Male" ? "14-24%" : "21-31%"}</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-muted space-y-3 py-10">
                      <Activity className="w-12 h-12 mx-auto text-muted/30 stroke-[1.5]" />
                      <p className="text-sm font-semibold">Enter your body measurements and press estimate.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Macros Tab */}
            {activeTab === "macros" && (
              <motion.div
                key="macros-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              >
                <form onSubmit={calculateMacros} className="space-y-5">
                  <h3 className="font-heading font-extrabold text-xl text-primary flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-accent" /> Macro Target Generator
                  </h3>
                  
                  {/* Daily calorie input */}
                  <div>
                    <label className="text-sm font-semibold text-primary block mb-1">Daily Calorie Target (kcal)</label>
                    <input
                      type="number"
                      value={macroCalories}
                      onChange={(e) => setMacroCalories(e.target.value)}
                      placeholder="e.g. 2000"
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-base text-primary font-bold focus:border-accent outline-none"
                    />
                  </div>

                  {/* Goal selection */}
                  <div>
                    <label className="text-sm font-semibold text-primary block mb-2">Fitness Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "lose", label: "Lose Fat" },
                        { id: "maintain", label: "Maintain" },
                        { id: "gain", label: "Build Muscle" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setMacroGoal(item.id as any)}
                          className={`py-2 px-1 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            macroGoal === item.id
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-border text-muted hover:border-muted"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Calculate Macros
                  </button>
                </form>

                {/* Macro Results */}
                <div className="bg-background/50 rounded-2xl p-6 border border-border flex flex-col justify-center h-full min-h-[300px]">
                  {macroResult ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="text-center">
                        <span className="text-xs font-bold text-muted uppercase tracking-wider block">Daily Targets ({macroCalories} kcal)</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        {/* Protein Card */}
                        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                          <span className="text-xs text-muted block uppercase font-bold">Protein</span>
                          <span className="text-2xl font-heading font-extrabold text-red-500 block mt-2">
                            {macroResult.protein}g
                          </span>
                          <span className="text-[10px] text-muted mt-1 block">
                            {Math.round(macroGoal === "lose" ? 40 : macroGoal === "gain" ? 35 : 30)}% Split
                          </span>
                        </div>

                        {/* Carbs Card */}
                        <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                          <span className="text-xs text-muted block uppercase font-bold">Carbs</span>
                          <span className="text-2xl font-heading font-extrabold text-amber-500 block mt-2">
                            {macroResult.carbs}g
                          </span>
                          <span className="text-[10px] text-muted mt-1 block">
                            {Math.round(macroGoal === "lose" ? 30 : macroGoal === "gain" ? 45 : 40)}% Split
                          </span>
                        </div>

                        {/* Fats Card */}
                        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                          <span className="text-xs text-muted block uppercase font-bold">Fats</span>
                          <span className="text-2xl font-heading font-extrabold text-blue-500 block mt-2">
                            {macroResult.fat}g
                          </span>
                          <span className="text-[10px] text-muted mt-1 block">
                            {Math.round(macroGoal === "lose" ? 30 : macroGoal === "gain" ? 20 : 30)}% Split
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-center text-muted">
                        Split based on recommended sports nutrition profiles for optimal muscle retention and fat metabolism.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-muted space-y-3 py-10">
                      <Target className="w-12 h-12 mx-auto text-muted/30 stroke-[1.5]" />
                      <p className="text-sm font-semibold">Enter your daily calorie target and press calculate.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
