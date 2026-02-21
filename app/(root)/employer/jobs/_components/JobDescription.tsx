import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import {
  Briefcase,
  Calendar,
  Check,
  FileText,
  Shield,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface JobDescriptionProps {
  form: UseFormReturn<JobFormValues>;
}

const JobDescription = ({ form }: JobDescriptionProps) => {
  const [skillInput, setSkillInput] = useState<string>("");
  // Replace the requirements textarea with this
  const [requirementInput, setRequirementInput] = useState("");
  const [responsibilitiesInput, setResponsibilitiesInput] = useState("");

  const handleAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
  ) => {
    const value = (
      field === "requirements"
        ? requirementInput
        : field === "responsibilities"
          ? responsibilitiesInput
          : skillInput
    )
      .trim()
      .replace(/,$/, "");
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (!value) return;
      const current = form.getValues(field) as string[];
      form.setValue(field, [...current, value]);
      setRequirementInput("");
      setResponsibilitiesInput("");
      setSkillInput("");
    }
  };

  const handleRemove = (field: string, index: number) => {
    const current = form.getValues(field) as string[];
    form.setValue(
      field,
      current.filter((_, i) => i !== index),
    );
  };

  return (
    <>
      {/* Enhanced Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Job Description
          </h2>
        </div>
        <p className="text-muted-foreground ml-11 text-sm">
          Provide detailed information about the role
        </p>
      </div>

      <div className="space-y-8">
        {/* Job Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-foreground block">
                Job Description *
              </label>
              <p className="text-xs text-muted-foreground">
                Detailed information about the role
              </p>
            </div>
          </div>
          <CustomField
            control={form.control}
            name="jobDescription"
            label=""
            type="textarea"
            placeholder="Describe the role, responsibilities, and what success looks like..."
            isJob={true}
          />
        </div>

        {/* Requirements and Responsibilties Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requirements Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block">
                  Requirements *
                </label>
                <p className="text-xs text-muted-foreground">
                  Add what candidates need
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Input Area */}
              <div className="relative group">
                <input
                  type="text"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyDown={(e) => handleAdd(e, "requirements")}
                  placeholder="e.g., 5+ years of experience..."
                  className="w-full rounded-lg border border-border/50 bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all group-hover:border-primary/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                  ⏎
                </span>
              </div>

              {/* Requirements Display */}
              {(form.watch("requirements") as string[]).length > 0 && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-2 max-h-64 overflow-y-auto">
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                      {(form.watch("requirements") as string[]).length}
                    </span>
                    Added
                  </p>
                  <div className="space-y-2">
                    {(form.watch("requirements") as string[]).map(
                      (req, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 bg-white dark:bg-white/5 border border-primary/10 rounded-lg px-4 py-3 hover:bg-primary/8 hover:border-primary/30 transition-all group/item"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 font-bold" />
                            <span className="text-sm text-foreground font-medium truncate">
                              {req}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemove("requirements", index)}
                            className="opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200 p-1.5 hover:bg-destructive/10 rounded-md flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
              {(form.watch("requirements") as string[]).length === 0 && (
                <div className="rounded-lg border border-dashed border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No requirements added yet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground block">
                  Responsibilities *
                </label>
                <p className="text-xs text-muted-foreground">
                  What they'll be doing
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Input Area */}
              <div className="relative group">
                <input
                  type="text"
                  value={responsibilitiesInput}
                  onChange={(e) => setResponsibilitiesInput(e.target.value)}
                  onKeyDown={(e) => handleAdd(e, "responsibilities")}
                  placeholder="e.g., Lead development of features..."
                  className="w-full rounded-lg border border-border/50 bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all group-hover:border-secondary/30"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                  ⏎
                </span>
              </div>

              {/* Responsibilities Display */}
              {(form.watch("responsibilities") as string[]).length > 0 && (
                <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4 space-y-2 max-h-64 overflow-y-auto">
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-secondary/30 flex items-center justify-center text-[10px] font-bold text-secondary">
                      {(form.watch("responsibilities") as string[]).length}
                    </span>
                    Added
                  </p>
                  <div className="space-y-2">
                    {(form.watch("responsibilities") as string[]).map(
                      (req, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 bg-white dark:bg-white/5 border border-secondary/10 rounded-lg px-4 py-3 hover:bg-secondary/8 hover:border-secondary/30 transition-all group/item"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Check className="w-4 h-4 text-secondary flex-shrink-0 font-bold" />
                            <span className="text-sm text-foreground font-medium truncate">
                              {req}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemove("responsibilities", index)
                            }
                            className="opacity-0 group-hover/item:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200 p-1.5 hover:bg-destructive/10 rounded-md flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
              {(form.watch("responsibilities") as string[]).length === 0 && (
                <div className="rounded-lg border border-dashed border-secondary/20 bg-secondary/5 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No responsibilities added yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <label className="text-sm font-bold text-foreground block">
                Skills Required
              </label>
              <p className="text-xs text-muted-foreground">
                Technical & soft skills needed
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Input Area */}
            <div className="relative group">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => handleAdd(e, "skills")}
                placeholder="e.g., JavaScript, Project Management..."
                className="w-full rounded-lg border border-border/50 bg-card text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all group-hover:border-primary/30"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                ⏎
              </span>
            </div>

            {/* Skills Display */}
            {(form.watch("skills") as string[]).length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                    {(form.watch("skills") as string[]).length}
                  </span>
                  Skills Added
                </p>
                <div className="flex flex-wrap gap-2">
                  {(form.watch("skills") as string[]).map((skill, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-white/5 border border-primary/20 text-foreground rounded-lg text-sm font-medium group/skill hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <Check className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemove("skills", index)}
                        className="ml-2 text-muted-foreground hover:text-destructive transition-colors p-0.5 hover:bg-destructive/10 rounded"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(form.watch("skills") as string[]).length === 0 && (
              <div className="rounded-lg border border-dashed border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No skills added yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Deadline */}
      <div className="space-y-2 pt-6 border-t border-border">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-secondary" />
          <label className="text-sm font-bold text-foreground">
            Application Deadline
          </label>
        </div>
        <CustomField
          control={form.control}
          name="applicationDeadline"
          label=""
          type="date"
          placeholder=""
        />
      </div>

      {/* Status */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <label className="text-sm font-bold text-foreground">
            Publication Status
          </label>
        </div>
        <CustomField
          control={form.control}
          name="status"
          label=""
          type="select"
          options={[
            { label: "Open", value: "open" },
            { label: "Closed", value: "closed" },
          ]}
          placeholder="Select status"
        />
      </div>
    </>
  );
};

export default JobDescription;
