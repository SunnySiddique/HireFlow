"use client";

import { useEmployerProfiles } from "@/hooks/employer-profile/useEmployer";
import { useSeekerProfiles } from "@/hooks/seeker-profile/useSeeker";
import { useDebounce } from "@/hooks/useDebounce";
import { Employer } from "@/types/employer";
import { JobSeekerProfile } from "@/types/job-seeker";
import { Search, Star } from "lucide-react";
import { useState } from "react";
import Loader from "../Loader";
import { Input } from "../ui/input";
import EmployerCard from "./EmployerCard";
import { FeaturedEmployerCard } from "./FeaturedEmployerCard";

import FeaturedTalentCard from "./FeaturedTalentCard";
import { TalentCard } from "./TalentCard";

type Profile = JobSeekerProfile | Employer;
type FilterMode = "all" | "featured";

const ProfileList = ({ role }: { role: "employer" | "job-seeker" }) => {
  const isJobSeeker = role === "job-seeker";

  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 650);

  const { data: seekerData, isLoading: seekerLoading } = useSeekerProfiles(
    !isJobSeeker ? debounceSearch : undefined,
  );

  const { data: employerData, isLoading: employerLoading } =
    useEmployerProfiles(isJobSeeker ? debounceSearch : undefined);

  const isEmployer = (p: Profile): p is Employer => "company_name" in p;

  const profileData = isJobSeeker ? employerData : seekerData;
  const featuredProfiles = profileData?.featured ?? [];
  const regularProfiles = profileData?.regular ?? [];

  const activeProfiles =
    filterMode === "featured"
      ? featuredProfiles
      : [...featuredProfiles, ...regularProfiles];

  const renderCard = (profile: any) => {
    if (isEmployer(profile)) {
      return profile.is_featured ? (
        <FeaturedEmployerCard key={profile.id} employer={profile} />
      ) : (
        <EmployerCard key={profile.id} employer={profile} />
      );
    }

    return profile.is_featured ? (
      <FeaturedTalentCard key={profile.id} talent={profile} />
    ) : (
      <TalentCard key={profile.id} talent={profile} />
    );
  };

  if (seekerLoading || employerLoading) return <Loader mode="inline" />;

  return (
    <main>
      {/* Header */}
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
            {/* Featured / All Toggle */}
            <div className="flex items-center rounded-lg border border-border bg-muted p-1 shrink-0">
              <button
                onClick={() => setFilterMode("all")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  filterMode === "all"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode("featured")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  filterMode === "featured"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Star
                  className={`h-3 w-3 ${
                    filterMode === "featured" ? "fill-primary-foreground" : ""
                  }`}
                />
                Featured
              </button>
            </div>

            {/* Search */}
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

      {/* Section Title */}
      <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          {filterMode === "featured"
            ? role === "job-seeker"
              ? "Featured Companies"
              : "Featured Profiles"
            : role === "job-seeker"
              ? "All Companies"
              : "Explore Talent"}
          {filterMode === "featured" && (
            <span className="flex h-2 w-2 rounded-full bg-primary" />
          )}
        </h2>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {activeProfiles.length}{" "}
          {role === "job-seeker" ? "companies" : "profiles"}
        </span>
      </div>

      {/* Cards Grid */}
      {activeProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProfiles.map(renderCard)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-card/30">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            {filterMode === "featured" ? (
              <Star className="h-8 w-8 text-muted-foreground/50" />
            ) : (
              <Search className="h-8 w-8 text-muted-foreground/50" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {filterMode === "featured"
              ? role === "job-seeker"
                ? "No featured companies"
                : "No featured profiles"
              : role === "job-seeker"
                ? "No companies found"
                : "No profiles found"}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            {filterMode === "featured"
              ? role === "job-seeker"
                ? "There are currently no featured companies to display."
                : "There are currently no featured job seekers to display."
              : role === "job-seeker"
                ? "We couldn't find any companies matching your criteria."
                : "We couldn't find any job seekers matching your criteria."}
          </p>
        </div>
      )}
    </main>
  );
};

export default ProfileList;
