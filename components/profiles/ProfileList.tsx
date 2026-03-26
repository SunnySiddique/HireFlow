"use client";

import { useEmployerProfiles } from "@/hooks/useEmployer";
import { useSeekerProfiles } from "@/hooks/useJobSeeker";
import { Search, Star } from "lucide-react";
import { useState } from "react";
import Loader from "../Loader";
import { Input } from "../ui/input";
import EmployerCard from "./EmployerCard";
import { FeaturedEmployerCard } from "./FeaturedEmployerCard";
import { FeaturedTalentCard } from "./FeaturedTalentCard";
import { TalentCard } from "./TalentCard";

// TODO protect user form sub
const ProfileList = ({ role }: { role: "employer" | "job-seeker" }) => {
  const { data: seekerProfiles, isLoading: isSeekerProfileLoading } =
    useSeekerProfiles();
  const { data: employerProfiles, isLoading: isEmployerProfileLoading } =
    useEmployerProfiles();

  const [search, setSearch] = useState("");
  const isJobSeeker = role === "job-seeker";

  const baseProfiles = (isJobSeeker ? employerProfiles : seekerProfiles) ?? [];

  const matchesSearch = (profile: any) => {
    const searchTrim = search.trim().toLowerCase();

    const name = isJobSeeker ? profile.company_name : profile.full_name;

    if (!name) return false;

    return name.toLowerCase().includes(searchTrim);
  };

  const featuredProfiles = baseProfiles?.filter((p) => p.is_featured) ?? [];
  const regularProfiles = baseProfiles.filter((p) => !p.is_featured) ?? [];

  const filteredFeaturedProfiles = featuredProfiles.filter((profile) =>
    matchesSearch(profile),
  );
  const filteredRegularProfiles = regularProfiles.filter((profile) =>
    matchesSearch(profile),
  );

  if (isSeekerProfileLoading || isEmployerProfileLoading) return <Loader />;
  return (
    <main className="p-8">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 pb-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Talent Directory
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Discover and connect with top professionals.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search ${role === "job-seeker" ? "companies" : "talents"}...`}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Featured Section */}
      {filteredFeaturedProfiles.length > 0 ? (
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              {role === "job-seeker"
                ? "Featured Companies"
                : "Featured Profiles"}
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeaturedProfiles.map((profile: any) =>
              role === "job-seeker" ? (
                <FeaturedEmployerCard key={profile.id} employer={profile} />
              ) : (
                <FeaturedTalentCard key={profile.id} talent={profile} />
              ),
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-2xl bg-card/30 mt-5">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Star className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {role === "job-seeker"
              ? "No featured companies"
              : "No featured profiles"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {role === "job-seeker"
              ? "There are currently no featured companies to display."
              : "There are currently no featured job seekers to display."}
          </p>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between mb-10 border-b border-border pb-4 mt-5">
          <h2 className="text-2xl font-bold text-foreground">
            {role === "job-seeker" ? "All Companies" : "Explore Talent"}
          </h2>
          <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {regularProfiles.length}{" "}
            {role === "job-seeker" ? "companies" : "profiles"}
          </span>
        </div>

        {filteredRegularProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRegularProfiles.map((profile: any) =>
              role === "job-seeker" ? (
                <EmployerCard key={profile.id} employer={profile} />
              ) : (
                <TalentCard key={profile.id} talent={profile} />
              ),
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-card/30">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {role === "job-seeker"
                ? "No companies found"
                : "No profiles found"}
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {role === "job-seeker"
                ? "We couldn't find any companies matching your criteria at this time."
                : "We couldn't find any job seekers matching your criteria at this time."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileList;
