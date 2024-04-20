import FeaturesSection from "@/components/modules/site/features/featuresSection";
import HeroSection from "@/components/modules/site/hero/heroSection";
import OpenSourceSection from "@/components/modules/site/openSource/openSourceSection";
import PricingSection from "@/components/modules/site/pricing/pricingSection";
import TestimonialsSection from "@/components/modules/site/testimonials/testimonialsSection";

const Site = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <OpenSourceSection />
    </>
  );
};
export default Site;
