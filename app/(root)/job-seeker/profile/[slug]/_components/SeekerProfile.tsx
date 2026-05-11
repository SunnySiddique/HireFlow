"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import NavigationSidebar from "@/components/NavigationSidebar";
import ManageSubscription from "@/components/subscription/ManageSubscription";
import {
  useGetJobSeekerProfileBySlug,
  useSaveJobSeekerProfile,
  useUploadProfileAndResume,
} from "@/hooks/seeker-profile/useSeeker";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess, MAX_PROFILE_SIZE, MAX_RESUME_SIZE } from "@/lib/utils";
import { UserSubscription } from "@/types";
import {
  EducationItem,
  ExperienceItem,
  JobSeekerProfile,
  JobSeekerProfileDB,
  ProfileFormData,
} from "@/types/job-seeker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import About from "./About";
import Documents from "./Documents";
import Education from "./Education";
import Experience from "./Experience";
import HeroProfile from "./HeroProfile";
import JobPreferences from "./JobPreferences";
import Skills from "./Skills";

const profileSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .optional(),
    headline: z
      .string()
      .min(5, "Headline must be at least 5 characters")
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(150, "Bio must not exceed 150 characters")
      .optional()
      .or(z.literal("")), // optional, allow empty string
    about: z
      .string()
      .min(10, "About must be at least 10 characters")
      .max(500, "About cannot exceed 500 characters")
      .optional()
      .or(z.literal("")), // optional, allow empty string
    expectedSalaryMin: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().min(0, "Minimum salary cannot be negative").optional()),
    expectedSalaryMax: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return Number(val);
    }, z.number().min(0, "Maximum salary cannot be negative").optional()),
    desiredRole: z.string().optional().or(z.literal("")),
    preferredLocations: z.string().optional().or(z.literal("")),
    portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    openToWork: z.boolean().optional(),
    preferred_job_type: z.string().optional().or(z.literal("")),
    profile_path: z.string().optional().or(z.literal("")),
    resume_path: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      data.expectedSalaryMin === undefined ||
      data.expectedSalaryMax === undefined ||
      data.expectedSalaryMax >= data.expectedSalaryMin,
    {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["expectedSalaryMax"],
    },
  );

