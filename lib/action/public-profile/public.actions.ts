"use server";

import { companyProfileService } from "@/lib/services/public-profile/public-profile.service";

export async function companyProfile(slug: string) {
  return companyProfileService(slug);
}
