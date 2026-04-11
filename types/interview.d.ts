export interface sendInterviewInviteType {
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
  status: string; // keep required, fix at source below
  interview_type: string; // keep required
  scheduled_at: string; // keep required
  duration_minutes: number;
  meeting_link: string | null;
  interviewer_name: string;
  interviewer_title: string | null;
  message: string | null;
  notes: string | null;
  feedback: string | null;
  seeker: InterviewSeeker | null;
  candidate_name?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export type InterviewFilters = {
  search: string;
  status: string;
  type?: string;
  page?: number;
};

export interface notifyInterview {
  id: string;
  application_id: string;
  interviewer_id: string;
  seeker_id: string;
  status: string;
  interview_type: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link: string;
  interviewer_name: string;
  interviewer_title: string;
  message: string;
  notes: string;
  feedback: string;
  employer: {
    company_logo_url: string;
    company_name: string;
  };
  applicant: {
    job: {
      title: string;
      company_name: string;
    };
  };
}
