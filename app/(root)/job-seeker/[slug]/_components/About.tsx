import CustomField from "@/components/CustomField";
import { ProfileFormData } from "@/types/job-seeker";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface AboutProps {
  editMode: boolean;
  form: UseFormReturn<ProfileFormData>;
  about: string | undefined | null;
}

const About = ({ editMode, form, about }: AboutProps) => {
  return (
    <FormProvider {...form}>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          About
        </h2>
        {editMode ? (
          <CustomField
            control={form.control}
            placeholder="Tell us about yourself..."
            label="About"
            isAbout={true}
            type="textarea"
            name="about"
          />
        ) : (
          <p className="text-muted-foreground leading-relaxed text-lg">
            {about ? (
              about
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  No bio added yet. Click edit to add your professional bio.
                </p>
              </div>
            )}
          </p>
        )}
      </div>
    </FormProvider>
  );
};

export default About;
