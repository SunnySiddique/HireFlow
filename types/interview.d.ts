export interface sendInterviewInviteType {
  id?: string;
  interviewer_id?: string | null;
  seeker_id: string;
  application_id: string;
  interview_type: string;
  scheduled_at: string;

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
// types/interview.ts — add these fields
export interface Interview {
  id: string;
  interviewer_id: string;
  seeker_id: string;
  application_id: string;
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
    profile_url?: string;
  };
}

export type InterviewFilters = {
  search?: string;
  status?: string;
  type?: string;
};
