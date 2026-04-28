import CustomField from "@/components/CustomField";
import { Employer, EmployerFormData } from "@/types/employer";
import { Calendar, Globe, MapPin, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmployerAboutProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<EmployerFormData>;
  employer?: Employer;
}

const EmployerAbout = ({ editMode, form, employer }: EmployerAboutProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
        {/* Header */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <span className="w-1 h-6 sm:w-1.5 sm:h-8 bg-primary rounded-full"></span>
          About Company
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Website */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <label className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">
                Website
              </label>
            </div>

            {editMode ? (
              <CustomField
                label=""
                control={form.control}
                name="website"
                placeholder="https://example.com"
                type="url"
              />
            ) : (
              <a
                href={employer?.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium text-sm sm:text-base break-all hover:underline"
              >
                {employer?.website || "Not provided"}
              </a>
            )}
          </div>

          {/* Company Size */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <label className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">
                Company Size
              </label>
            </div>

            {editMode ? (
              <CustomField
                label=""
                control={form.control}
                name="companySize"
                placeholder="e.g., 50-100"
              />
            ) : (
              <p className="text-foreground font-medium text-sm sm:text-base">
                {employer?.company_size || "Not specified"}
              </p>
            )}
          </div>

          {/* Headquarters */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <label className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">
                Headquarters
              </label>
            </div>

            {editMode ? (
              <CustomField
                label=""
                control={form.control}
                name="headquartersLocation"
                placeholder="City, Country"
              />
            ) : (
              <p className="text-foreground font-medium text-sm sm:text-base break-words">
                {employer?.headquarters_location || "Not specified"}
              </p>
            )}
          </div>

          {/* Founded */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <label className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase">
                Founded
              </label>
            </div>

            {editMode ? (
              <CustomField
                label=""
                control={form.control}
                name="foundedYear"
                placeholder="e.g., 2010"
              />
            ) : (
              <p className="text-foreground font-medium text-sm sm:text-base">
                {employer?.founded_year || "Not specified"}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerAbout;
