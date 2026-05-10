import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PageTransition } from "@/components/layout/PageTransition";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2D6A2D",
  width: "device-width",
  initialScale: 1,
};

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  title: {
    default: "Fresh 360 | Premium Cold-Pressed Juices & Natural Beverages",
    template: "%s | Fresh 360",
  },
  description: "Experience the pure taste of nature with Fresh 360 Degrees Foods LLP. Premium cold-pressed juices, sparkling fruit beverages, and natural refreshments with zero preservatives and zero added sugar.",
  keywords: [
    "cold-pressed juice", 
    "natural beverages", 
    "fresh juice", 
    "healthy drinks", 
    "Juicera", 
    "Fuzzy", 
    "Hyderabad juice company",
    "cold pressed nut milk",
    "goli soda Hyderabad"
  ],
  authors: [{ name: "Fresh 360 Degrees Foods LLP" }],
  creator: "Fresh 360",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Fresh 360",
    title: "Fresh 360 | Pure, Cold-Pressed, Natural",
    description: "Experience the pure taste of nature with premium cold-pressed juices and natural beverages. Zero preservatives, zero added sugar.",
    images: [
      {
        url: "/fresh360-3_4.png",
        width: 1200,
        height: 630,
        alt: "Fresh 360 Beverages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh 360 | Pure Natural Beverages",
    description: "Zero preservatives. Zero added sugar. 100% natural cold-pressed juices.",
    images: ["/fresh360-3_4.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${jakarta.variable} ${outfit.variable} ${fraunces.variable} font-sans antialiased text-slate-900 bg-white selection:bg-brand-green selection:text-white`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-brand-green text-white px-4 py-2 rounded-full font-bold shadow-xl"
        >
          Skip to content
        </a>
        
        <LoadingScreen />
        <PageTransition />
        <Navbar />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
