export const AUTH_TABS = [
  { value: "job_seeker", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];

export const PUBLIC_ROUTES = [
  "/",
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/callback",
  "/auth/auth-code-error",
];

export const AUTH_REDIRECT_ROUTES = ["/", "/auth/signin", "/auth/signup"];

export const RESTRICTED_EMP_ROUTES = [
  "/employer/jobs",
  "/employer/applicants",
  "/employer/jobs/create",
  "/employer/talents",
];

export const RESTRICTED_SEEKER_ROUTES = [
  "/job-seeker/applications",
  "/job-seeker/companies",
  "/job-seeker/saved-jobs",
];

export const BYPASS_ROUTES = [
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/callback",
  "/auth/auth-code-error",
];
