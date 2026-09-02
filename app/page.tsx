import { HeroSection } from "@/components/shared/HeroSection";
import { PhilosophyStrip } from "@/components/shared/PhilosophyStrip";
import { BrandStrip } from "@/components/brand/BrandStrip";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { ProcessTeaser } from "@/components/shared/ProcessTeaser";
import { TestimonialStrip } from "@/components/shared/TestimonialStrip";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { isSinglePageMode } from "@/lib/config";
import { getProducts, getBrands } from "@/lib/sanity";
import { SinglePageStory } from "@/components/shared/SinglePageStory";
import { SinglePageProducts } from "@/components/product/SinglePageProducts";
import { SinglePageCertifications } from "@/components/shared/SinglePageCertifications";
import { SinglePageContact } from "@/components/shared/SinglePageContact";

export default async function Home() {
  const singlePage = isSinglePageMode();

  if (singlePage) {
    const [products, brands] = await Promise.all([
      getProducts().catch(() => []),
      getBrands().catch(() => []),
    ]);

    return (
      <div id="top" className="home-page min-h-screen">
        {/* ACT 1 — Parallax Hero */}
        <HeroSection />

        {/* ACT 2 — Concise About & Founding Story */}
        <SinglePageStory id="about" />

        {/* ACT 3 — Philosophy reveal */}
        <PhilosophyStrip />

        {/* ACT 4 — Brand Showcase */}
        <BrandStrip id="brands" />

        {/* ACT 5 — All Products: Horizontal movement + Quick View Modal */}
        <SinglePageProducts id="products" products={products} brands={brands} />

        {/* ACT 6 — Farm-to-Bottle Process */}
        <ProcessTeaser id="process" />

        {/* ACT 7 — Food Safety & Certifications */}
        <SinglePageCertifications id="certifications" />

        {/* ACT 8 — Social proof */}
        <TestimonialStrip />

        {/* ACT 9 — Direct Contact & Inquiry */}
        <SinglePageContact id="contact" />

        {/* ACT 10 — Newsletter */}
        <NewsletterCTA />
      </div>
    );
  }

  // Standard Multi-Page Mode
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
