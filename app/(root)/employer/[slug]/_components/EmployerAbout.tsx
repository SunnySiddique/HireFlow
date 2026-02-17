import CustomField from "@/components/CustomField";
import { EmployerFormData } from "@/types/employer";
import { Calendar, Globe, MapPin, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmployerAboutProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<EmployerFormData>;
  // handleProfileSave: () => void;
  employer: any;
}

const EmployerAbout = ({ editMode, form, employer }: EmployerAboutProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          About Company
        </h2>
        {/* No company details added. Click edit to add information. */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Website */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <label className="text-xs font-bold text-muted-foreground uppercase">
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
                className="text-blue-600 font-semibold hover:underline"
              >
                {employer?.website || "Not provided"}
              </a>
            )}
          </div>

          {/* Company Size */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <label className="text-xs font-bold text-muted-foreground uppercase">
                Company Size
              </label>
            </div>
            {editMode ? (
              <CustomField
                label=""
                control={form.control}
                name="companySize"
                placeholder="e.g., 50-100, 1000+"
              />
            ) : (
              <p className="text-foreground font-semibold">
                {employer?.company_size || "Not specified"}
              </p>
            )}
          </div>

          {/* Headquarters */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <label className="text-xs font-bold text-muted-foreground uppercase">
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
              <p className="text-foreground font-semibold">
                {employer?.headquarters_location || "Not specified"}
              </p>
            )}
          </div>

          {/* Founded Year */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <label className="text-xs font-bold text-muted-foreground uppercase">
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
              <p className="text-foreground font-semibold">
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