const SeekerProfile = () => {
  const { slug } = useParams();
  // hooks
  const { data: jobSeekerProfile, isLoading: isJobSeekerProfileLoading } =
    useGetJobSeekerProfileBySlug(slug as string);

  const { data: subscription } = useGetCurrentUserSubscription();
  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );
  //states
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [education, setEducaiton] = useState<EducationItem[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // mutate funtions
  const { mutateAsync: saveProfile } = useSaveJobSeekerProfile();
  const { mutateAsync: uploadImage } = useUploadProfileAndResume();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: jobSeekerProfile?.full_name || "",
      headline: jobSeekerProfile?.headline || "",
      bio: jobSeekerProfile?.bio || "",
      desiredRole: jobSeekerProfile?.desired_role || "",
      expectedSalaryMin: jobSeekerProfile?.expected_salary_min || "",
      expectedSalaryMax: jobSeekerProfile?.expected_salary_max || "",
      preferredLocations: jobSeekerProfile?.preferred_locations || "",
      portfolioUrl: jobSeekerProfile?.portfolio_url || "",
      openToWork: jobSeekerProfile?.open_to_work || true,
      preferred_job_type: jobSeekerProfile?.preferred_job_type || "",
    },
  });

  const onValid = async (data: ProfileFormData) => {
    if (!jobSeekerProfile?.auth_id) return;

    setIsSubmitting(true);

    try {
      let profileUrl: string | undefined;
      let resumeUrl: string | undefined;
      let profilePath: string | undefined;
      let resumePath: string | undefined;

      if (profileFile instanceof File) {
        if (profileFile.size > MAX_PROFILE_SIZE) {
          return toast.error("Profile image too large. Max size: 1MB.");
        }
        if (profileFile.size > 5 * 1024 * 1024) {
          return toast.error("Profile image must be under 5MB to upload.");
        }

        const result = await uploadImage({
          bucketName: "job_seeker_profile",
          file: profileFile,
          currentFilePath: jobSeekerProfile?.profile_path || undefined,
        });

        if (result.success) {
          profileUrl = result.url;
          profilePath = result.path;
        }
      }

      if (resumeFile instanceof File) {
        if (resumeFile.size > MAX_RESUME_SIZE) {
          return toast.error("Resume too large. Max size: 5MB.");
        }

        const result = await uploadImage({
          bucketName: "resumes",
          file: resumeFile,
          currentFilePath: jobSeekerProfile?.resume_path || undefined,
        });

        if (result.success) {
          resumeUrl = result.url;
          resumePath = result.path;
        }
      }

      const payload = {
        full_name: data.fullName.trim(),
        headline: data.headline.trim(),
        bio: data.bio.trim(),
        about: data.about?.trim(),
        expected_salary_min: Number(data.expectedSalaryMin) || null,
        expected_salary_max: Number(data.expectedSalaryMax) || null,
        desired_role: data.desiredRole?.trim(),
        preferred_locations: data.preferredLocations?.trim(),
        portfolio_url: data.portfolioUrl?.trim(),
        open_to_work: data.openToWork,
        preferred_job_type: data.preferred_job_type,
        profile_url: (profileUrl || jobSeekerProfile.profile_url) ?? "",
        resume_url: (resumeUrl || jobSeekerProfile.resume_url) ?? "",
        profile_path: profilePath || "",
        resume_path: resumePath || "",
        experience: experiences.length
          ? experiences.map(({ id, ...rest }) => rest)
          : null,
        education: education.length
          ? education.map(({ id, ...rest }) => rest)
          : null,
        skills: skills.map((s) => s.toLowerCase()),
      };

      await saveProfile(payload as JobSeekerProfileDB, {
        onSuccess: () => {
          setEditMode(false);
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!jobSeekerProfile) return;

    setExperiences(
      ((jobSeekerProfile.experience ?? []) as unknown as ExperienceItem[]).map(
        (exp: ExperienceItem, idx: number) => ({
          id: idx,
          title: exp.title ?? "",
          company: exp.company ?? "",
          duration: exp.duration ?? "",
          description: exp.description ?? "",
        }),
      ),
    );

    setEducaiton(
      ((jobSeekerProfile.education ?? []) as unknown as EducationItem[]).map(
        (edu: EducationItem, idx: number) => ({
          id: idx,
          degree: edu.degree ?? "",
          school: edu.school ?? "",
          year: edu.year ?? "",
        }),
      ),
    );

    setSkills(jobSeekerProfile.skills ?? []);

    form.reset({
      fullName: jobSeekerProfile.full_name || "",
      headline: jobSeekerProfile.headline || "",
      bio: jobSeekerProfile.bio || "",
      desiredRole: jobSeekerProfile.desired_role || "",
      expectedSalaryMin: jobSeekerProfile.expected_salary_min || "",
      expectedSalaryMax: jobSeekerProfile.expected_salary_max || "",
      preferredLocations: jobSeekerProfile.preferred_locations || "",
      portfolioUrl: jobSeekerProfile.portfolio_url || "",
      openToWork: jobSeekerProfile.open_to_work ?? true,
      preferred_job_type: jobSeekerProfile.preferred_job_type || "",
    });
  }, [jobSeekerProfile, editMode, form]);

  const onInvalid = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  if (isJobSeekerProfileLoading || !jobSeekerProfile)
    return <Loader mode="inline" />;

  return (
    <>
      {/* Hero Profile Section */}
      <HeroProfile
        handleProfileSave={form.handleSubmit(onValid, onInvalid)}
        form={form}
        editMode={editMode}
        setEditMode={setEditMode}
        isPending={isSubmitting}
        setProfileFile={setProfileFile}
        jobSeekerProfile={jobSeekerProfile as JobSeekerProfile}
      />
      {/* Main Content */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-5">
          {/* Sidebar Navigation */}
          <NavigationSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            role={"job_seeker"}
            isSubscribed={isSubscribed}
          />

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* About Section */}
            {activeSection === "about" && (
              <About
                form={form}
                editMode={editMode}
                about={jobSeekerProfile?.about}
              />
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Experience
                experiences={experiences}
                setExperiences={setExperiences}
                editMode={editMode}
                jobSeekerProfile={jobSeekerProfile as JobSeekerProfile}
              />
            )}

            {/* Education Section */}
            {activeSection === "education" && (
              <Education
                education={education}
                setEducation={setEducaiton}
                editMode={editMode}
              />
            )}

            {/* Skills Section */}
            {activeSection === "skills" && (
              <Skills
                skills={skills}
                setSkills={setSkills}
                editMode={editMode}
              />
            )}

            {/* Job Preferences Section */}
            {activeSection === "preferences" && (
              <JobPreferences
                editMode={editMode}
                form={form}
                profile={jobSeekerProfile as JobSeekerProfile}
              />
            )}

            {/* Documents Section */}
            {activeSection === "documents" && (
              <Documents
                editMode={editMode}
                form={form}
                portfolioUrl={jobSeekerProfile?.portfolio_url}
                resumeUrl={jobSeekerProfile?.resume_url}
                setResumeFile={setResumeFile}
              />
            )}

            {isSubscribed && activeSection === "billing" && (
              <ManageSubscription
                subscription={subscription as UserSubscription}
                userRole="job-seeker"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeekerProfile;
