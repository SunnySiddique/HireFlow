// Auth
export type TabItem = {
  value: string;
  label: string;
};

// dashboard
export type JobSeekerDashboardStatId =
  | "applications"
  | "saved-jobs"
  | "interviews"
  | "profile-views";

export type EmployerDashboardStatId =
  | "active-jobs"
  | "applicants"
  | "profile-views"
  | "job-views";
