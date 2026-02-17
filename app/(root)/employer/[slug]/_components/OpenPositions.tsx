import CustomField from "@/components/CustomField";
import EmptyState from "@/components/EmptyState";
import { EmployerFormData } from "@/types/employer";
import { Briefcase, TrendingUp } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface OpenPositionsProps {
  editMode: boolean;
  form: UseFormReturn<EmployerFormData>;
  employer: any;
}

const OpenPositions = ({ editMode, form, employer }: OpenPositionsProps) => {
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Hiring Information
        </h2>

        {!editMode &&
        employer?.open_positions_count === 0 &&
        employer?.hiring_status ? (
          <EmptyState
            icon={Briefcase}
            msg1="No hiring information added yet."
            msg2="Click edit to add your hiring information."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Open Positions */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Open Positions
                </label>
              </div>
              {editMode ? (
                <CustomField
                  label=""
                  control={form.control}
                  name="openPositionsCount"
                  placeholder="e.g., 15"
                />
              ) : (
                <p className="text-3xl font-black text-primary">
                  {employer?.openPositionsCount || "0"}
                </p>
              )}
            </div>

            {/* Hiring Status */}
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Hiring Status
                </label>
              </div>
              {editMode ? (
                <CustomField
                  label=""
                  control={form.control}
                  name="hiringStatus"
                  type="select"
                />
              ) : (
                // <FormField
                //   control={form.control}
                //   name="hiringStatus"
                //   render={({ field }) => (
                //     <FormItem>
                //       <FormControl>
                //         <select
                //           {...field}
                //           className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:border-secondary focus:outline-none"
                //         >
                //           <option value="actively hiring">
                //             Actively Hiring
                //           </option>
                //           <option value="selective">Selective Hiring</option>
                //           <option value="not hiring">Not Hiring</option>
                //         </select>
                //       </FormControl>
                //       <FormMessage />
                //     </FormItem>
                //   )}
                // />
                <p className="text-foreground font-semibold capitalize">
                  {form.watch("hiringStatus") || "Not specified"}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OpenPositions;
