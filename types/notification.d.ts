export type NotificationType =
  | "system"
  | "seeker_profile_views"
  | "employer_profile_views"
  | "job_match"
  | "job_view";

export interface Notification {
  id: string;
  user_id: string;
  title: string | null;
  message: string | null;
  reference_id: string | null;
  type: NotificationType | null;
  is_read: boolean;
  created_at: string;
}
