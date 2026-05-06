import { getServerUser } from "@/lib/action/auth/serverAuth";
import { applyPagination } from "@/lib/pagination/pagination";
import { sendApplicantsNotification } from "@/lib/services/notification/notifications.helper";
import { createClient } from "@/lib/supabase/server";
import { InterviewFilters } from "@/types/interview";
import { ApplicantType } from "@/types/jobs";

export async function updateApplicantStatusService(
  applicantId: string,
  status: string,
  employer_notes: string,
) {
  const supabase = await createClient();

  const { data: applicant, error } = await supabase
    .from("applicants")
    .update({ status, employer_notes })
    .eq("id", applicantId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!applicant) throw new Error("Failed to update applicant status");

  await sendApplicantsNotification(
    supabase,
    applicant.user_id,
    status,
    applicantId,
  );

  return applicant;
}

export async function employerApplicantsService(filters?: InterviewFilters) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  let query = supabase
    .from("applicants")
    .select(
      `
            id,
            status,
            applied_at,
            cover_letter,
            employer_notes,
            archived,
            job:job_id(id, job_title),
            seeker:user_id(id, auth_id, full_name, email, profile_url, resume_url, slug)
          `,
      { count: "exact" },
    )
    .eq("employer_id", user.id)
    .order("applied_at", { ascending: false });

  if (filters?.status && filters?.status !== "all") {
    query = query.eq("status", filters?.status);
  }

  if (filters?.archived !== undefined) {
    query = query.eq("archived", filters.archived);
  }

  // pagnination
  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message || "Failed to fetch applicants");

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);
  return {
    data: data as unknown as ApplicantType[],
    totalPages,
    currentPage: page,
    totalCount,
  };
}

export async function archiveApplicantService(
  appId: string,
  isArchived: boolean,
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  const { data, error } = await supabase
    .from("applicants")
    .update({ archived: isArchived })
    .eq("id", appId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to archive applicant");

  return data;
}
