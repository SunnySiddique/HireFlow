import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoProps {
  form: UseFormReturn<JobFormValues>;
}

const BasicInfo = ({ form }: BasicInfoProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Basic Information
      </h2>
      <p className="text-muted-foreground mb-8">
        Tell us about the position you're hiring for
      </p>

      <div className="space-y-6">
        {/* Job Title */}
        <CustomField
          control={form.control}
          name="jobTitle"
          label="Job Title *"
          type="text"
          placeholder="e.g., Senior Full Stack Developer"
        />

        {/* Two Column Grid for Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Job Type */}
          <CustomField
            control={form.control}
            name="jobType"
            label="Job Type *"
            type="select"
            options={[
              { label: "Software Development", value: "software" },
              { label: "Design", value: "design" },
              { label: "Product Management", value: "product" },
              { label: "Marketing", value: "marketing" },
              { label: "Sales", value: "sales" },
              { label: "Operations", value: "operations" },
              { label: "Human Resources", value: "hr" },
            ]}
            placeholder="Select job type"
          />

          {/* Employment Type */}
          <CustomField
            control={form.control}
            name="employmentType"
            label="Employment Type *"
            type="select"
            options={[
              { label: "Full Time", value: "full_time" },
              { label: "Part Time", value: "part_time" },
              { label: "Contract", value: "contract" },
              { label: "Freelance", value: "freelance" },
              { label: "Internship", value: "internship" },
            ]}
            placeholder="Select employment type"
          />

          {/* Experience Level */}
          <CustomField
            control={form.control}
            name="experienceLevel"
            label="Experience Level *"
            type="select"
            options={[
              { label: "Entry Level (0-2 years)", value: "entry" },
              { label: "Junior (2-4 years)", value: "junior" },
              { label: "Mid Level (4-7 years)", value: "mid" },
              { label: "Senior (7-10 years)", value: "senior" },
              { label: "Lead / Management (10+ years)", value: "lead" },
            ]}
            placeholder="Select experience level"
          />

          {/* Open Positions */}
          <CustomField
            control={form.control}
            name="numberOfPositions"
            label="Number of Positions"
            type="number"
            placeholder="1"
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
