import { HeroSection } from "@/components/shared/HeroSection";
import { PhilosophyStrip } from "@/components/shared/PhilosophyStrip";
import { BrandStrip } from "@/components/brand/BrandStrip";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { ProcessTeaser } from "@/components/shared/ProcessTeaser";
import { TestimonialStrip } from "@/components/shared/TestimonialStrip";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function Home() {
  return (
    <div className="home-page min-h-screen">
      {/* ACT 1 — First impression, parallax hero */}
      <HeroSection />

      {/* ACT 2 — Philosophy reveal, scroll-driven text + USP pills */}
      <PhilosophyStrip />

      {/* ACT 3 — Brand showcase cards */}
      <BrandStrip />

      {/* ACT 4 — Best-selling products from Sanity */}
      <FeaturedProducts />

      {/* ACT 5 — Process timeline with scroll progress */}
      <ProcessTeaser />

      {/* ACT 6 — Social proof */}
      <TestimonialStrip />

      {/* ACT 7 — Closing CTA with scroll zoom */}
      <NewsletterCTA />
    </div>
  );
}
