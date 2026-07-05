/* ===================================================================
 * Centralized data store for Legacy Athletics.
 * All mock content — transformations, programs, trainers, pricing,
 * testimonials, FAQs, timetable, gallery, trust badges — lives here.
 * =================================================================== */

// ───────────────────────── Transformations ─────────────────────────
export interface Transformation {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female";
  weightBefore: number;
  weightAfter: number;
  fatBefore: number; // Body Fat reduction metrics
  fatAfter: number;
  duration: string;
  program: string;
  quote: string;
  beforeGradient: string;
  afterGradient: string;
}

export const transformations: Transformation[] = [
  { id: 1, name: "Rahul Sharma", age: 28, gender: "Male", weightBefore: 92, weightAfter: 72, fatBefore: 28, fatAfter: 14, duration: "5 Months", program: "Weight Loss", quote: "I never believed I could transform until I joined Legacy.", beforeGradient: "from-gray-800 to-gray-950", afterGradient: "from-amber-600 to-amber-700" },
  { id: 2, name: "Priya Patel", age: 25, gender: "Female", weightBefore: 78, weightAfter: 58, fatBefore: 32, fatAfter: 19, duration: "6 Months", program: "Elite Transformation", quote: "The coaching team here completely redefined my limits.", beforeGradient: "from-gray-800 to-gray-900", afterGradient: "from-amber-600 to-yellow-600" },
  { id: 3, name: "Arjun Reddy", age: 32, gender: "Male", weightBefore: 105, weightAfter: 80, fatBefore: 30, fatAfter: 15, duration: "8 Months", program: "Weight Loss", quote: "Lost 25 kg and built muscle mass I never thought possible.", beforeGradient: "from-slate-800 to-slate-950", afterGradient: "from-amber-500 to-yellow-500" },
  { id: 4, name: "Sneha Gupta", age: 30, gender: "Female", weightBefore: 70, weightAfter: 55, fatBefore: 29, fatAfter: 18, duration: "4 Months", program: "HIIT Conditioning", quote: "Every session feels like an elite performance trial.", beforeGradient: "from-zinc-800 to-zinc-950", afterGradient: "from-amber-600 to-amber-800" },
  { id: 5, name: "Vikram Singh", age: 35, gender: "Male", weightBefore: 65, weightAfter: 82, fatBefore: 18, fatAfter: 10, duration: "10 Months", program: "Physique Hypertrophy", quote: "Gained 17 kg of lean mass. The nutrition setup is top-tier.", beforeGradient: "from-neutral-800 to-neutral-900", afterGradient: "from-amber-600 to-yellow-700" },
  { id: 6, name: "Ananya Desai", age: 27, gender: "Female", weightBefore: 85, weightAfter: 62, fatBefore: 35, fatAfter: 20, duration: "7 Months", program: "Personal Coaching", quote: "The 3D scanning and personalized metrics kept me fully accountable.", beforeGradient: "from-gray-800 to-gray-950", afterGradient: "from-yellow-600 to-amber-600" },
  { id: 7, name: "Karan Mehta", age: 40, gender: "Male", weightBefore: 98, weightAfter: 78, fatBefore: 27, fatAfter: 13, duration: "6 Months", program: "Strength Training", quote: "At 40, I have never felt more athletic or disciplined.", beforeGradient: "from-stone-800 to-stone-950", afterGradient: "from-amber-500 to-amber-700" },
  { id: 8, name: "Deepika Nair", age: 29, gender: "Female", weightBefore: 72, weightAfter: 56, fatBefore: 31, fatAfter: 21, duration: "5 Months", program: "Athletic Conditioning", quote: "An exclusive space with zero distractions and expert coaches.", beforeGradient: "from-zinc-800 to-zinc-900", afterGradient: "from-yellow-500 to-amber-600" },
  { id: 9, name: "Rohit Joshi", age: 26, gender: "Male", weightBefore: 60, weightAfter: 75, fatBefore: 15, fatAfter: 9, duration: "8 Months", program: "Powerbuilding", quote: "Finally broke my plateau and gained the density I wanted.", beforeGradient: "from-gray-800 to-gray-950", afterGradient: "from-amber-600 to-orange-700" },
  { id: 10, name: "Meera Kapoor", age: 33, gender: "Female", weightBefore: 90, weightAfter: 68, fatBefore: 36, fatAfter: 22, duration: "9 Months", program: "CrossFit Performance", quote: "Rebuilt my body composition and mental stamina completely.", beforeGradient: "from-slate-800 to-slate-900", afterGradient: "from-yellow-600 to-yellow-500" },
  { id: 11, name: "Aditya Verma", age: 22, gender: "Male", weightBefore: 55, weightAfter: 72, fatBefore: 16, fatAfter: 8, duration: "7 Months", program: "Muscle Building", quote: "Legacy trainers gave me a science-backed roadmap to get strong.", beforeGradient: "from-neutral-800 to-neutral-950", afterGradient: "from-amber-600 to-yellow-600" },
  { id: 12, name: "Ritu Agarwal", age: 45, gender: "Female", weightBefore: 82, weightAfter: 65, fatBefore: 34, fatAfter: 22, duration: "6 Months", program: "Longevity Fitness", quote: "Age-friendly training combined with mobility work. I feel 20 years younger.", beforeGradient: "from-gray-800 to-gray-950", afterGradient: "from-amber-500 to-amber-600" },
];

