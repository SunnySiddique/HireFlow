import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react";

interface JobPreferencesProps {
  profile: any;
}

const JobPreferences = ({ profile }: JobPreferencesProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Job Preferences
      </h2>

      <div className="space-y-4">
        {/* Desired Role */}
        {profile?.desired_role && (
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Desired Role
              </p>
              <p className="text-foreground">{profile.desired_role}</p>
            </div>
          </div>
        )}

        {/* Preferred Locations */}
        {profile?.preferred_locations && (
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Preferred Locations
              </p>
              <p className="text-foreground">{profile.preferred_locations}</p>
            </div>
          </div>
        )}

        {/* Job Type */}
        {profile?.preferred_job_type && (
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Job Type
              </p>
              <p className="text-foreground">{profile.preferred_job_type}</p>
            </div>
          </div>
        )}

        {/* Salary Range */}
        {(profile?.expected_salary_min || profile?.expected_salary_max) && (
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Expected Salary Range
              </p>
              <p className="text-foreground">
                ${profile.expected_salary_min?.toLocaleString()} - $
                {profile.expected_salary_max?.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPreferences;
