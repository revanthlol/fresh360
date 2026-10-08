import { HeroSection } from "@/components/shared/HeroSection";
import { BrandStrip } from "@/components/brand/BrandStrip";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { ProcessTeaser } from "@/components/shared/ProcessTeaser";
import { TestimonialStrip } from "@/components/shared/TestimonialStrip";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { isSinglePageMode } from "@/lib/config";
import { getProducts, getBrands } from "@/lib/sanity";
import { SinglePageStory } from "@/components/shared/SinglePageStory";
import { SinglePageProducts } from "@/components/product/SinglePageProducts";
import { SinglePageContact } from "@/components/shared/SinglePageContact";

export const revalidate = 60;

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

        {/* Full-width brand sequence follows the hero. */}
        <BrandStrip id="brands" content={brands} />

        {/* ACT 5 — All Products: Horizontal movement + Quick View Modal */}
        <SinglePageProducts id="products" products={products} brands={brands} />

        <SinglePageStory id="about" />

        {/* ACT 6 — Farm-to-Bottle Process */}
        <ProcessTeaser id="process" />

        {/* ACT 7 — Social proof */}
        <TestimonialStrip />

        {/* ACT 8 — Direct Contact & Inquiry */}
        <SinglePageContact id="contact" />

        {/* ACT 9 — Newsletter */}
        <NewsletterCTA />
      </div>
    );
  }

  // Standard Multi-Page Mode
  const brands = await getBrands().catch(() => []);
  return (
    <div className="home-page min-h-screen">
      {/* ACT 1 — First impression, parallax hero */}
      <HeroSection />

      {/* Full-width brand sequence */}
      <BrandStrip content={brands} />

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
