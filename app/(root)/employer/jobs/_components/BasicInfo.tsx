import CustomField from "@/components/CustomField";
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_CATEGORY,
} from "@/constants/jobsData";
import { JobFormValues } from "@/types/jobs";
import { Briefcase, Layers, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoProps {
  form: UseFormReturn<JobFormValues>;
}

const BasicInfo = ({ form }: BasicInfoProps) => {
  return (
    <>
      {/* Enhanced Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Basic Information
          </h2>
        </div>
        <p className="text-muted-foreground ml-11 text-sm">
          Tell us about the position you're hiring for
        </p>
      </div>

      <div className="space-y-8">
        {/* Job Title */}
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            Job Title
          </h3>
          <div className="space-y-2">
            <CustomField
              control={form.control}
              name="jobTitle"
              label=""
              type="text"
              placeholder="e.g., Senior Full Stack Developer"
            />
          </div>
        </div>

        {/* Job Type & Employment Type */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-secondary" />
            Job Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Job Type */}
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="category"
                label="Category *"
                type="select"
                options={JOB_CATEGORY}
                placeholder="Select job type"
              />
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="employmentType"
                label="Employment Type *"
                type="select"
                options={EMPLOYMENT_TYPES}
                placeholder="Select employment type"
              />
            </div>
          </div>
        </div>

        {/* Experience Level & Open Positions */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Experience & Positions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Experience Level */}
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="experienceLevel"
                label="Experience Level *"
                type="select"
                options={EXPERIENCE_LEVELS}
                placeholder="Select experience level"
              />
            </div>

            {/* Open Positions */}
            <div className="space-y-2">
              <CustomField
                control={form.control}
                name="numberOfPositions"
                label="Number of Positions"
                type="number"
                placeholder="1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
