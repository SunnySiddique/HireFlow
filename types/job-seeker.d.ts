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
  id: string;
  auth_id: string;

  full_name: string;
  email: string;

  profile_url: string | null;

  created_at: string | null;
  updated_at: string | null;

  headline: string | null;
  bio: string | null;
  about: string | null;

  desired_role: string | null;

  expected_salary_min: number | null;
  expected_salary_max: number | null;

  preferred_locations: string | null;
  preferred_job_type: string | null;

  portfolio_url: string | null;
  resume_url: string | null;

  experience: Json | null;
  education: Json | null;
  skills: string[] | null;

  profile_path: string | null;
  resume_path: string | null;

  role: string;

  slug: string;
  profile_completion: number;
  open_to_work: boolean | null;
  is_featured: boolean | null;
}

export interface JobSeekerProfileDB {
  full_name: string;
  email: string;

  profile_url: string | null;

  created_at: string | null;
  updated_at: string | null;

  headline: string | null;
  bio: string | null;
  about: string | null;

  desired_role: string | null;

  expected_salary_min: number | null;
  expected_salary_max: number | null;

  open_to_work: boolean;

  preferred_locations: string | null;
  preferred_job_type: string | null;

  portfolio_url: string | null;
  resume_url: string | null;

  experience: Json | null;
  education: Json | null;
  skills: string[] | null;

  profile_path: string | null;
  resume_path: string | null;

  role: string;

  slug: string;
  profile_completion: number;

  is_featured: boolean | null;
}
