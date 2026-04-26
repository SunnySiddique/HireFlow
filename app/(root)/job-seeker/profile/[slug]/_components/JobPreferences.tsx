import CustomField from "@/components/CustomField";
import EmptyState from "@/components/EmptyState";
import { jobType } from "@/constants";
import { JobSeekerProfile, ProfileFormData } from "@/types/job-seeker";
import { Target } from "lucide-react";
import { FormProvider, UseFormReturn } from "react-hook-form";

const JobPreferences = ({
  editMode,
  form,
  profile,
}: {
  editMode: boolean;
  form: UseFormReturn<ProfileFormData>;
  profile: JobSeekerProfile;
}) => {
  if (!profile) return;
  const isEmpty =
    !profile.desired_role &&
    !profile.preferred_job_type &&
    !profile.expected_salary_min &&
    !profile.expected_salary_max &&
    !profile.preferred_locations;
  return (
    <FormProvider {...form}>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Job Preferences
        </h2>

        {/* Show empty state if all fields are empty and not in edit mode */}
        {!editMode && isEmpty ? (
          <EmptyState
            icon={Target}
            msg1="No Job Preferences Set"
            msg2="Click edit to add your job preferences."
          />
        ) : (
          <>
            {/* Desired Role */}
            <div>
              <label className="block text-sm font-bold mb-3">
                Desired Role
              </label>
              {editMode ? (
                <CustomField
                  control={form.control}
                  placeholder="e.g., Senior Product Designer, Design Lead"
                  label="Desired Role"
                  name="desiredRole"
                  isLable={true}
                />
              ) : (
                <p className="text-foreground">
                  {profile.desired_role || (
                    <span className="text-muted-foreground italic">
                      Not set yet
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-bold mb-3">
                Preferred Job Type
              </label>
              {editMode ? (
                <CustomField
                  control={form.control}
                  name="preferred_job_type"
                  label="Job Types"
                  type="checkbox-group"
                  options={jobType.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                  isLable={true}
                />
              ) : (
                <p className="text-foreground">
                  {profile.preferred_job_type || (
                    <span className="text-muted-foreground italic">
                      Not set yet
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-bold mb-3">
                Expected Salary Range
              </label>
              {editMode ? (
                <div className="grid grid-cols-2 gap-3">
                  <CustomField
                    type="number"
                    control={form.control}
                    placeholder="Min"
                    label="Min Range"
                    name="expectedSalaryMin"
                  />
                  <CustomField
                    type="number"
                    control={form.control}
                    placeholder="Max"
                    label="Max Range"
                    name="expectedSalaryMax"
                  />
                </div>
              ) : (
                <p className="text-foreground">
                  {profile.expected_salary_min ||
                  profile.expected_salary_max ? (
                    `$${profile.expected_salary_min || 0} - $${profile.expected_salary_max || 0}`
                  ) : (
                    <span className="text-muted-foreground italic">
                      Not set yet
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Preferred Locations */}
            <div>
              <label className="block text-sm font-bold mb-3">
                Preferred Locations
              </label>
              {editMode ? (
                <CustomField
                  type="textarea"
                  control={form.control}
                  placeholder="e.g., San Francisco, NYC, Remote"
                  label="Preferred Locations"
                  name="preferredLocations"
                  isLable={true}
                />
              ) : (
                <p className="text-foreground">
                  {profile.preferred_locations || (
                    <span className="text-muted-foreground italic">
                      Not set yet
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Open to Work */}
            {editMode && (
              <div className="flex items-center justify-between p-4">
                <CustomField
                  isCheckBox={true}
                  control={form.control}
                  name="openToWork"
                  label="Open to Work"
                  type="checkbox"
                />
              </div>
            )}
          </>
        )}
      </div>
    </FormProvider>
  );
};

export default JobPreferences;
