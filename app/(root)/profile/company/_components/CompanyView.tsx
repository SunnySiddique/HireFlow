"use client";

import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { statusLabel } from "@/constants/employerData";
import { useTrackEmployerProfileView } from "@/hooks/profile-view/useViews";
import { useCompanyProfile } from "@/hooks/public-profile/usePublicProfile";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Globe,
  Link2,
  Linkedin,
  MapPin,
  Star,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CompanyPositionsModal from "./CompanyPositionsModal";

interface CompanyViewProps {
  slug: string;
}

const CompanyView = ({ slug }: CompanyViewProps) => {
  const { data, isLoading } = useCompanyProfile(slug);
  const [isPositionsModalOpen, setIsPositionsModalOpen] = useState(false);
  const { mutate: trackView } = useTrackEmployerProfileView();

  useEffect(() => {
    if (!data?.company?.id) return;

    trackView(data.company.auth_id);
  }, [data?.company?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader mode="full" />
      </div>
    );
  }

  const company = data?.company;
  const jobs = data?.jobs || [];
  const hiringStatus = company?.hiring_status?.toLowerCase() ?? "";

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Company not found</p>
        </div>
      </div>
    );
  }

  const coreValues = company.core_values || [];
  const openPositionsCount = company.open_positions_count ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Dashboard Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Button variant="ghost" asChild className="hover:bg-muted">
          <Link href="/job-seeker/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Hero Section with Company Banner */}
      <div className="relative mt-4">
        {/* Banner Background */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 via-secondary/20 to-chart-1/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>

        {/* Company Logo & Basic Info */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Company Logo */}
              <div className="relative shrink-0">
                <div
                  className={`relative w-24 h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden z-10 transition-all ${
                    company?.is_featured
                      ? "border-4 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                      : "border-2 border-border"
                  }`}
                >
                  {company?.company_logo_url ? (
                    <Image
                      src={company?.company_logo_url || ""}
                      alt="Profile image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 112px, 128px"
                      priority
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>

                {/* Glowing Featured Badge (like Job Seeker profile) */}
                {company?.is_featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/40 border border-white/20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Star className="w-3 h-3 fill-white text-white" />
                      </motion.div>
                      Featured
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    {company.company_name}
                  </h1>
                  {company.hiring_status && (
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${
                        hiringStatus === "actively_hiring"
                          ? "bg-green-500/15 text-green-700 border-green-500/30"
                          : hiringStatus === "selective"
                            ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                            : "bg-red-500/15 text-red-700 border-red-500/30"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor:
                            hiringStatus === "actively_hiring"
                              ? "#22c55e"
                              : hiringStatus === "selective"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      />
                      <span className="capitalize">
                        {statusLabel[hiringStatus] || "Status not set"}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  {company.industry}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {openPositionsCount > 0 && (
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setIsPositionsModalOpen(true)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    View Open Positions
                  </Button>
                )}
                <Button variant="outline">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Follow Company
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  About {company.company_name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {company.description || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Core Values */}
            {coreValues.length > 0 && (
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5 text-chart-2" />
                    Core Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {coreValues.map((value: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-primary/30 transition-colors hover:border-primary/50"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Locations */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Headquarters */}
                  {company.headquarters_location && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                      <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          Headquarters
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {company.headquarters_location}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Operating Locations */}
                  {company.operating_locations && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border">
                      <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          Operating Locations
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {company.operating_locations}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Open Positions Preview */}
            {openPositionsCount > 0 && (
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-chart-1" />
                    Open Positions
                    <Badge variant="secondary" className="ml-2">
                      {jobs.length} positions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobs.map((job, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer group"
                      >
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {job.job_title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {company.company_name} •{" "}
                            {company.operating_locations?.split(",")[0] ||
                              company.headquarters_location}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPositionsModalOpen(true)}
                        >
                          View
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setIsPositionsModalOpen(true)}
                  >
                    View All {jobs.length} Positions
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Company Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.company_size && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Size
                      </p>
                      <p className="font-semibold text-foreground">
                        {company.company_size} employees
                      </p>
                    </div>
                  </div>
                )}
                {company.company_size && <Separator />}
                {company.founded_year && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                        <p className="font-semibold text-foreground">
                          {company.founded_year}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Open Positions
                    </p>
                    <p className="font-semibold text-foreground">
                      {openPositionsCount} roles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Website</p>
                      <Link
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:text-primary/80 truncate block"
                      >
                        {company.website.replace(/^https?:\/\//, "")}
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {company.linkedin_url && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10 hover:border-primary/30"
                    >
                      <Link
                        href={company.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    </Button>
                  )}
                  {company.twitter_url && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10 hover:border-primary/30"
                    >
                      <Link
                        href={company.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                    </Button>
                  )}
                  {company.website && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10 hover:border-primary/30"
                    >
                      <Link
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link2 className="w-5 h-5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Member Since */}
            <Card className="border border-border shadow-sm bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Member since{" "}
                  <span className="font-medium text-foreground">
                    {formatDate(company.created_at as string)}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Positions Modal - Separate Component */}
      <CompanyPositionsModal
        isOpen={isPositionsModalOpen}
        onOpenChange={setIsPositionsModalOpen}
        companyName={company.company_name}
        companyJobs={jobs}
      />
    </div>
  );
};

export default CompanyView;
