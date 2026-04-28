import React, { useRef, useState } from "react";

import CustomField from "@/components/CustomField";
import EmptyState from "@/components/EmptyState";
import { statusLabel } from "@/constants/employerData";
import { Employer, EmployerFormData } from "@/types/employer";
import { motion } from "framer-motion";
import { Building2, Star } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface EmployerHeroSectionProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<EmployerFormData>;
  employer?: Employer;
  setLogoFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

const EmployerHeroSection = ({
  editMode,
  form,
  employer,
  setLogoFile,
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
  const hiringStatus = employer?.hiring_status?.toLowerCase() ?? "";

  return (
    <>
      <div className="border rounded-lg p-4 sm:p-6 md:p-8 shadow-lg relative overflow-hidden bg-card">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          {/* Logo Wrapper */}
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden z-10 transition-all ${
                employer?.is_featured
                  ? "border-4 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                  : "border-2 border-border"
              }`}
            >
              {viewLogo || employer?.company_logo_url ? (
                <Image
                  src={viewLogo || employer?.company_logo_url || ""}
                  alt="Profile image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, 128px"
                  priority
                />
              ) : (
                <Building2 className="w-12 h-12 text-muted-foreground" />
              )}

              {!editMode && employer?.is_featured && (
                <motion.div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold shadow">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </div>
                </motion.div>
              )}
            </div>

            {/* Glowing Featured Badge (like Job Seeker profile) */}
            {!editMode && employer?.is_featured && (
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

            {editMode && (
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            )}
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
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
              <div className="pt-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-black truncate">
                    {employer?.company_name}
                  </h1>

                  {employer?.is_featured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        delay: 0.5,
                      }}
                      className="hidden md:flex shrink-0 items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20"
                      title="Featured Company"
                    >
                      <Star className="w-4 h-4 sm:w-4 sm:h-4 fill-white" />
                    </motion.div>
                  )}
                </div>
                <p className="text-lg sm:text-xl text-muted-foreground font-semibold mb-2">
                  {employer?.industry}
                </p>
                <p className="text-sm text-muted-foreground">
                  {employer?.founded_year &&
                    `Founded: ${employer.founded_year}`}
                </p>
              </div>
            ) : (
              <div className="py-4">
                <EmptyState
                  icon={Building2}
                  msg1="No Company Profile Yet"
                  msg2="Click the Edit Profile button to add your company information."
                />
              </div>
            )}
          </div>

          {/* Hiring Status Badge */}
          {!editMode && employer?.industry && (
            <div
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${
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

        {/* Description */}
        <div className="mt-8 pt-6 border-t border-primary/20">
          {editMode ? (
            <CustomField
              control={form.control}
              name="description"
              label="Company Description"
              placeholder="Tell us about your company..."
              type="textarea"
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {form?.watch ? form.watch("description") : ""}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerHeroSection;
