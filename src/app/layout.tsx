import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* ===== Font Configuration ===== */
const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ===== SEO Metadata ===== */
export const metadata: Metadata = {
  title: "Legacy Athletics — Premium Gym & Athletic Club",
  description:
    "Join Legacy Athletics, India's premier luxury fitness club with certified trainers, high-performance coaching, and 500+ successful transformations. Claim your free trial pass!",
  keywords: [
    "gym",
    "fitness club",
    "personal training",
    "weight loss",
    "bodybuilding",
    "luxury gym",
    "CrossFit",
    "HIIT",
    "transformation",
    "Legacy Athletics",
  ],
  authors: [{ name: "Legacy Athletics" }],
  creator: "Legacy Athletics",
  publisher: "Legacy Athletics",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://legacyathletics.com",
    siteName: "Legacy Athletics",
    title: "Legacy Athletics — Transform Your Body, Build Your Legacy",
    description:
      "Premium luxury gym with certified trainers, personalized conditioning plans, and macro-based nutrition. Join 1000+ active members today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Legacy Athletics — Premium Fitness Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy Athletics — Transform Your Body, Build Your Legacy",
    description:
      "Premium athletic club with certified coaches and 500+ successful transformations. Claim your free trial pass today!",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://legacyathletics.com"),
};

/* ===== JSON-LD Schema ===== */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Legacy Athletics",
  description:
    "Premium athletic club and luxury gym with certified coaches, personalized metabolic diet plans, and 500+ successful transformations.",
  url: "https://legacyathletics.com",
  telephone: "+919876543210",
  email: "info@legacyathletics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Legacy Towers, Andheri West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400058",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "05:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "06:00",
      closes: "18:00",
    },
  ],
  priceRange: "₹₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
};

/* ===== Root Layout ===== */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-primary font-body transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