// ───────────────────────── Trust Badges ─────────────────────────
export interface TrustBadge {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  { id: 1, title: "Personal Coaching", icon: "Award", description: "All coaches are certified sports nutritionists and conditioning experts" },
  { id: 2, title: "Modern Equipment", icon: "Dumbbell", description: "Exclusively equipped with premium Technogym and Olympic setups" },
  { id: 3, title: "Customized Diet Plans", icon: "Apple", description: "Bi-weekly body scans paired with exact macro configurations" },
  { id: 4, title: "Premium Environment", icon: "Users", description: "Excellently designed facilities catering to focused athletes" },
  { id: 5, title: "Flexible Timings", icon: "Clock", description: "Open 5:00 AM to 11:00 PM to match your work schedule" },
  { id: 6, title: "Group Sessions", icon: "BadgeIndianRupee", description: "Staggered high-energy small group CrossFit and HIIT programs" },
];

// ───────────────────────── Why Choose Us ─────────────────────────
export interface WhyChooseItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export const whyChooseUs: WhyChooseItem[] = [
  { id: 1, title: "Personal Coaching", icon: "GraduationCap", description: "One-on-one expert trainers mapping your exact path to success." },
  { id: 2, title: "Customized Diet Plans", icon: "ClipboardList", description: "Targeted metabolic nutrition plans tailored to your lifestyle." },
  { id: 3, title: "Certified Trainers", icon: "Salad", description: "Coaches holding elite international accreditations (ACE, ISSA, NASM)." },
  { id: 4, title: "Modern Equipment", icon: "HeartHandshake", description: "State-of-the-art strength and performance machinery." },
  { id: 5, title: "Premium Environment", icon: "Dumbbell", description: "High-end luxury facility engineered to optimize concentration." },
  { id: 6, title: "Flexible Timings", icon: "Clock", description: "Matches your executive workflow, open 7 days a week." },
  { id: 7, title: "Group Sessions", icon: "Activity", description: "Engaging high-intensity classes driven by expert instructors." },
  { id: 8, title: "Fat Loss Programs", icon: "TrendingDown", description: "Science-backed metabolic programming for active fat loss." },
  { id: 9, title: "Muscle Gain Programs", icon: "TrendingUp", description: "Structured progressive resistance training for lean hypertrophy." },
];

// ───────────────────────── Programs ─────────────────────────
export interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  gradient: string;
}

export const programs: Program[] = [
  { id: 1, title: "Fat Loss Focus", description: "High-metabolic conditioning protocols integrated with targeted calorie deficits for sustainable body transformation.", duration: "12 Weeks", icon: "TrendingDown", gradient: "from-amber-600 to-amber-800" },
  { id: 2, title: "Muscle Gain split", description: "Hypertrophy-focused training templates emphasizing compound movements and linear progressive loads.", duration: "16 Weeks", icon: "TrendingUp", gradient: "from-amber-500 to-yellow-600" },
  { id: 3, title: "Strength Training", description: "Build heavy-duty raw power using barbell-focused powerlifting and weightlifting methods.", duration: "Ongoing", icon: "Dumbbell", gradient: "from-neutral-700 to-neutral-800" },
  { id: 4, title: "Bodybuilding Elite", description: "Esthetic volume protocols, detailing symmetry improvements and posing coaching for advanced athletes.", duration: "24 Weeks", icon: "Trophy", gradient: "from-amber-600 to-yellow-700" },
  { id: 5, title: "CrossFit Performance", description: "Constant high-intensity functional classes designed to build maximum work capacity and cardiovascular endurance.", duration: "Ongoing", icon: "Flame", gradient: "from-amber-700 to-orange-700" },
  { id: 6, title: "HIIT Conditioning", description: "Short-burst oxygen-debt intervals that elevate metabolic output for up to 36 hours post-workout.", duration: "8 Weeks", icon: "Zap", gradient: "from-yellow-600 to-amber-700" },
  { id: 7, title: "Personal Training Deluxe", description: "Highly exclusive one-on-one sessions customized to your specific orthopedic requirements and goals.", duration: "Flexible", icon: "UserCheck", gradient: "from-neutral-800 to-neutral-900" },
  { id: 8, title: "Women's Conditioning", description: "Tailored programs emphasizing core strength, glute activation, flexibility, and overall athletic tone.", duration: "Ongoing", icon: "Heart", gradient: "from-yellow-500 to-amber-600" },
];

