import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

/* ===== Font Configuration ===== */
const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* ===== SEO Metadata ===== */
export const metadata: Metadata = {
  title: "Jerai Fitness — Transform Your Body, Transform Your Life",
  description:
    "Join Jerai Fitness, Mumbai's premium gym with certified trainers, personalized programs, and 1200+ successful transformations. Book your free trial today!",
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "weight loss",
    "bodybuilding",
    "Mumbai gym",
    "CrossFit",
    "HIIT",
    "transformation",
    "Jerai Fitness",
  ],
  authors: [{ name: "Jerai Fitness" }],
  creator: "Jerai Fitness",
  publisher: "Jerai Fitness",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jeraifitness.com",
    siteName: "Jerai Fitness",
    title: "Jerai Fitness — Transform Your Body, Transform Your Life",
    description:
      "Premium gym with certified trainers, personalized workout plans, and nutrition guidance. Join 500+ happy members.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jerai Fitness — Premium Gym in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerai Fitness — Transform Your Body, Transform Your Life",
    description:
      "Premium gym with certified trainers and 1200+ successful transformations. Book a free trial today!",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://jeraifitness.com"),
};

/* ===== JSON-LD Schema ===== */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Jerai Fitness",
  description:
    "Premium gym with certified trainers, personalized workout plans, nutrition guidance, and 1200+ successful transformations.",
  url: "https://jeraifitness.com",
  telephone: "+919876543210",
  email: "info@jeraifitness.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Fitness Street, Andheri West",
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
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
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
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-primary font-body">
        {children}
      </body>
    </html>
  );
}
