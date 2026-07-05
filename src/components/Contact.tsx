"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, PhoneCall } from "lucide-react";

/* ===================================================================
 * Contact — Visit Us Today
 * Spacious, luxury dark location overview.
 * =================================================================== */

interface ContactCard {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
}

const contactCards: ContactCard[] = [
  {
    id: 1,
    label: "Address",
    value: "123 Legacy Towers, Andheri West, Mumbai, Maharashtra 400058",
    icon: <MapPin className="w-5 h-5 text-accent" aria-hidden="true" />,
  },
  {
    id: 2,
    label: "Phone",
    value: "+91 98765 43210",
    icon: <Phone className="w-5 h-5 text-accent" aria-hidden="true" />,
  },
  {
    id: 3,
    label: "Email",
    value: "info@legacyathletics.com",
    icon: <Mail className="w-5 h-5 text-accent" aria-hidden="true" />,
  },
  {
    id: 4,
    label: "Hours",
    value: "Mon-Sat: 5:00 AM - 11:00 PM\nSun: 6:00 AM - 6:00 PM",
    icon: <Clock className="w-5 h-5 text-accent" aria-hidden="true" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background glow highlights */}
      <div className="glow-spot glow-crimson bottom-0 left-0 scale-150 opacity-5" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ───────── Section Header ───────── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2
            id="contact-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl text-white mt-3"
          >
            Visit Our <span className="gradient-text">Club</span>
          </h2>
        </motion.div>

        {/* ───────── Two-Column Layout with expanded gaps ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 px-4">
          {/* ── Left Column: Info Cards + Action Buttons ── */}
          <div className="flex flex-col justify-between min-h-[440px]">
            {/* 2×2 info card grid with expanded gaps */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {contactCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  className="bg-surface border border-white/5 rounded-3xl p-8 flex items-start gap-5 shadow-xl hover:border-accent/15 transition-all duration-300"
                >
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">
                      {card.label}
                    </span>
                    <p className="font-semibold text-white text-sm mt-2 whitespace-pre-line leading-relaxed">
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons with increased margin */}
            <motion.div
              className="flex flex-col sm:flex-row gap-5 mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-10 py-4 flex items-center justify-center gap-2 font-display text-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-emerald-500/10 leading-none"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4.5 h-4.5" aria-hidden="true" />
                WhatsApp Us
              </a>

              {/* Call Now */}
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto bg-cta hover:bg-cta-dark text-white rounded-full px-10 py-4 flex items-center justify-center gap-2 font-display text-2xl uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-cta/25 leading-none"
                aria-label="Call us now"
              >
                <PhoneCall className="w-4.5 h-4.5" aria-hidden="true" />
                Call Coaching Desk
              </a>
            </motion.div>
          </div>

          {/* ── Right Column: Google Maps Embed ── */}
          <motion.div
            className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-full min-h-[440px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Map iframe */}
            <iframe
              title="Legacy Athletics Location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.7776!2d72.8347!3d19.1196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzEwLjYiTiA3MsKwNTAnMDQuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
            />

            {/* Floating label overlay */}
            <div className="absolute top-4 left-4 z-10 glass-premium border border-white/5 rounded-xl px-4 py-2 flex items-center gap-2 pointer-events-none">
              <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Legacy Athletics, Mumbai
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