// ───────────────────────── Trainers ─────────────────────────
export interface Trainer {
  id: number;
  name: string;
  experience: string;
  specialization: string;
  certifications: string[];
  gradient: string;
  initials: string;
}

export const trainers: Trainer[] = [
  { id: 1, name: "Rajesh Kumar", experience: "12 Years", specialization: "Strength & Conditioning", certifications: ["ACE Certified", "NSCA-CSCS"], gradient: "from-neutral-800 to-neutral-950", initials: "RK" },
  { id: 2, name: "Priya Mehra", experience: "8 Years", specialization: "Athletic Tone & Pilates", certifications: ["ISSA Certified", "RYT-500"], gradient: "from-amber-700 to-amber-900", initials: "PM" },
  { id: 3, name: "Arjun Nair", experience: "10 Years", specialization: "Bodybuilding & Macros", certifications: ["NASM-CPT", "Precision Nutrition L2"], gradient: "from-neutral-850 to-neutral-950", initials: "AN" },
  { id: 4, name: "Kavitha Iyer", experience: "6 Years", specialization: "CrossFit & Olympic Lifting", certifications: ["CrossFit L2", "USAW Coach"], gradient: "from-yellow-700 to-amber-900", initials: "KI" },
];

// ───────────────────────── Pricing ─────────────────────────
export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1, name: "Starter", price: "₹1,999", period: "/month", description: "Essential training setup for active starters",
    features: ["Access to Gym Floor", "Technogym Equipment Access", "Locker Room & Steam", "Group Classes (2/week)", "Initial Body Composition Scan"],
    highlighted: false,
  },
  {
    id: 2, name: "Elite", price: "₹5,999", period: "/month", description: "The ultimate training suite highlighting personal coaching",
    features: ["24/7 Premium Facility Access", "Daily One-on-One Coaching", "Custom Metabolic Nutrition Plans", "Bi-weekly InBody 3D Scans", "Access to Recovery & Sauna Lounges", "VIP Locker & Laundry Service", "Complimentary Guest Passes"],
    highlighted: true, badge: "Most Requested",
  },
  {
    id: 3, name: "Pro", price: "₹3,499", period: "/month", description: "Designed for intermediate athletes pushing boundaries",
    features: ["Full Gym Floor Access", "Unlimited Group Sessions", "Personal Trainer (2/week)", "Monthly Diet Consultations", "Sauna & Steam Bath Access", "Priority Slot Reservations"],
    highlighted: false,
  },
];

// ───────────────────────── Testimonials ─────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  initials: string;
  program: string;
  result: string; // Body fat / Weight metric
}

export const testimonials: Testimonial[] = [
  { id: 1, name: "Amit Khanna", rating: 5, review: "Absolutely world-class! The custom diet plans combined with 3D scanning guided my transformation. Gained density and lost 15 kg.", initials: "AK", program: "Weight Loss", result: "Lost 15 kg • Fat -10%" },
  { id: 2, name: "Sunita Rao", rating: 5, review: "Legacy provides an exclusive, clean environment with certified coaches. The conditioning classes are incredible.", initials: "SR", program: "Women's Fitness", result: "Fat -8% • Gained Strength" },
  { id: 3, name: "Manish Tiwari", rating: 5, review: "Daily personal coaching changed my life. My trainer was extremely professional and mapped my progressive loads scientifically.", initials: "MT", program: "Elite Transformation", result: "Lost 22 kg • Fat -12%" },
];

