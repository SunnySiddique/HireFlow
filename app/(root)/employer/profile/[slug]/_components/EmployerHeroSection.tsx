import React, { useRef, useState } from "react";

import CustomField from "@/components/CustomField";
import EmptyState from "@/components/EmptyState";
import { EmployerFormData } from "@/types/employer";
import { Building2, Star, Upload } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface EmployerHeroSectionProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<EmployerFormData>;
  employer: any;
  setLogoFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

const EmployerHeroSection = ({
  editMode,
  form,
  employer,
  setLogoFile,
  isLoading,
}: EmployerHeroSectionProps) => {
  const logoRef = useRef<HTMLInputElement>(null);
  const [viewLogo, setViewLogo] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setViewLogo(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="border rounded-sm p-8 shadow-lg">
        {employer?.is_featured && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs mb-2 font-bold uppercase tracking-widest border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            Featured
          </div>
        )}
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="relative">
            <div className="w-24 h-24 rounded-lg bg-muted border-2 border-border flex items-center justify-center overflow-hidden">
              {viewLogo || employer?.company_logo_url ? (
                <Image
                  src={viewLogo || employer?.company_logo_url}
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
            {editMode && (
              <>
                <button
                  onClick={() => logoRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all"
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1">
            {editMode ? (
              <div className="space-y-4">
                <CustomField
                  control={form.control}
                  name="companyName"
                  label="Company Name"
                  placeholder="Company Name"
                />
                <CustomField
                  control={form.control}
                  name="industry"
                  label="Industry"
                  placeholder="e.g., Technology, Finance, Healthcare"
                />
              </div>
            ) : employer?.industry || employer?.founded_year ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-black mb-2">
                  {employer?.company_name}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-semibold mb-2">
                  {employer?.industry}
                </p>
                <p className="text-sm text-muted-foreground">
                  {employer?.founded_year}
                </p>
              </>
            ) : (
              <EmptyState
                icon={Building2}
                msg1="No Company Profile Yet"
                msg2={`Click the "Edit Profile" button to add your company information.`}
              />
            )}
          </div>

          {/* Hiring Status Badge */}
          {!editMode && employer?.industry && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${
                employer?.hiring_status.toLowerCase() === "actively_hiring"
                  ? "bg-green-500/15 text-green-700 border-green-500/30"
                  : employer?.hiring_status.toLowerCase() === "selective"
                    ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                    : "bg-red-500/15 text-red-700 border-red-500/30"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor:
                    employer.hiring_status.toLowerCase() === "actively_hiring"
                      ? "#22c55e"
                      : employer.hiring_status.toLowerCase() === "selective"
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              />
              <span className="capitalize">
                {employer.hiring_status.toLowerCase() || "Status not set"}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-6 pt-6 border-t border-primary/20">
          {editMode ? (
            <CustomField
              control={form.control}
              name="description"
              label="Company Description"
              placeholder="Tell us about your company..."
              type="textarea"
              isAbout={true}
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {form.watch("description")}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerHeroSection;
