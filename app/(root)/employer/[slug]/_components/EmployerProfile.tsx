"use client";

import NavigationSidebar from "@/components/NavigationSidebar";
import {
  useEmployerProfileBySlug,
  useUpdateEmployer,
  useUploadCompanyLogo,
} from "@/hooks/useEmployer";
import { getReadableError, MAX_PROFILE_SIZE } from "@/lib/utils";
import { EmployerFormData, EmployerType } from "@/types/employer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  industry: z.string().optional().or(z.literal("")),
  companySize: z.string().optional().or(z.literal("")),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  headquartersLocation: z.string().optional().or(z.literal("")),
  operatingLocations: z.string().optional().default(""),
  openPositionsCount: z.string().optional().or(z.literal("")),
  hiringStatus: z
    .enum(["actively hiring", "selective", "not hiring"])
    .default("actively hiring"),
  foundedYear: z.string().optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface EmployerProfileProps {
  slug: string;
}

const EmployerProfile = ({ slug }: EmployerProfileProps) => {
  const {
    mutateAsync: updateEmployerProfile,
    isPending: isEmployerProfleUpdating,
  } = useUpdateEmployer();
  const { mutateAsync: uploadCompanyLogo, isPending: isLogoUploading } =
    useUploadCompanyLogo();

  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [coreValues, setCoreValues] = useState<string[]>([]);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { data: employerProfile } = useEmployerProfileBySlug(slug);

  const form = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      description: "",
      headquartersLocation: "",
      operatingLocations: [],
      openPositionsCount: "",
      hiringStatus: "actively hiring",
      foundedYear: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
  });
  console.log("employerprofile:", employerProfile);

  const onSubmit = async (data: EmployerFormData) => {
    try {
      let logoUrl;
      let comLogoPath;
      if (!employerProfile?.auth_id) {
        toast.error("User auth_id is missing");
        return;
      }

      if (logoFile instanceof File) {
        if (logoFile.size > MAX_PROFILE_SIZE) {
          return toast.error("Company image too large. Max size: 1MB.");
        }
        try {
          const result = await uploadCompanyLogo({
            file: logoFile,
            logoPath: employerProfile?.logo_path || undefined,
          });

          if (result.success) {
            logoUrl = result.url;
            comLogoPath = result.path;
          } else {
            return toast.error("Failed to upload profile image");
          }
        } catch (err: any) {
          return toast.error(getReadableError(err.message));
        }
      }
      const payload: EmployerType = {
        auth_id: employerProfile.auth_id,
        company_name: data.companyName,
        website: data.website,
        company_logo_url: logoUrl,
        industry: data.industry,
        company_size: data.companySize,
        description: data.description,
        headquarters_location: data.headquartersLocation,
        open_positions_count: data.openPositionsCount || "0",
        hiring_status: data.hiringStatus,
        core_values: coreValues.length ? coreValues : [],
        founded_year: data.foundedYear,
        linkedin_url: data.linkedinUrl,
        twitter_url: data.twitterUrl,
        operating_locations: data.operatingLocations || "",
        logo_path: comLogoPath || "",
      };

      await updateEmployerProfile(payload, {
        onSuccess: () => {
          toast.success("Profile Updated Successfully");
          setEditMode(false);
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong ");
    }
  };

  const onError = (errors: any) => {
    console.log(errors);

    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  const isSaving = isEmployerProfleUpdating || isLogoUploading;

  useEffect(() => {
    if (employerProfile) {
      setCoreValues(employerProfile?.core_values ?? []);
      form.reset({
        companyName: employerProfile.company_name || "",
        website: employerProfile.website || "",
        industry: employerProfile.industry || "",
        companySize: employerProfile.company_size || "",
        description: employerProfile.description || "",
        headquartersLocation: employerProfile.headquarters_location || "",
        operatingLocations: employerProfile.operating_locations || [], // ✅ array
        openPositionsCount: String(employerProfile.open_positions_count ?? "0"), // ✅ String()
        hiringStatus: employerProfile.hiring_status || "actively hiring",
        foundedYear: String(employerProfile.founded_year ?? ""), // ✅ String()
        linkedinUrl: employerProfile.linkedin_url || "",
        twitterUrl: employerProfile.twitter_url || "",
      });
    }
  }, [employerProfile, editMode, form]);

  //TODO fix the input fields toast error and commit the changes in the github
  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          handleProfileSave={form.handleSubmit(onSubmit, onError)}
          form={form}
          editMode={editMode}
          setEditMode={setEditMode}
          isLoading={isSaving}
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
                employer={employerProfile}
                setLogoFile={setLogoFile}
                isLoading={isSaving}
              />
              {/* About Section */}
              {activeSection === "about" && (
                <EmployerAbout
                  editMode={editMode}
                  form={form}
                  setEditMode={setEditMode}
                  employer={employerProfile}
                />
              )}
              {/* Open Positions Section */}
              {activeSection === "positions" && (
                <OpenPositions
                  editMode={editMode}
                  form={form}
                  employer={employerProfile}
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
                <EmployerLocations
                  editMode={editMode}
                  form={form}
                  employer={employerProfile}
                />
              )}
              {/* Social Links Section */}
              {activeSection === "social" && (
                <EmployerSocialLinks
                  editMode={editMode}
                  form={form}
                  employer={employerProfile}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EmployerProfile;
