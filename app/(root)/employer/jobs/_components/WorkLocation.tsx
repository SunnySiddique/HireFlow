import CustomField from "@/components/CustomField";
import { JobFormValues } from "@/types/jobs";
import { MapPin, Wifi } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface WorkLocationProps {
  form: UseFormReturn<JobFormValues>;
}

const WorkLocation = ({ form }: WorkLocationProps) => {
  return (
    <>
      {/* Enhanced Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-secondary/10 border border-secondary/20">
            <MapPin className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Work Location</h2>
        </div>
        <p className="text-muted-foreground ml-11 text-sm">
          Where will the employee work?
        </p>
      </div>

      <div className="space-y-8">
        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            Primary Location
          </h3>
          <div className="space-y-2">
            <CustomField
              control={form.control}
              name="primaryLocation"
              label=""
              type="text"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
        </div>

        {/* Remote Option */}
        <div>
          <h3 className="text-sm font-semibold text-foreground  flex items-center gap-2">
            <Wifi className="w-4 h-4 text-primary" />
            Work Arrangement
          </h3>
          <div className="space-y-2">
            <CustomField
              control={form.control}
              name="workArrangement"
              label=""
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
        </div>
      </div>
    </>
  );
};

export default WorkLocation;
