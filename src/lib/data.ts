/* ===================================================================
 * Centralized data store for the entire landing page.
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
  duration: string;
  program: string;
  quote: string;
  beforeGradient: string;
  afterGradient: string;
}

export const transformations: Transformation[] = [
  { id: 1, name: "Rahul Sharma", age: 28, gender: "Male", weightBefore: 92, weightAfter: 72, duration: "5 Months", program: "Weight Loss", quote: "I never believed I could transform until I joined this gym.", beforeGradient: "from-gray-700 to-gray-900", afterGradient: "from-emerald-600 to-teal-700" },
  { id: 2, name: "Priya Patel", age: 25, gender: "Female", weightBefore: 78, weightAfter: 58, duration: "6 Months", program: "Transformation Program", quote: "The trainers here completely changed my relationship with fitness.", beforeGradient: "from-gray-600 to-gray-800", afterGradient: "from-rose-500 to-pink-600" },
  { id: 3, name: "Arjun Reddy", age: 32, gender: "Male", weightBefore: 105, weightAfter: 80, duration: "8 Months", program: "Weight Loss", quote: "Lost 25 kg and gained confidence I never knew I had.", beforeGradient: "from-slate-700 to-slate-900", afterGradient: "from-blue-600 to-cyan-600" },
  { id: 4, name: "Sneha Gupta", age: 30, gender: "Female", weightBefore: 70, weightAfter: 55, duration: "4 Months", program: "HIIT", quote: "HIIT sessions made me fall in love with working out.", beforeGradient: "from-zinc-700 to-zinc-900", afterGradient: "from-violet-500 to-purple-600" },
  { id: 5, name: "Vikram Singh", age: 35, gender: "Male", weightBefore: 65, weightAfter: 82, duration: "10 Months", program: "Bodybuilding", quote: "Gained 17 kg of muscle mass. Best investment of my life.", beforeGradient: "from-neutral-600 to-neutral-800", afterGradient: "from-amber-500 to-orange-600" },
  { id: 6, name: "Ananya Desai", age: 27, gender: "Female", weightBefore: 85, weightAfter: 62, duration: "7 Months", program: "Personal Training", quote: "Personal attention made all the difference in my journey.", beforeGradient: "from-gray-700 to-gray-800", afterGradient: "from-lime-500 to-green-600" },
  { id: 7, name: "Karan Mehta", age: 40, gender: "Male", weightBefore: 98, weightAfter: 78, duration: "6 Months", program: "Strength Training", quote: "At 40, I'm in the best shape of my life.", beforeGradient: "from-stone-700 to-stone-900", afterGradient: "from-sky-500 to-blue-600" },
  { id: 8, name: "Deepika Nair", age: 29, gender: "Female", weightBefore: 72, weightAfter: 56, duration: "5 Months", program: "Women's Fitness", quote: "A safe space where I could push my limits without judgment.", beforeGradient: "from-zinc-600 to-zinc-800", afterGradient: "from-fuchsia-500 to-pink-600" },
  { id: 9, name: "Rohit Joshi", age: 26, gender: "Male", weightBefore: 60, weightAfter: 75, duration: "8 Months", program: "Weight Gain", quote: "Finally gained the mass I've been trying to build for years.", beforeGradient: "from-gray-600 to-gray-900", afterGradient: "from-red-500 to-rose-600" },
  { id: 10, name: "Meera Kapoor", age: 33, gender: "Female", weightBefore: 90, weightAfter: 68, duration: "9 Months", program: "CrossFit", quote: "CrossFit transformed not just my body but my mental strength.", beforeGradient: "from-slate-600 to-slate-800", afterGradient: "from-teal-500 to-cyan-600" },
  { id: 11, name: "Aditya Verma", age: 22, gender: "Male", weightBefore: 55, weightAfter: 72, duration: "7 Months", program: "Muscle Building", quote: "From skinny to strong — this gym made it possible.", beforeGradient: "from-neutral-700 to-neutral-900", afterGradient: "from-indigo-500 to-blue-600" },
  { id: 12, name: "Ritu Agarwal", age: 45, gender: "Female", weightBefore: 82, weightAfter: 65, duration: "6 Months", program: "Senior Fitness", quote: "It's never too late to start. I feel 20 years younger!", beforeGradient: "from-gray-700 to-gray-900", afterGradient: "from-emerald-500 to-green-600" },
];

// ───────────────────────── Trust Badges ─────────────────────────
export interface TrustBadge {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  { id: 1, title: "Certified Trainers", icon: "Award", description: "All coaches are nationally certified with years of experience" },
  { id: 2, title: "Modern Equipment", icon: "Dumbbell", description: "State-of-the-art machines and free weights from top brands" },
  { id: 3, title: "Nutrition Guidance", icon: "Apple", description: "Personalized meal plans and dietary consultations" },
  { id: 4, title: "Personal Training", icon: "Users", description: "One-on-one sessions tailored to your unique goals" },
  { id: 5, title: "Flexible Timings", icon: "Clock", description: "Open 5 AM to 11 PM, 7 days a week for your convenience" },
  { id: 6, title: "Affordable Membership", icon: "BadgeIndianRupee", description: "Premium fitness accessible at competitive prices" },
];

// ───────────────────────── Why Choose Us ─────────────────────────
export interface WhyChooseItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export const whyChooseUs: WhyChooseItem[] = [
  { id: 1, title: "Certified Coaches", icon: "GraduationCap", description: "Expert trainers with internationally recognized certifications." },
  { id: 2, title: "Customized Workout Plans", icon: "ClipboardList", description: "Every plan is built uniquely around your goals and body type." },
  { id: 3, title: "Diet Consultation", icon: "Salad", description: "In-house nutritionists craft personalized meal strategies." },
  { id: 4, title: "Personal Attention", icon: "HeartHandshake", description: "Small batch sizes ensure every member gets focused coaching." },
  { id: 5, title: "Strength Training", icon: "Dumbbell", description: "Dedicated zones with Olympic bars, racks, and machines." },
  { id: 6, title: "Cardio Programs", icon: "Activity", description: "Treadmills, bikes, and rowing machines for peak endurance." },
  { id: 7, title: "Weight Loss Programs", icon: "TrendingDown", description: "Science-backed protocols that deliver measurable fat loss." },
  { id: 8, title: "Weight Gain Programs", icon: "TrendingUp", description: "Structured hypertrophy and nutrition for lean mass gains." },
  { id: 9, title: "Functional Training", icon: "Zap", description: "Real-world movement patterns for everyday strength and agility." },
  { id: 10, title: "CrossFit", icon: "Flame", description: "High-intensity WODs that build elite conditioning." },
  { id: 11, title: "Bodybuilding", icon: "Trophy", description: "Physique coaching for competitive and recreational bodybuilders." },
  { id: 12, title: "Muscle Building", icon: "Target", description: "Progressive overload training for maximal hypertrophy." },
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
  { id: 1, title: "Weight Loss", description: "Scientifically designed fat-burning protocols combining HIIT, strength training, and nutrition planning for sustainable results.", duration: "3-6 Months", icon: "TrendingDown", gradient: "from-red-600 to-orange-500" },
  { id: 2, title: "Weight Gain", description: "Structured caloric surplus plans with progressive overload training to build lean muscle mass effectively.", duration: "4-8 Months", icon: "TrendingUp", gradient: "from-blue-600 to-cyan-500" },
  { id: 3, title: "Strength Training", description: "Build raw strength with compound movements, powerlifting techniques, and periodized programming.", duration: "Ongoing", icon: "Dumbbell", gradient: "from-gray-700 to-gray-500" },
  { id: 4, title: "Bodybuilding", description: "Sculpt your physique with hypertrophy-focused splits, posing practice, and competition preparation.", duration: "6-12 Months", icon: "Trophy", gradient: "from-amber-600 to-yellow-500" },
  { id: 5, title: "Powerlifting", description: "Master the squat, bench, and deadlift with expert coaching and progressive strength cycles.", duration: "Ongoing", icon: "Medal", gradient: "from-purple-700 to-violet-500" },
  { id: 6, title: "CrossFit", description: "Varied functional movements performed at high intensity for total body conditioning.", duration: "Ongoing", icon: "Flame", gradient: "from-orange-600 to-red-500" },
  { id: 7, title: "HIIT", description: "Short, explosive intervals that torch calories and boost your metabolism for hours post-workout.", duration: "4-8 Weeks", icon: "Zap", gradient: "from-rose-600 to-pink-500" },
  { id: 8, title: "Cardio", description: "Endurance-focused training with treadmills, bikes, ellipticals, and rowing machines.", duration: "Ongoing", icon: "Activity", gradient: "from-emerald-600 to-teal-500" },
  { id: 9, title: "Personal Training", description: "One-on-one expert coaching fully customized to your goals, schedule, and fitness level.", duration: "Flexible", icon: "UserCheck", gradient: "from-indigo-600 to-blue-500" },
  { id: 10, title: "Women's Fitness", description: "Dedicated programs in a comfortable environment focused on toning, flexibility, and strength.", duration: "Ongoing", icon: "Heart", gradient: "from-pink-600 to-rose-400" },
  { id: 11, title: "Senior Fitness", description: "Gentle yet effective programs for mobility, balance, bone health, and overall vitality.", duration: "Ongoing", icon: "Smile", gradient: "from-teal-600 to-green-500" },
  { id: 12, title: "Transformation Program", description: "The ultimate 12-week complete body and lifestyle transformation with dedicated coaching.", duration: "12 Weeks", icon: "Sparkles", gradient: "from-red-700 to-amber-500" },
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
  { id: 1, name: "Rajesh Kumar", experience: "12 Years", specialization: "Strength & Conditioning", certifications: ["ACE Certified", "NSCA-CSCS"], gradient: "from-gray-800 to-gray-600", initials: "RK" },
  { id: 2, name: "Priya Mehra", experience: "8 Years", specialization: "Women's Fitness & Yoga", certifications: ["ISSA Certified", "RYT-500"], gradient: "from-rose-700 to-rose-500", initials: "PM" },
  { id: 3, name: "Arjun Nair", experience: "10 Years", specialization: "Bodybuilding & Nutrition", certifications: ["NASM-CPT", "Precision Nutrition L1"], gradient: "from-blue-800 to-blue-600", initials: "AN" },
  { id: 4, name: "Kavitha Iyer", experience: "6 Years", specialization: "CrossFit & HIIT", certifications: ["CrossFit L2", "ACE-GFI"], gradient: "from-purple-700 to-purple-500", initials: "KI" },
  { id: 5, name: "Suresh Patel", experience: "15 Years", specialization: "Powerlifting", certifications: ["IPF Coach", "NSCA-CSCS"], gradient: "from-amber-700 to-amber-500", initials: "SP" },
  { id: 6, name: "Anjali Sharma", experience: "7 Years", specialization: "Functional Training & Rehab", certifications: ["ACE-CPT", "FMS Certified"], gradient: "from-teal-700 to-teal-500", initials: "AS" },
  { id: 7, name: "Vikash Gupta", experience: "9 Years", specialization: "Weight Loss Specialist", certifications: ["NASM-CES", "ACE Health Coach"], gradient: "from-indigo-800 to-indigo-600", initials: "VG" },
  { id: 8, name: "Neha Kapoor", experience: "5 Years", specialization: "Zumba & Group Fitness", certifications: ["Zumba Licensed", "ACSM-CPT"], gradient: "from-pink-700 to-pink-500", initials: "NK" },
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
    id: 1, name: "Basic", price: "₹1,499", period: "/month", description: "Perfect for beginners starting their fitness journey",
    features: ["Access to Gym Floor", "Basic Equipment Usage", "Locker Room Access", "Group Classes (2/week)", "Fitness Assessment", "Mobile App Access"],
    highlighted: false,
  },
  {
    id: 2, name: "Standard", price: "₹2,999", period: "/month", description: "Our most popular plan for serious fitness enthusiasts",
    features: ["Everything in Basic", "Unlimited Group Classes", "Personal Trainer (2 sessions/week)", "Diet Consultation", "Body Composition Analysis", "Steam & Sauna Access", "Priority Booking", "Progress Tracking"],
    highlighted: true, badge: "Most Popular",
  },
  {
    id: 3, name: "Premium", price: "₹4,999", period: "/month", description: "The ultimate fitness experience with exclusive perks",
    features: ["Everything in Standard", "Daily Personal Training", "Custom Meal Plans", "24/7 Trainer Support", "Supplement Guidance", "Recovery Zone Access", "Guest Passes (2/month)", "VIP Locker", "Priority Equipment Access", "Monthly InBody Scan"],
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
}

export const testimonials: Testimonial[] = [
  { id: 1, name: "Amit Khanna", rating: 5, review: "Absolutely incredible gym! The trainers are knowledgeable, the equipment is world-class, and the atmosphere is motivating. Lost 15 kg in 4 months.", initials: "AK", program: "Weight Loss" },
  { id: 2, name: "Sunita Rao", rating: 5, review: "As a woman, I felt completely safe and empowered here. The women's fitness program is thoughtfully designed. Highly recommend!", initials: "SR", program: "Women's Fitness" },
  { id: 3, name: "Manish Tiwari", rating: 5, review: "The personal training sessions are worth every rupee. My trainer understood my goals and pushed me beyond my limits.", initials: "MT", program: "Personal Training" },
  { id: 4, name: "Pooja Reddy", rating: 4, review: "Great facility with modern equipment. The group classes are energetic and fun. Only wish they had more evening slots.", initials: "PR", program: "Group Classes" },
  { id: 5, name: "Rajiv Malhotra", rating: 5, review: "I've been to many gyms, but this one stands out. The transformation program delivered real, visible results in just 12 weeks.", initials: "RM", program: "Transformation" },
  { id: 6, name: "Nisha Verma", rating: 5, review: "The nutrition guidance combined with training made all the difference. I finally understand how to eat right and train smart.", initials: "NV", program: "Diet + Training" },
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
  { id: 1, title: "Workout Area", gradient: "from-slate-800 to-slate-600", span: "col-span-2 row-span-2" },
  { id: 2, title: "Cardio Zone", gradient: "from-blue-800 to-blue-600", span: "col-span-1 row-span-1" },
  { id: 3, title: "Strength Area", gradient: "from-red-900 to-red-700", span: "col-span-1 row-span-1" },
  { id: 4, title: "Group Classes", gradient: "from-purple-800 to-purple-600", span: "col-span-1 row-span-2" },
  { id: 5, title: "Modern Machines", gradient: "from-gray-800 to-gray-600", span: "col-span-1 row-span-1" },
  { id: 6, title: "Locker Room", gradient: "from-teal-800 to-teal-600", span: "col-span-1 row-span-1" },
  { id: 7, title: "Nutrition Corner", gradient: "from-amber-800 to-amber-600", span: "col-span-2 row-span-1" },
  { id: 8, title: "Reception", gradient: "from-indigo-800 to-indigo-600", span: "col-span-1 row-span-1" },
];

// ───────────────────────── FAQs ─────────────────────────
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  { id: 1, question: "Do beginners need any prior experience?", answer: "Absolutely not! Our trainers specialize in working with beginners. We'll assess your current fitness level and create a customized plan that progresses at your pace. Every expert was once a beginner." },
  { id: 2, question: "Do you provide diet plans?", answer: "Yes! All Standard and Premium members receive personalized diet consultations. Our in-house nutritionists will create meal plans aligned with your fitness goals, whether it's weight loss, muscle gain, or general health." },
  { id: 3, question: "Are personal trainers available?", answer: "Yes, we have 8+ certified personal trainers available. Basic members can book pay-per-session, Standard members get 2 sessions/week, and Premium members enjoy daily personal training sessions." },
  { id: 4, question: "Can women join the gym?", answer: "Absolutely! We have dedicated women's fitness programs, female trainers, and a supportive environment. Our women's section includes dedicated workout areas and specialized classes like Zumba and Yoga." },
  { id: 5, question: "Is there parking available?", answer: "Yes, we have ample free parking for both two-wheelers and four-wheelers. The parking area is well-lit and secured with CCTV surveillance." },
  { id: 6, question: "What are the gym timings?", answer: "We're open from 5:00 AM to 11:00 PM, Monday through Saturday. Sunday hours are 6:00 AM to 6:00 PM. We're closed on national holidays." },
  { id: 7, question: "Is a free trial available?", answer: "Yes! We offer a complimentary 1-day trial that includes a full gym tour, a fitness assessment, and a sample training session with one of our expert trainers. Book yours through our website or call us directly." },
];

// ───────────────────────── Stats ─────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const heroStats: Stat[] = [
  { value: 500, suffix: "+", label: "Happy Members" },
  { value: 1200, suffix: "+", label: "Transformations" },
  { value: 8, suffix: "+", label: "Expert Trainers" },
  { value: 5, suffix: "★", label: "Average Rating" },
];
