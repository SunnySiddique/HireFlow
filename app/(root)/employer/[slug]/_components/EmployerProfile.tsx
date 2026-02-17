"use client";

import NavigationSidebar from "@/components/NavigationSidebar";
import { useEmployerProfileById, useUpdateEmployer } from "@/hooks/useEmployer";
import { EmployerFormData } from "@/types/employer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import EmployerAbout from "./EmployerAbout";
import EmployerCulture from "./EmployerCulture";
import EmployerHeroSection from "./EmployerHeroSection";
import EmployerLocations from "./EmployerLocations";
import EmployerSocialLinks from "./EmployerSocialLinks";
import Header from "./Header";
import OpenPositions from "./OpenPositions";

// Zod schemas
const employerSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  headquartersLocation: z.string().optional(),
  operatingLocations: z.string().optional(),
  openPositionsCount: z.string().optional(),
  hiringStatus: z
    .enum(["actively hiring", "not hiring", "selective"])
    .optional(),
  coreValues: z.array(z.string()).optional(),
  foundedYear: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface EmployerProfileProps {
  slug: string;
}

const EmployerProfile = ({ slug }: EmployerProfileProps) => {
  const { mutate: updateEmployerProfile, isPending: isEmployerProfleUpdating } =
    useUpdateEmployer();

  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [coreValues, setCoreValues] = useState<string[]>([]);

  const [logoFile, setLogoFile] = useState<string | null>(null);
  const { data: employerProifle } = useEmployerProfileById(slug);

  const form = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      description: "",
      headquartersLocation: "",
      operatingLocations: "",
      openPositionsCount: "",
      hiringStatus: "actively hiring",
      coreValues: [],
      foundedYear: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
  });

  const onSubmit = (data: EmployerFormData) => {
    console.log("[v0] Complete Employer Profile Data:", data);

    setEditMode(false);
  };

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          handleProfileSave={form.handleSubmit(onSubmit)}
          form={form}
          editMode={editMode}
          setEditMode={setEditMode}
          // isPending={isSubmitting}
          // setProfileFile={setProfileFile}
          // jobSeekerProfile={jobSeekerProfile}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <NavigationSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              role="employer"
            />

            {/* Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Hero Section */}
              <EmployerHeroSection
                editMode={editMode}
                form={form}
                setEditMode={setEditMode}
                employer={employerProifle}
              />
              {/* About Section */}
              {activeSection === "about" && (
                <EmployerAbout
                  editMode={editMode}
                  form={form}
                  setEditMode={setEditMode}
                  employer={employerProifle}
                />
              )}
              {/* Open Positions Section */}
              {activeSection === "positions" && (
                <OpenPositions
                  editMode={editMode}
                  form={form}
                  employer={employerProifle}
                />
              )}
              {/* Culture Section */}
              {activeSection === "culture" && (
                <EmployerCulture
                  coreValues={coreValues}
                  setCoreValues={setCoreValues}
                  editMode={editMode}
                />
              )}
              {/* Locations Section */}
              {activeSection === "locations" && (
                <EmployerLocations editMode={editMode} form={form} />
              )}
              {/* Social Links Section */}
              {activeSection === "social" && (
                <EmployerSocialLinks editMode={editMode} form={form} />
              )}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EmployerProfile;
