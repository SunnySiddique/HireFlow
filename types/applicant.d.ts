export interface JobApplication {
  id: string;
  job_id: string;

  application_status: string;
  employer_notes: string | null;

  cover_letter: string;
  applied_at: string; // ISO date string

  job_title: string;
  location: string;

  salary_min: number;
  salary_max: number;

  job_status: string;
  job_slug: string;

  skills_required: string[];

  employment_type: string;

  created_at: string;

  currency: string;

  employer: Employer;
}

export interface RecentApplicant {
  id: string;
  applied_at: string | null;
  seeker: {
    full_name: string;
    profile_url: string | null;
  };
  job: {
    job_title: string;
  };
}
