"use server";

import {
  createCheckoutSessionService,
  createPortalSessionService,
  getMySubscriptionService,
} from "@/lib/services/stripe/stripe.service";

export async function getSubscription() {
  return getMySubscriptionService();
}

export async function createCheckoutSession(
  planName: string,
  userRole: "employer" | "jobseeker",
) {
  return createCheckoutSessionService(planName, userRole);
}

export async function createPortalSession(userRole: "employer" | "job-seeker") {
  return createPortalSessionService(userRole);
}
