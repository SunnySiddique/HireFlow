export type EmployerFormData = z.infer<typeof employerSchema>;

type UUID = string;
type ISODateString = string;

export type HiringStatus = "Open" | "Closed" | "Paused";

export interface EmployerType {
  auth_id: string;
  company_name: string;
  website?: string;
  company_logo_url?: string;
  industry?: string;
  company_size?: string;
  description?: string;
  headquarters_location?: string;
  open_positions_count?: string;
  hiring_status: "Open" | "Selective" | "Closed";
  core_values?: string[];
  founded_year?: string;
  linkedin_url?: string;
  twitter_url?: string;
  operating_locations?: string;
  logo_path?: string;
}
