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
  requirements?: any;
  application_deadline?: string;
  status: string;
  skills_required?: string[];
}

export type jobUpdateFormData = Partial<Omit<jobFormData, "employer_id">>;
export type JobFormValues = z.infer<typeof jobFormSchema>;
