import { HeroSection } from "@/components/shared/HeroSection";
import { BrandStrip } from "@/components/brand/BrandStrip";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { USPStrip } from "@/components/shared/USPStrip";
import { ProcessTeaser } from "@/components/shared/ProcessTeaser";
import { TestimonialStrip } from "@/components/shared/TestimonialStrip";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <FeaturedProducts />
      <USPStrip />
      <ProcessTeaser />
      <TestimonialStrip />
      <NewsletterCTA />
    </>
  );
}
