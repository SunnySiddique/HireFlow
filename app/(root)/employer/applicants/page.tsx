"use client";

import Loader from "@/components/Loader";
import { useGetAllApplicants } from "@/hooks/useJobs";
import ApplicantsSearchBar from "./_component/ApplicantsSearchBar";
import ApplicantsStatsCards from "./_component/ApplicantsStatsCards";
import ApplicantsTable from "./_component/ApplicantsTable";

// Mock data
const mockApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-02-20",
    status: "Shortlisted",
    avatar: "SJ",
    gradient: "from-blue-400 to-blue-600",
    resumeUrl: "#",
    coverLetter:
      "I am excited to apply for the Senior Frontend Developer position. With 5+ years of experience in React and modern web technologies...",
    notes: "Strong portfolio, excellent communication skills",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    jobTitle: "Product Manager",
    appliedDate: "2024-02-19",
    status: "Reviewing",
    avatar: "MC",
    gradient: "from-green-400 to-green-600",
    resumeUrl: "#",
    coverLetter:
      "I bring 7 years of product management experience at leading tech companies...",
    notes: "Good background, needs technical skills assessment",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    jobTitle: "UX/UI Designer",
    appliedDate: "2024-02-18",
    status: "Pending",
    avatar: "ER",
    gradient: "from-purple-400 to-purple-600",
    resumeUrl: "#",
    coverLetter:
      "Passionate designer with expertise in user-centered design...",
    notes: "",
  },
  {
    id: 4,
    name: "David Park",
    email: "david.park@email.com",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2024-02-17",
    status: "Rejected",
    avatar: "DP",
    gradient: "from-orange-400 to-orange-600",
    resumeUrl: "#",
    coverLetter:
      "Experienced developer with 3 years in JavaScript frameworks...",
    notes: "Limited experience with required tech stack",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    jobTitle: "Backend Engineer",
    appliedDate: "2024-02-16",
    status: "Shortlisted",
    avatar: "LW",
    gradient: "from-pink-400 to-pink-600",
    resumeUrl: "#",
    coverLetter:
      "Backend specialist with expertise in Node.js and databases...",
    notes: "Great problem-solving skills, strong system design knowledge",
  },
];

const ApplicantsPage = () => {
  const { data: applicants, isLoading } = useGetAllApplicants();

  if (isLoading) return <Loader />;

  return (
    <div className="flex-1 flex flex-col w-full min-w-0">
      {/* Page Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">
            Applicants
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Manage and review job applications
          </p>
        </div>

        {/* Search and Filter Bar */}
        <ApplicantsSearchBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <ApplicantsStatsCards applicants={mockApplicants} />

          {/* Applicants Table */}
          <ApplicantsTable applicants={applicants} />
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
