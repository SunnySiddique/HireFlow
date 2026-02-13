// export interface Employer {
//   readonly id: string;
//   auth_id: string;
//   company_name: string;
//   website?: string | null;
//   company_logo_url?: string | null;
//   industry?: string | null;
//   company_size?: string | null;
//   work_email: string;
//   description?: string | null;
//   location?: string | null;
//   created_at: string;
//   updated_at: string;
// }

// export interface JobSeeker {
//   readonly id: string;
//   auth_id: string;
//   full_name: string;
//   email: string;
//   profile_photo_url?: string | null;
//   created_at: string;
//   updated_at: string;

//   headline?: string | null;
//   bio?: string | null;
//   skills?: string[] | null;
//   experience?: Record<string, any> | null;
//   education?: Record<string, any> | null;
//   desired_role?: string | null;
//   preferred_job_type?: string | null;
//   expected_salary_range?: string | null;
//   preferred_locations?: string[] | null;
//   open_to_work?: boolean;
//   resume_url?: string | null;
//   portfolio_url?: string | null;
// }

// job_seeker
export interface JobSeekerType {
  fullName: string;
  email: string;
  password: string;
}

// employer
export interface employerType {
  companyName: string;
  workEmail: string;
  password: string;
}
