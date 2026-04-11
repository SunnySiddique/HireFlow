export type EmployerFormData = z.infer<typeof employerSchema>;

export interface EmployerType {
  company_name: string;
  website?: string;
  company_logo_url?: string | null;
  industry?: string;
  company_size?: string | null;
  description?: string;
  headquarters_location?: string;
  open_positions_count?: number;
  hiring_status: "actively_hiring" | "selective" | "not_hiring";
  core_values?: string[] | null;
  founded_year?: number | null;
  linkedin_url?: string;
  twitter_url?: string;
  operating_locations?: string;
  logo_path?: string;
}

export type Employer = {
  id?: string;
  auth_id?: string;
  company_name: string;
  company_logo_url: string | null;
  company_size: string | null;
  industry: string | null; // was string
  description: string | null; // was string
  website: string | null;
  work_email?: string | null;
  headquarters_location: string | null;
  operating_locations: string | null;
  open_positions_count: number | null;
  hiring_status: string | null;
  core_values: string[] | null;
  founded_year: number | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  slug: string | null;
  logo_path: string | null;
  is_featured: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};
