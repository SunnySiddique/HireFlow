import CustomField from "@/components/CustomField";
import { Employer, EmployerFormData } from "@/types/employer";
import { Globe, Linkedin, Twitter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmployerSocialLinksProps {
  editMode: boolean;
  form: UseFormReturn<EmployerFormData>;
  employer?: Employer;
}

const EmployerSocialLinks = ({
  editMode,
  form,
  employer,
}: EmployerSocialLinksProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Social Links
        </h2>

        {!editMode && !employer?.linkedin_url && !employer?.twitter_url ? (
          <div className="py-12 text-center">
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No social links added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  LinkedIn
                </label>
              </div>
              {editMode ? (
                <CustomField
                  control={form.control}
                  label=""
                  name={"linkedinUrl"}
                  placeholder="https://linkedin.com/company/..."
                  type="url"
                />
              ) : (
                <a
                  href={employer?.linkedin_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {employer?.linkedin_url || "Not provided"}
                </a>
              )}
            </div>

            {/* Twitter */}
            <div className="bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-sky-600" />
                </div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Twitter/X
                </label>
              </div>
              {editMode ? (
                <CustomField
                  control={form.control}
                  label=""
                  name={"twitterUrl"}
                  placeholder="https://twitter.com/..."
                  type="url"
                />
              ) : (
                <a
                  href={employer?.twitter_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 font-semibold hover:underline"
                >
                  {employer?.twitter_url || "Not provided"}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerSocialLinks;
