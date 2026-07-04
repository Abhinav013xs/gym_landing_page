import {
  Dumbbell,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from 'lucide-react';

/* ===== Types ===== */
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ===== Constants ===== */
const QUICK_LINKS: FooterLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Programs', href: '#programs' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const PROGRAM_LINKS: FooterLink[] = [
  { label: 'Weight Loss', href: '#programs' },
  { label: 'Bodybuilding', href: '#programs' },
  { label: 'CrossFit', href: '#programs' },
  { label: 'Personal Training', href: '#programs' },
  { label: 'HIIT', href: '#programs' },
  { label: "Women's Fitness", href: '#programs' },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/jeraifitness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/jeraifitness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/jeraifitness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/jeraifitness',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

/* ===== Component ===== */
const Footer: React.FC = () => {
  return (
    <footer className="relative bg-primary text-white" role="contentinfo">
      {/* Top accent gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* ===== Main Footer Content ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* --- Column 1: Brand & Social --- */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a href="#hero" className="inline-flex items-center gap-2.5 group mb-5">
              <Dumbbell
                className="w-8 h-8 text-accent transition-transform duration-300 group-hover:rotate-[-12deg]"
                strokeWidth={2.5}
              />
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                JERAI <span className="text-accent">FITNESS</span>
              </span>
            </a>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Transform your body, elevate your mind. Mumbai&apos;s premier fitness
              destination with world-class equipment, expert trainers, and a
              community that pushes you to be your best.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white/60 transition-all duration-300 hover:text-accent hover:bg-white/15 hover:scale-110"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h3 className="font-heading font-bold text-base tracking-wide mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Programs --- */}
          <div>
            <h3 className="font-heading font-bold text-base tracking-wide mb-5 text-white">
              Programs
            </h3>
            <ul className="space-y-3" role="list">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Contact Info --- */}
          <div>
            <h3 className="font-heading font-bold text-base tracking-wide mb-5 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4" role="list">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-white/60 text-sm leading-relaxed">
                  123 Fitness Street,<br />
                  Mumbai, MH 400001
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={2} />
                <a
                  href="tel:+919876543210"
                  className="text-white/60 text-sm hover:text-accent transition-colors duration-300"
                >
                  +91 98765 43210
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={2} />
                <a
                  href="mailto:info@jeraifitness.com"
                  className="text-white/60 text-sm hover:text-accent transition-colors duration-300"
                >
                  info@jeraifitness.com
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={2} />
                <span className="text-white/60 text-sm">
                  Mon–Sat: 5AM – 11PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Newsletter Bar ===== */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-heading font-bold text-lg text-white mb-1">
                Stay in the Game
              </h4>
              <p className="text-white/50 text-sm">
                Subscribe for exclusive tips, offers &amp; motivation.
              </p>
            </div>

            <form
              className="flex w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription"
            >
              <div className="flex w-full md:w-auto rounded-full overflow-hidden border border-white/15 bg-white/5 focus-within:border-accent/50 transition-colors duration-300">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 md:w-72 px-5 py-3 bg-transparent text-white text-sm placeholder:text-white/40 outline-none"
                  required
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-6 py-3 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ===== Copyright Bar ===== */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <p>© 2024 Jerai Fitness. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
