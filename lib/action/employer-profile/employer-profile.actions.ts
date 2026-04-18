"use server";

import {
  employerProfileBySlugService,
  employerProfileService,
  employerProfilesService,
  updateEmployerProfileService,
} from "@/lib/services/employer-profile/employer-profile.service";
import { EmployerDB } from "@/types/employer";

// update employer profile
export async function updateEmployerProfile(profileData: EmployerDB) {
  return updateEmployerProfileService(profileData);
}

// queries
export async function employerProfile() {
  return employerProfileService();
}

// employer profile by slug
export async function employerProfileBySlug(slug: string) {
  return employerProfileBySlugService(slug);
}

export async function employerProfiles(search?: string) {
  return employerProfilesService(search);
}
