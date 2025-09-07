import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import MembershipSection from "@/components/home/MembershipSection";
import MotivationSection from "@/components/home/MotivationSection";
import PassesSection from "@/components/home/PassesSection";
import PersonalizationSection from "@/components/home/PersonalizationSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TourSection from "@/components/home/TourSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PersonalizationSection />
      <MotivationSection />
      <FeaturesSection />
      <TourSection />
      <PassesSection />
      <MembershipSection />
      <TestimonialsSection />
    </main>
  );
}
