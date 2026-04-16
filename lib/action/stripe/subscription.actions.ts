"use server";

import { increaseJobUsedPostService } from "@/lib/services/stripe/stripe.service";

// employer
export async function increaseJobUsedPost(jobUsed: number) {
  return increaseJobUsedPostService(jobUsed);
}
