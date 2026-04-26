"use client";

import Loader from "@/components/Loader";
import NavigationSidebar from "@/components/NavigationSidebar";
import ManageSubscription from "@/components/subscription/ManageSubscription";
import {
  useEmployerProfileBySlug,
  useUpdateEmployer,
  useUploadCompanyLogo,
} from "@/hooks/employer-profile/useEmployer";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess, MAX_PROFILE_SIZE } from "@/lib/utils";
import { UserSubscription } from "@/types";
import { EmployerDB, EmployerFormData } from "@/types/employer";
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

  industry: z.string().min(2, "Industry is required"),

  description: z.string().min(30, "Description must be at least 30 characters"),

  headquartersLocation: z.string().min(2, "Headquarters location is required"),

  website: z.string().url("Invalid URL").optional().or(z.literal("")),

  companySize: z.string().optional().or(z.literal("")),

  operatingLocations: z.string().optional().default(""),

  openPositionsCount: z.string().optional().or(z.literal("")),
  coreValues: z.array(z.string()).optional().default([]),

  hiringStatus: z
    .enum(["actively_hiring", "selective", "not_hiring"])
    .default("actively_hiring"),

  foundedYear: z.coerce.number().nullable().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

interface EmployerProfileProps {
  slug: string;
}

const EmployerProfile = ({ slug }: EmployerProfileProps) => {
  // hooks
  const {
    mutateAsync: updateEmployerProfile,
    isPending: isEmployerProfleUpdating,
  } = useUpdateEmployer();

  const { mutateAsync: uploadCompanyLogo, isPending: isLogoUploading } =
    useUploadCompanyLogo();

  const { data: employerProfile, isLoading } = useEmployerProfileBySlug(slug);
  const { data: subscription } = useGetCurrentUserSubscription();
  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  // states
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [logoFile, setLogoFile] = useState<File | null>(null);

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
      coreValues: employerProfile?.core_values ?? [],
    },
  });

  const onSubmit = async (data: EmployerFormData) => {
    if (!employerProfile?.id) return;
    let logoUrl;
    let comLogoPath;

    if (logoFile instanceof File) {
      if (logoFile.size > MAX_PROFILE_SIZE) {
        return toast.error("Company image too large. Max size: 1MB.");
      }

      const result = await uploadCompanyLogo({
        file: logoFile,
        logoPath: employerProfile?.logo_path || undefined,
      });

      if (result.success) {
        logoUrl = result.url;
        comLogoPath = result.path;
      }
    }
    const payload: EmployerDB = {
      company_name: data.companyName,
      website: data.website,
      company_logo_url: logoUrl,
      industry: data.industry,
      company_size: data.companySize,
      description: data.description,
      headquarters_location: data.headquartersLocation,
      open_positions_count: Number(data.openPositionsCount) || 0,
      hiring_status: data.hiringStatus,
      core_values: data.coreValues || [],
      founded_year: data.foundedYear ? Number(data.foundedYear) : null,
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
  };

  const onError = (errors: any) => {
    const firstError = Object.values(errors)[0] as any;
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  const isSaving = isEmployerProfleUpdating || isLogoUploading;

  useEffect(() => {
    if (employerProfile) {
      form.reset({
        companyName: employerProfile.company_name ?? "",
        website: employerProfile.website ?? "",
        industry: employerProfile.industry ?? "",
        companySize: employerProfile.company_size ?? "",
        description: employerProfile.description ?? "",
        headquartersLocation: employerProfile.headquarters_location ?? "",
        operatingLocations: employerProfile.operating_locations || [], // ✅ array
        openPositionsCount: String(employerProfile.open_positions_count ?? "0"), // ✅ String()
        hiringStatus: employerProfile.hiring_status ?? "actively hiring",
        foundedYear: String(employerProfile.founded_year ?? ""), // ✅ String()
        linkedinUrl: employerProfile.linkedin_url ?? "",
        twitterUrl: employerProfile.twitter_url ?? "",
        coreValues: employerProfile.core_values ?? [], // ← this was missing
      });
    }
  }, [employerProfile, editMode, form]);

  if (isLoading) return <Loader mode="inline" />;

  return (
    <FormProvider {...form}>
      {/* Header */}
      <Header
        handleProfileSave={form.handleSubmit(onSubmit, onError)}
        form={form}
        editMode={editMode}
        setEditMode={setEditMode}
        isLoading={isSaving}
      />

      {/* Main Content */}
      <div className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <NavigationSidebar
            isSubscribed={isSubscribed}
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
              employer={employerProfile ?? undefined}
              setLogoFile={setLogoFile}
              isLoading={isSaving}
            />
            {/* About Section */}
            {activeSection === "about" && (
              <EmployerAbout
                editMode={editMode}
                form={form}
                setEditMode={setEditMode}
                employer={employerProfile ?? undefined}
              />
            )}
            {/* Open Positions Section */}
            {activeSection === "positions" && (
              <OpenPositions
                editMode={editMode}
                form={form}
                employer={employerProfile ?? undefined}
              />
            )}
            {/* Culture Section */}
            {activeSection === "culture" && (
              <EmployerCulture form={form} editMode={editMode} />
            )}
            {/* Locations Section */}
            {activeSection === "locations" && (
              <EmployerLocations
                editMode={editMode}
                form={form}
                employer={employerProfile ?? undefined}
              />
            )}
            {/* Social Links Section */}
            {activeSection === "social" && (
              <EmployerSocialLinks
                editMode={editMode}
                form={form}
                employer={employerProfile ?? undefined}
              />
            )}
            {isSubscribed && activeSection === "billing" && (
              <ManageSubscription
                subscription={subscription as UserSubscription}
                userRole="employer"
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EmployerProfile;
