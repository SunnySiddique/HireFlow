export type EmployerFormData = z.infer<typeof employerSchema>;

type UUID = string;
type ISODateString = string;

export type HiringStatus = "Open" | "Closed" | "Paused";

export interface EmployerType {
  company_name: string;
  website?: string;
  company_logo_url?: string | null;
  industry?: string;
  company_size?: string | null;
  description?: string;
  headquarters_location?: string;
  open_positions_count?: number; // changed from string → number
  hiring_status: "actively hiring" | "selective" | "not hiring"; // match your DB / form
  core_values?: string[] | null;
  founded_year?: number | null; // changed from string → number | null
  linkedin_url?: string;
  twitter_url?: string;
  operating_locations?: string;
  logo_path?: string;
}
