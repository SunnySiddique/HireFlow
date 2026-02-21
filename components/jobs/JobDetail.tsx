"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  DollarSign,
  Globe,
  MapPin,
  Users,
} from "lucide-react";

// Sample job data - replace with actual data from props
const jobData = {
  jobTitle: "Senior Full Stack Developer",
  companyName: "TechCorp Inc.",
  jobType: "Software Development",
  employmentType: "Full Time",
  experienceLevel: "Senior (7-10 years)",
  workArrangement: "Hybrid",
  primaryLocation: "San Francisco, CA",
  minimumSalary: 120000,
  maximumSalary: 180000,
  numberOfPositions: 3,
  description:
    "We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing, testing, and maintaining web applications that serve thousands of users daily. Your expertise in modern web technologies and ability to work collaboratively will be key to your success.",
  responsibilities: [
    "Design and implement robust backend APIs using Node.js and Express",
    "Develop responsive frontend interfaces using React and TypeScript",
    "Collaborate with product and design teams to translate requirements into technical solutions",
    "Conduct code reviews and mentor junior developers",
    "Optimize application performance and ensure scalability",
    "Participate in architectural decisions and technical planning",
  ],
  requirements: [
    "7+ years of professional software development experience",
    "Strong proficiency in JavaScript/TypeScript",
    "Experience with React, Node.js, and PostgreSQL",
    "Understanding of RESTful APIs and microservices architecture",
    "Excellent problem-solving and communication skills",
    "Experience with CI/CD pipelines and containerization",
  ],
  benefits: [
    "Competitive salary and performance bonuses",
    "Comprehensive health insurance coverage",
    "401(k) matching program",
    "Flexible work arrangements",
    "Professional development budget",
    "4 weeks paid time off",
    "Stock options for all employees",
  ],
  industry: "Technology & Software",
  companySize: "200-500 employees",
  website: "www.techcorp.com",
};

export default function JobDetailsPage() {
  const salaryRange = `$${(jobData.minimumSalary / 1000).toFixed(0)}K - $${(jobData.maximumSalary / 1000).toFixed(0)}K`;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-4">
            <a href="/jobs" className="hover:text-foreground transition">
              Jobs
            </a>{" "}
            / {jobData.companyName}
          </div>

          {/* Title and Company */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {jobData.jobTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {jobData.companyName}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1.5 font-medium"
            >
              {jobData.jobType}
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1.5 font-medium"
            >
              {jobData.employmentType}
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1.5 font-medium"
            >
              {jobData.experienceLevel}
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm px-3 py-1.5 font-medium"
            >
              {jobData.workArrangement}
            </Badge>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">
                  {jobData.primaryLocation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="font-medium text-foreground">{salaryRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Positions</p>
                <p className="font-medium text-foreground">
                  {jobData.numberOfPositions} Open
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-medium text-foreground">Senior Level</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 px-6 py-3">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-muted flex items-center gap-2 px-6 py-3"
            >
              <Bookmark className="w-4 h-4" />
              Save Job
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-8 border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {jobData.description}
              </p>
            </Card>

            {/* Responsibilities */}
            <Card className="p-8 border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Responsibilities
              </h2>
              <ul className="space-y-4">
                {jobData.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                    <p className="text-muted-foreground text-lg">
                      {responsibility}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-8 border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Requirements
              </h2>
              <ul className="space-y-4">
                {jobData.requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-secondary mt-2.5"></div>
                    <p className="text-muted-foreground text-lg">
                      {requirement}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Benefits */}
            <Card className="p-8 border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Benefits
              </h2>
              <ul className="space-y-4">
                {jobData.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5"></div>
                    <p className="text-muted-foreground text-lg">{benefit}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            <Card className="p-8 border-border shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Company Information
              </h3>

              {/* Company Logo Placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-6 flex items-center justify-center border border-border">
                <div className="text-center">
                  <Building2 className="w-10 h-10 text-primary/40 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Company Logo</p>
                </div>
              </div>

              {/* Company Details */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Industry
                  </p>
                  <p className="text-foreground font-medium">
                    {jobData.industry}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Company Size
                  </p>
                  <p className="text-foreground font-medium">
                    {jobData.companySize}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Website
                  </p>
                  <a
                    href={`https://${jobData.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {jobData.website}
                  </a>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
