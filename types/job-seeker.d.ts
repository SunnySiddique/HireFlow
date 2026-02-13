// profile
export type ProfileFormData = z.infer<typeof profileSchema>;

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  year: string;
}

export interface JobSeekerProfile {
  auth_id: string;
  full_name: string;
  headline?: string;
  bio?: string;
  about?: string;
  desired_role?: string;

  expected_salary_min?: number | null;
  expected_salary_max?: number | null;

  open_to_work: boolean;

  preferred_locations?: string;
  preferred_job_type?: string;

  portfolio_url?: string;
  resume_url?: string;
  profile_url?: string;

  experience?: Json;
  education?: Json;
  skills?: string[];
  profile_path: string;
  resume_path: string;
}
