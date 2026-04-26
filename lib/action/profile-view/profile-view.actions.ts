"use server";

import {
  trackEmployerProfileViewService,
  trackJobViewService,
  trackSeekerProfileViewService,
} from "@/lib/services/profile-view/profile-view.service";

// job-seeker view
export async function trackSeekerProfileView(seekerId: string) {
  return trackSeekerProfileViewService(seekerId);
}
// employer profile veiw
export async function trackEmployerProfileView(employerId: string) {
  return trackEmployerProfileViewService(employerId);
}

// job view
export async function trackJobView(jobId: string) {
  return trackJobViewService(jobId);
}
