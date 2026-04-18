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

// subscription
interface UserSubscription {
  id: string;
  user_id: string;
  role: "jobseeker" | "employer";
  stripe_customer_id: string;
  plan: string;
  subscription_id: string;
  subscription_status: string;
  job_posts_used: number;
  applications_used: number;
  plan_expires_at: string;
  created_at: string;
  updated_at: string;
  cancel_at_period_end: boolean;
}
