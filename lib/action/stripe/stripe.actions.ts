"use server";

import {
  createCheckoutSessionService,
  createPortalSessionService,
} from "@/lib/services/stripe/stripe.service";

export async function createCheckoutSession(
  planName: string,
  userRole: "employer" | "jobseeker",
) {
  return createCheckoutSessionService(planName, userRole);
}

export async function createPortalSession(userRole: "employer" | "job-seeker") {
  return createPortalSessionService(userRole);
}
