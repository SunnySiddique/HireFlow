import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { UseFormReturn } from "react-hook-form";

interface WorkLocationProps {
  form: UseFormReturn<JobFormValues>;
}

const WorkLocation = ({ form }: WorkLocationProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-2">Work Location</h2>
      <p className="text-muted-foreground mb-8">
        Where will the employee work?
      </p>

      <div className="space-y-6">
        {/* Location */}
        <CustomField
          control={form.control}
          name="primaryLocation"
          label="Primary Location *"
          type="text"
          placeholder="e.g., San Francisco, CA"
        />

        {/* Remote Option */}
        <CustomField
          control={form.control}
          name="workArrangement"
          label="Work Arrangement *"
          type="select"
          options={[
            { label: "On-site", value: "on_site" },
            { label: "Remote", value: "remote" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Flexible", value: "flexible" },
          ]}
          placeholder="Select work arrangement"
        />
      </div>
    </>
  );
};

export default WorkLocation;
