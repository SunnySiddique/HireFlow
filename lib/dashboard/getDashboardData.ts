"use server";

import { getServerUser } from "../action/auth/serverAuth";
import {
  getCachedActiveJobs,
  getCachedChartData,
  getCachedEmployerStats,
  getCachedInterviews,
  getCachedRecentApplicants,
  getCachedRecentJobs,
  getCachedRecommendedJobs,
  getCachedSeekerStats,
  getCachedSubscription,
} from "../services/dashboard/cachedServices.service";
import { employerProfileService } from "../services/employer-profile/employer-profile.service";
import { seekerProfileService } from "../services/seeker-profile/seeker-profile.service";
import { getMySubscriptionService } from "../services/stripe/stripe.service";

export async function getEmployerDashboardData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [subscription, jobs, chartData, recentApplicants, stats] =
    await Promise.all([
      getCachedSubscription(user.id),
      getCachedActiveJobs(user.id),
      getCachedChartData(user.id),
      getCachedRecentApplicants(user.id),
      getCachedEmployerStats(user.id),
    ]);

  return { subscription, jobs, chartData, recentApplicants, stats };
}

export async function getSeekerDashboardData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [subscription, interviews, recentJobs, recommendedJobs, stats] =
    await Promise.all([
      getCachedSubscription(user.id),
      getCachedInterviews(user.id),
      getCachedRecentJobs(),
      getCachedRecommendedJobs(user.id),
      getCachedSeekerStats(user.id),
    ]);

  return { subscription, interviews, recentJobs, recommendedJobs, stats };
}

export async function getEmployerSidebarData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [employerProfile, subscription] = await Promise.all([
    employerProfileService(),
    getMySubscriptionService(),
  ]);

  return { employerProfile, subscription };
}

export async function getSeekerSidebarData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [seekerProfile, subscription] = await Promise.all([
    seekerProfileService(),
    getMySubscriptionService(),
  ]);

  return { seekerProfile, subscription };
}
