export type EmployerFormData = z.infer<typeof employerSchema>;

type UUID = string;
type ISODateString = string;

export type HiringStatus = "Open" | "Closed" | "Paused";

export interface EmployerType {
  readonly id: UUID;
  auth_id: UUID;

  company_name: string;
  website: string | null;
  company_logo_url: string | null;
  industry: string | null;
  company_size: string | null;

  work_email: string;
  description: string | null;
  location: string | null;

  created_at: ISODateString;
  updated_at: ISODateString;

  role: UserRole;

  open_positions_count: number;
  hiring_status: HiringStatus;

  core_values: string | null;
  headquarters_location: string | null;
  founded_year: number | null;

  linkedin_url: string | null;
  twitter_url: string | null;

  slug: string;
}

export interface EmployerType {
  auth_id: string;

  company_name: string;
  website: string | null;
  company_logo_url: string | null;
  industry: string | null;
  company_size: string | null;

  work_email: string;
  description: string | null;
  location: string | null;

  open_positions_count: number;
  hiring_status: HiringStatus;

  core_values: string | null;
  headquarters_location: string | null;
  founded_year: number | null;

  linkedin_url: string | null;
  twitter_url: string | null;

  slug: string;
}
