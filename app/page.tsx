"use client";

import CTA from "@/components/home/CTA";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import QuickStats from "@/components/home/QuickStats";
import TalentHub from "@/components/home/TalentHub";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}

      <HomeNavbar />
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Featured Jobs Section */}
      <FeaturedJobs />

      {/* Quick Stats */}
      <QuickStats />

      {/* Why TalentHub */}
      <TalentHub />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
