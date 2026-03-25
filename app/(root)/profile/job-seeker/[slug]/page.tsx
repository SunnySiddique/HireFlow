"use client";

import Loader from "@/components/Loader";
import NavigationSidebar from "@/components/NavigationSidebar";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetJobSeekerProfileBySlug } from "@/hooks/useJobSeeker";
import { useTrackSeekerProfileView } from "@/hooks/useViews";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import About from "./_components/About";
import Documents from "./_components/Documents";
import Education from "./_components/Education";
import Experience from "./_components/Experience";
import HeroProfile from "./_components/HeroProfile";
import JobPreferences from "./_components/JobPreferences";
import Skills from "./_components/Skills";

const PublicProfilePage = () => {
  const { slug } = useParams();

  const { data: currentUser } = useGetCurrentUser();
  const { mutate: trackView } = useTrackSeekerProfileView();

  const { data: jobSeekerProfile, isLoading: isJobSeekerProfileLoading } =
    useGetJobSeekerProfileBySlug(slug as string);

  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    if (!jobSeekerProfile?.id) return;
    if (!currentUser) return;

    trackView(jobSeekerProfile.id);
  }, [jobSeekerProfile?.id]);

  if (isJobSeekerProfileLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="bg-background border-b border-border px-4 lg:px-8 py-2 sticky top-0 z-50">
        <Link
          href={window.origin}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>
      {/* Hero Profile Section */}
      <HeroProfile jobSeekerProfile={jobSeekerProfile} />

      {/* Main Content */}
      <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <NavigationSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            role={"job_seeker"}
            isSubscribed={false}
          />

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* About Section */}
            {activeSection === "about" && (
              <About about={jobSeekerProfile?.about} />
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Experience experiences={jobSeekerProfile?.experience} />
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <Education education={jobSeekerProfile?.education} />
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <Skills skills={jobSeekerProfile?.skills} />
            )}

            {/* Job Preferences Section */}
            {activeSection === "preferences" && (
              <JobPreferences profile={jobSeekerProfile} />
            )}

            {/* Documents Section */}
            {activeSection === "documents" && (
              <Documents
                portfolioUrl={jobSeekerProfile?.portfolio_url}
                resumeUrl={jobSeekerProfile?.resume_url}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