// ───────────────────────── Timetable ─────────────────────────
export interface ClassSlot {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

export const timetable: ClassSlot[] = [
  { time: "6:00 AM", monday: "Yoga", tuesday: "HIIT", wednesday: "Yoga", thursday: "HIIT", friday: "Yoga", saturday: "CrossFit" },
  { time: "7:00 AM", monday: "CrossFit", tuesday: "Strength", wednesday: "CrossFit", thursday: "Strength", friday: "CrossFit", saturday: "Yoga" },
  { time: "8:00 AM", monday: "Cardio", tuesday: "Zumba", wednesday: "Cardio", thursday: "Zumba", friday: "Cardio", saturday: "HIIT" },
  { time: "9:00 AM", monday: "Strength", tuesday: "Cardio", wednesday: "Strength", thursday: "Cardio", friday: "Strength", saturday: "Strength" },
  { time: "5:00 PM", monday: "Zumba", tuesday: "CrossFit", wednesday: "Zumba", thursday: "CrossFit", friday: "Zumba", saturday: "Cardio" },
  { time: "6:00 PM", monday: "HIIT", tuesday: "Yoga", wednesday: "HIIT", thursday: "Yoga", friday: "HIIT", saturday: "Zumba" },
  { time: "7:00 PM", monday: "Strength", tuesday: "HIIT", wednesday: "Strength", thursday: "HIIT", friday: "Strength", saturday: "Yoga" },
  { time: "8:00 PM", monday: "Cardio", tuesday: "Strength", wednesday: "Cardio", thursday: "Strength", friday: "Cardio", saturday: "CrossFit" },
];

// ───────────────────────── Gallery ─────────────────────────
export interface GalleryImage {
  id: number;
  title: string;
  gradient: string;
  span: string; // Tailwind grid span classes
}

export const galleryImages: GalleryImage[] = [
  { id: 1, title: "Workout Area", gradient: "from-neutral-900 to-neutral-800", span: "col-span-2 row-span-2" },
  { id: 2, title: "Cardio Zone", gradient: "from-amber-950 to-amber-900", span: "col-span-1 row-span-1" },
  { id: 3, title: "Strength Area", gradient: "from-neutral-850 to-neutral-750", span: "col-span-1 row-span-1" },
  { id: 4, title: "Group Classes", gradient: "from-yellow-950 to-yellow-900", span: "col-span-1 row-span-2" },
  { id: 5, title: "Modern Machines", gradient: "from-neutral-900 to-neutral-800", span: "col-span-1 row-span-1" },
  { id: 6, title: "Locker Room", gradient: "from-amber-900 to-neutral-900", span: "col-span-1 row-span-1" },
  { id: 7, title: "Nutrition Corner", gradient: "from-neutral-850 to-amber-950", span: "col-span-2 row-span-1" },
  { id: 8, title: "Reception", gradient: "from-yellow-900 to-neutral-950", span: "col-span-1 row-span-1" },
];

// ───────────────────────── FAQs ─────────────────────────
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  { id: 1, question: "Do beginners need any prior experience?", answer: "Absolutely not. Our Elite coaches design entry-level progressions matching your base metrics. We meet you where you are and guide you step-by-step." },
  { id: 2, question: "Do you provide diet plans?", answer: "Yes, customized nutrition planning is integrated into our Pro and Elite memberships. We calculate your resting metabolic rate and provide daily macronutrient splits." },
  { id: 3, question: "Are personal trainers available?", answer: "Yes, we have 8+ certified sports science trainers available. Starter plans can book pay-per-session, Pro includes 2 sessions/week, and Elite offers daily custom training." },
  { id: 4, question: "Can women join the gym?", answer: "Yes, Legacy offers a safe and highly respectful training environment. We have customized conditioning classes, group training modules, and certified female coaches." },
  { id: 5, question: "Is there parking available?", answer: "Yes, we offer complimentary secure parking for members with 24/7 CCTV surveillance and valet support." },
  { id: 6, question: "What are the gym timings?", answer: "We are open Monday through Saturday from 5:00 AM to 11:00 PM, and Sunday from 6:00 AM to 6:00 PM." },
  { id: 7, question: "Is a free trial available?", answer: "Yes. You can book a complimentary 1-day pass which includes a complete facility tour, InBody composition scan, and a custom consultation." },
];

// ───────────────────────── Stats ─────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const heroStats: Stat[] = [
  { value: 1000, suffix: "+", label: "Active Members" },
  { value: 500, suffix: "+", label: "Transformations" },
  { value: 8, suffix: "+", label: "Certified Coaches" },
  { value: 5, suffix: "★", label: "Average Rating" },
];
