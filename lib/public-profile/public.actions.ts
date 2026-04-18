import { companyProfileService } from "../services/public-profile/public-profile.service";

export async function companyProfile(slug: string) {
  return companyProfileService(slug);
}
