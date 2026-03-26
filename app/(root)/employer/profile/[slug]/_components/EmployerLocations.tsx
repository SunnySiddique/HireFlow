import CustomField from "@/components/CustomField";
import { EmployerFormData } from "@/types/employer";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface EmployerLocationsProps {
  editMode: boolean;
  form: UseFormReturn<EmployerFormData>;
  employer: any;
}

const EmployerLocations = ({
  editMode,
  form,
  employer,
}: EmployerLocationsProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Operating Locations
        </h2>

        {!editMode && !employer?.operating_locations ? (
          <div className="py-12 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              No operating locations added yet.
            </p>
          </div>
        ) : (
          <>
            {editMode ? (
              <CustomField
                label="Locations"
                control={form.control}
                name="operatingLocations"
                placeholder="e.g., New York, San Francisco, London, Tokyo"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-foreground font-semibold">
                    {employer?.operating_locations || "Not Specefied"}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default EmployerLocations;
