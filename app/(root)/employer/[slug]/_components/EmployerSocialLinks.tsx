import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmployerFormData } from "@/types/employer";
import { Globe, Linkedin, Twitter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmployerSocialLinksProps {
  editMode: boolean;
  form: UseFormReturn<EmployerFormData>;
}

const EmployerSocialLinks = ({ editMode, form }: EmployerSocialLinksProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Social Links
        </h2>

        {!editMode &&
        !form.watch("linkedinUrl") &&
        !form.watch("twitterUrl") ? (
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
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://linkedin.com/company/..."
                          {...field}
                          className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-blue-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <a
                  href={form.watch("linkedinUrl") || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {form.watch("linkedinUrl") || "Not provided"}
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
                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://twitter.com/..."
                          {...field}
                          className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-sky-500 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <a
                  href={form.watch("twitterUrl") || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 font-semibold hover:underline"
                >
                  {form.watch("twitterUrl") || "Not provided"}
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
