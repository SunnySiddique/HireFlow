import { Briefcase, MapPinIcon, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-40">
        <div className="flex flex-col items-center text-center gap-12">
          {/* Headline */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="inline-flex items-center justify-center gap-2 bg-secondary/10 text-secondary w-fit px-4 py-2 rounded-full mx-auto text-sm font-bold">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Your career starts here
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-foreground">
              Find Your <span className="text-primary">Dream Role</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Discover 50K+ hand-picked opportunities from leading companies.
              Connect with the right job that matches your ambitions.
            </p>
          </div>

          {/* Search Bar - Enhanced */}
          <div className="w-full max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-2 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                {/* Job Title/Keywords Input */}
                <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <Search className="w-5 h-5 text-primary flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, company..."
                    className="bg-transparent text-foreground placeholder-muted-foreground outline-none w-full text-base font-medium"
                  />
                </div>

                {/* Location Input */}
                <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="City, region, or remote..."
                    className="bg-transparent text-foreground placeholder-muted-foreground outline-none w-full text-base font-medium"
                  />
                </div>

                {/* Search Button */}
                <Link href={"/auth/signin"}>
                  <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
              <Link href={"/auth/signin"}>
                <Button className="py-6 bg-primary text-primary-foreground flex items-center justify-center gap-2 ">
                  <Search className="w-5 h-5" />
                  Find Jobs
                </Button>
              </Link>
              <Link href={"/auth/signin"}>
                <Button
                  variant={"outline"}
                  className="py-6 flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Post a Job
                </Button>
              </Link>
            </div>

            {/* Stats under search */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 text-center">
              <div className="group">
                <p className="font-black text-3xl sm:text-4xl text-primary group-hover:scale-110 transition-transform">
                  50K+
                </p>
                <p className="text-muted-foreground font-semibold text-sm mt-1">
                  Active Jobs
                </p>
              </div>
              <div className="group">
                <p className="font-black text-3xl sm:text-4xl text-primary group-hover:scale-110 transition-transform">
                  5K+
                </p>
                <p className="text-muted-foreground font-semibold text-sm mt-1">
                  Companies
                </p>
              </div>
              <div className="group">
                <p className="font-black text-3xl sm:text-4xl text-primary group-hover:scale-110 transition-transform">
                  500K+
                </p>
                <p className="text-muted-foreground font-semibold text-sm mt-1">
                  Job Seekers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
