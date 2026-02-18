"use client";

import { useEffect, useState } from "react";
import NavigationSidebar from "../../../../components/NavigationSidebar";
import About from "./_components/About";
import Documents from "./_components/Documents";
import Education from "./_components/Education";
import Experience from "./_components/Experience";
import HeroProfile from "./_components/HeroProfile";
import JobPreferences from "./_components/JobPreferences";
import Skills from "./_components/Skills";

import Loader from "@/components/Loader";
import {
  useGetJobSeekerProfileBySlug,
  useSaveJobSeekerProfile,
  useUploadProfileAndResume,
} from "@/hooks/useJobSeeker";
import {
  getReadableError,
  MAX_PROFILE_SIZE,
  MAX_RESUME_SIZE,
} from "@/lib/utils";
import {
  EducationItem,
  ExperienceItem,
  JobSeekerProfile,
  ProfileFormData,
} from "@/types/job-seeker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const profileSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    headline: z.string().min(5, "Headline must be at least 5 characters"),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(150, "Bio must not exceed 150 characters"),
    about: z
      .string()
      .min(10, "Bio must be at least 10 characters")
      .optional()
      .or(z.literal("")),
    expectedSalaryMin: z
      .number()
      .min(0, "Minimum salary cannot be negative")
      .optional()
      .or(z.literal("")),
    expectedSalaryMax: z
      .number()
      .min(0, "Maximum salary cannot be negative")
      .optional()
      .or(z.literal("")),
    desiredRole: z.string().optional(),
    preferredLocations: z.string().optional(),
    portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    openToWork: z.boolean(),
    jobType: z.string().optional(),
    profile_path: z.string().optional(),
    resume_path: z.string().optional(),
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

const ProfilePage = () => {
  const { slug } = useParams();
  // Job seeker profile from useJobSeeker.ts
  const { data: jobSeekerProfile, isLoading: isJobSeekerProfileLoading } =
    useGetJobSeekerProfileBySlug(slug as string);
  const router = useRouter();
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

  const profile = jobSeekerProfile?.profile;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || "",
      headline: profile?.headline || "",
      bio: profile?.bio || "",
      desiredRole: profile?.desired_role || "",
      expectedSalaryMin: profile?.expected_salary_min || "",
      expectedSalaryMax: profile?.expected_salary_max || "",
      preferredLocations: profile?.preferred_locations || "",
      portfolioUrl: profile?.portfolio_url || "",
      openToWork: profile?.open_to_work || true,
      jobType: profile?.preferred_job_type || "",
    },
  });

  const onValid = async (data: ProfileFormData) => {
    if (!jobSeekerProfile?.profile?.auth_id) return;

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
        try {
          const result = await uploadImage({
            bucketName: "job_seeker_profile",
            file: profileFile,
            currentFilePath: profile?.profile_path || undefined,
          });

          if (result.success) {
            profileUrl = result.url;
            profilePath = result.path;
          } else {
            return toast.error(
              result.message || "Failed to upload profile image",
            );
          }
        } catch (err: any) {
          return toast.error(getReadableError(err.message));
        }
      }

      if (resumeFile instanceof File) {
        if (resumeFile.size > MAX_RESUME_SIZE) {
          return toast.error("Resume too large. Max size: 5MB.");
        }

        try {
          const result = await uploadImage({
            bucketName: "resumes",
            file: resumeFile,
            currentFilePath: profile?.resume_path || undefined,
          });

          if (result.success) {
            resumeUrl = result.url;
            resumePath = result.path;
          } else {
            return toast.error(result.message || "Failed to upload resume");
          }
        } catch (err: any) {
          return toast.error(getReadableError(err.message));
        }
      }

      const payload: JobSeekerProfile = {
        auth_id: jobSeekerProfile.profile.auth_id,
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
        preferred_job_type: data.jobType,
        profile_url:
          profileUrl || jobSeekerProfile.profile.profile_url || undefined,
        resume_url:
          resumeUrl || jobSeekerProfile.profile.resume_url || undefined,
        profile_path: profilePath || "",
        resume_path: resumePath || "",
        experience: experiences.length
          ? experiences.map(({ id, ...rest }) => rest)
          : null,
        education: education.length
          ? education.map(({ id, ...rest }) => rest)
          : null,
        skills: skills.length ? skills : [],
      };

      await saveProfile(payload, {
        onSuccess: () => {
          setEditMode(false);
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const profile = jobSeekerProfile?.profile;
    if (!profile) return;

    setExperiences(
      (profile.experience ?? []).map((exp: any, idx: number) => ({
        id: idx,
        title: exp.title ?? "",
        company: exp.company ?? "",
        duration: exp.duration ?? "",
        description: exp.description ?? "",
      })),
    );

    setEducaiton(
      (profile.education ?? []).map((edu: any, idx: number) => ({
        id: idx,
        degree: edu.degree ?? "",
        school: edu.school ?? "",
        year: edu.year ?? "",
      })),
    );

    setSkills(profile.skills ?? []);

    form.reset({
      fullName: profile.full_name ?? "",
      headline: profile.headline ?? "",
      about: profile.about ?? "",
      bio: profile.bio ?? "",
      desiredRole: profile.desired_role ?? "",
      expectedSalaryMin: profile.expected_salary_min ?? "",
      expectedSalaryMax: profile.expected_salary_max ?? "",
      preferredLocations: profile.preferred_locations ?? "",
      portfolioUrl: profile.portfolio_url ?? "",
      openToWork: profile.open_to_work ?? true,
      jobType: profile.preferred_job_type ?? "",
    });
  }, [jobSeekerProfile?.profile, editMode, form]);

  const onInvalid = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  if (isJobSeekerProfileLoading) return <Loader />;
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Profile Section */}
      <HeroProfile
        handleProfileSave={form.handleSubmit(onValid, onInvalid)}
        form={form}
        editMode={editMode}
        setEditMode={setEditMode}
        isPending={isSubmitting}
        setProfileFile={setProfileFile}
        jobSeekerProfile={jobSeekerProfile}
      />
      {/* Main Content */}
      <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <NavigationSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            role={"job_seeker"}
          />

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* About Section */}
            {activeSection === "about" && (
              <About
                form={form}
                editMode={editMode}
                about={jobSeekerProfile?.profile?.about}
              />
            )}

            {/* Experience Section */}
            {activeSection === "experience" && (
              <Experience
                experiences={experiences}
                setExperiences={setExperiences}
                editMode={editMode}
                jobSeekerProfile={jobSeekerProfile?.profile}
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
                profile={profile}
              />
            )}

            {/* Documents Section */}
            {activeSection === "documents" && (
              <Documents
                editMode={editMode}
                form={form}
                portfolioUrl={profile?.portfolio_url}
                resumeUrl={profile?.resume_url}
                setResumeFile={setResumeFile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
