export interface InterviewInvite {
  id?: string;
  interviewer_id?: string | null;
  seeker_id: string;
  application_id: string;
  interview_type: string;
  scheduled_at: string;
  candidate_name: string;

  duration_minutes: number;

  status: "upcoming" | "pending_confirm" | "completed" | "cancelled";
  meeting_link: string;
  interviewer_name: string;
  interviewer_title: string;
  message: string;
  notes?: string;
  feedback?: string;
}

// interview type for interview table
// @/types/interview.ts

export interface InterviewSeeker {
  auth_id: string;
  profile_url: string | null;
}

export interface Interview {
  id: string;

  seeker_id: string | null;
  application_id: string | null;
  interviewer_id: string | null;

  status: string | null;
  interview_type: string | null;

  scheduled_at: string | null;
  duration_minutes: number | null;

  meeting_link: string | null;

  interviewer_name: string | null;
  interviewer_title: string | null;
  candidate_name?: string | null;

  message: string | null;
  notes: string | null;
  feedback: string | null;

  employer: {
    company_name: string;
    company_logo_url: string | null;
  } | null;

  seeker?: {
    auth_id: string;
    profile_url: string;
    full_name: string;
  };

  applicant?: {
    job: {
      job_title: string;
    };
  } | null;
}

export type InterviewFilters = {
  status?: string;
  page?: number;
  limit?: number;
  archived?: boolean;
  search?: string;
};

export type filtersType = "all" | "upcoming" | "completed" | "canceled";
export type applicantFiltersType =
  | "all"
  | "pending"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "accepted";
