import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { X } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface JobDescriptionProps {
  form: UseFormReturn<JobFormValues>;
}

const JobDescription = ({ form }: JobDescriptionProps) => {
  const [skillInput, setSkillInput] = useState<string>("");
  // Replace the requirements textarea with this
  const [requirementInput, setRequirementInput] = useState("");

  const addRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = requirementInput.trim().replace(/,$/, "");
      if (!value) return;
      const current = form.getValues("requirements") as string[];
      form.setValue("requirements", [...current, value]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    const current = form.getValues("requirements") as string[];
    form.setValue(
      "requirements",
      current.filter((_, i) => i !== index),
    );
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = skillInput.trim().replace(/,$/, "");
      if (!value) return;
      const current = form.getValues("skills") as string[];
      form.setValue("skills", [...current, value]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const current = form.getValues("skills") as string[];
    form.setValue(
      "skills",
      current.filter((_, i) => i !== index),
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Job Description
      </h2>
      <p className="text-muted-foreground mb-8">
        Provide detailed information about the role
      </p>

      <div className="space-y-6">
        {/* Job Description */}
        <CustomField
          control={form.control}
          name="jobDescription"
          label="Job Description *"
          type="textarea"
          placeholder="Describe the role, responsibilities, and what success looks like..."
          isJob={true}
        />

        {/* Requirements Field */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground block">
            Requirements *
          </label>

          <div className="space-y-4">
            {/* Input Area with Icon */}
            <div className="relative">
              <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyDown={addRequirement}
                placeholder="e.g., 5+ years of experience, Bachelor's degree..."
                className="w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                Enter ↵
              </span>
            </div>

            {/* Requirements Display Container */}
            {(form.watch("requirements") as string[]).length > 0 && (
              <div className="border border-border rounded-md bg-card p-4 min-h-20 overflow-y-scroll max-h-60">
                <div className="space-y-2">
                  {(form.watch("requirements") as string[]).map(
                    (req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 bg-muted/40 border border-border/60 rounded-md px-4 py-3 hover:bg-muted/60 transition-all group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                          <span className="text-sm text-foreground font-medium">
                            {req}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all duration-200 p-1 hover:bg-primary/10 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Add key qualifications and must-have skills for this position
          </p>
        </div>

        {/* Skills Required */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-3">
            Skills Required
          </label>
          <div className="relative">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="e.g., JavaScript, Project Management..."
              className="w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
              Enter ↵
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {(form.watch("skills") as string[]).map((benefit, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-foreground border text-muted-foreground rounded-sm text-sm cursor-pointer"
                onClick={() => handleRemoveSkill(index)}
              >
                <span>{benefit}</span>
                <button
                  type="button"
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Deadline */}
      <div className="relative">
        <CustomField
          control={form.control}
          name="applicationDeadline"
          label="Application Deadline"
          type="date"
          placeholder=""
        />
      </div>
    </>
  );
};

export default JobDescription;
