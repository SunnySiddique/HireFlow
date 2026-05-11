import CTA from "@/app/(landing)/_components/CTA";
import FeaturedJobs from "@/app/(landing)/_components/FeaturedJobs";
import Footer from "@/app/(landing)/_components/Footer";
import HeroSection from "@/app/(landing)/_components/HeroSection";
import QuickStats from "@/app/(landing)/_components/QuickStats";
import HireFlow from "@/app/(landing)/_components/TalentHub";
import Testimonials from "@/app/(landing)/_components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Featured Jobs Section */}
      <FeaturedJobs />

      {/* Quick Stats */}
      <QuickStats />

      {/* Why HireFlow */}
      <HireFlow />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
