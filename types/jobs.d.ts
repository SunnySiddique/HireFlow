// employer
export interface jobFormData {
  employer_id: string;
  job_slug: string;
  job_title: string;
  job_type: string;
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

// jobSeeker jobs types

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
