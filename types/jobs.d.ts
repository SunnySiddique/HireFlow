import { Json } from "@/lib/types/supabase";

// employer
export interface jobFormData {
  employer_id: string;
  job_slug: string;
  job_title: string;
  category: string;
  employment_type: string;
  experience_level: string;
  open_positions: number;
  location: string;
  remote_option: string;
  salary_min: number;
  salary_max: number;
  currency?: string;
  benefits?: string[];
  job_description: string;
  requirements?: string[];
  responsibilities?: string[];
  application_deadline?: string;
  status: string;
  skills_required?: string[];
}

export type jobUpdateFormData = Partial<Omit<jobFormData, "employer_id">>;
export type JobFormValues = z.infer<typeof jobFormSchema>;

export type Employer = {
  id: string;
  slug?: string | null;
  company_logo_url: string | null;
  company_name: string;
  website: string | null;
  description?: string | null;
};

export interface Job {
  id: string;
  job_title: string;
  job_slug: string;
  employer_id: string;
  employer?: Employer | null;
  job_description: string;
  category: string | null;
  employment_type: string | null;
  experience_level: string | null;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  location: string | null;
  remote_option: string | null;
  skills_required: string[] | null;
  benefits: string[] | null;
  application_deadline: string | null;
  open_positions: number | null;
  status: string | null;
  requirements: Json;
  responsibilities: Json | null;
  is_featured?: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// jobs sidebar filters type
export interface JobFiltersType {
  search?: string;
  location?: string;
  category?: string;
  employmentType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
  sort?: "recent" | "salary-high" | "salary-low" | "all";
  featured?: boolean;
}

// save job types
interface SavedJob {
  id: string;
  job_id: string;
  saved_at?: string;
  employer: Employer;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
}

// Add TypeScript schema for jobs with employer subset
export interface JobWithEmployer {
  id: string;
  job_title: string;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  currency?: string | null;
  employment_type?: string | null; // note: fix spelling from 'employement_type'
  job_slug: string;
  created_at?: string | null; // ISO string
  skills_required?: string[] | null;
  status?: string | null;
  employer?: {
    company_name: string;
    company_logo_url?: string | null;
  } | null;
}

// employer applicant type
export type Seeker = {
  id: string;
  slug: string | null;
  email: string;
  auth_id: string;
  full_name: string;
  resume_url: string | null;
  profile_url: string | null;
};

export type Job = {
  id: string;
  job_title: string;
};

export type ApplicantType = {
  id: string;
  status: string;
  applied_at: string | null;
  cover_letter: string | null;
  employer_notes: string | null;
  archived: boolean;
  job: Job;
  seeker: Seeker;
};
