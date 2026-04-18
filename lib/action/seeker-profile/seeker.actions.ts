"use server";

import {
  getSeekerProfilesService,
  saveSeekerProfileService,
  seekerProfileBySlugService,
  seekerProfileService,
} from "@/lib/services/seeker-profile/seeker-profile.service";
import { JobSeekerProfileDB } from "@/types/job-seeker";

export async function saveProfile(profileData: JobSeekerProfileDB) {
  return saveSeekerProfileService(profileData);
}
// seeker profile
export async function seekerProfile() {
  return seekerProfileService();
}

// seeker and featured profiles
export async function seekerProfiles(search?: string) {
  return getSeekerProfilesService(search);
}

export async function seekerProfileBySlug(slug: string) {
  return seekerProfileBySlugService(slug);
}
