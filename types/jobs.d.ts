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

type Employer = {
  id: string;
  company_logo_url: string;
  company_name: string;
  website: string;
  description: string;
};

//  jobs types

export type Job = {
  id: string;
  job_title: string;
  job_slug: string;
  employer_id: string;
  employer: Employer;
  job_description: string;
  category: string;
  employment_type: "full_time" | "part_time" | "contract" | "freelance";
  experience_level: "junior" | "mid" | "senior" | "lead";
  salary_min: number;
  salary_max: number;
  currency: string;
  location: string;
  remote_option: "remote" | "on_site" | "hybrid";
  skills_required: string[];
  benefits: string[];
  application_deadline: string;
  open_positions: number;
  status: "open" | "closed" | "draft";
  requirements: string[];
  responsibilities: string[];
  created_at: string;
  updated_at: string;
};

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
  sort?: "recent" | "salary-high" | "salary-low";
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
