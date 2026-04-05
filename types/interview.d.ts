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
export interface Interview {
  id: string;
  interviewer_id: string;
  seeker_id: string;
  application_id: string;
  candidate_name: string;
  status: "upcoming" | "pending_confirm" | "completed" | "cancelled";
  interview_type: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link?: string;
  interviewer_name: string;
  interviewer_title?: string;
  message?: string;
  notes?: string;
  feedback?: string;
  created_at: string;
  updated_at: string;
  seeker?: {
    auth_id?: string;
    profile_url?: string;
  };
  employer?: {
    company_name?: string;
    company_logo_url?: string;
  };
}

export type InterviewFilters = {
  search?: string;
  status?: string;
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
