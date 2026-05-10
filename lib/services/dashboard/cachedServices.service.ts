// lib/services/dashboard/cachedServices.service.ts
import { unstable_cache } from "next/cache";
import { upcomingInterviewsService } from "../interview/interview.service";
import {
  activeJobsService,
  chartApplicantsService,
  recentJobsService,
} from "../jobs/employer-job.service";
import {
  seekerRecentJobsService,
  seekerRecommendedJobsService,
} from "../jobs/seeker-job.service";
import {
  employerApplicationStatsService,
  seekerApplicationStatsService,
} from "../stats/stats.service";
import { getUserSubscription } from "../stripe/stripe.service";

export const getCachedSubscription = async (userId: string) =>
  unstable_cache(() => getUserSubscription(userId), ["subscription", userId], {
    revalidate: 60,
    tags: [`subscription-${userId}`],
  })();

// ─── EMPLOYER ───────────────────────────────────────────
export const getCachedActiveJobs = async (userId: string) =>
  unstable_cache(() => activeJobsService(userId), ["active-jobs", userId], {
    revalidate: 30,
    tags: [`jobs-${userId}`],
  })();

export const getCachedChartData = async (userId: string) =>
  unstable_cache(() => chartApplicantsService(userId), ["chart-data", userId], {
    revalidate: 60,
    tags: [`chart-${userId}`],
  })();

export const getCachedRecentApplicants = async (userId: string) =>
  unstable_cache(
    () => recentJobsService(userId),
    ["recent-applicants", userId],
    { revalidate: 30, tags: [`applicants-${userId}`] },
  )();

export const getCachedEmployerStats = async (userId: string) =>
  unstable_cache(
    () => employerApplicationStatsService(userId),
    ["employer-stats", userId],
    { revalidate: 60, tags: [`employer-stats-${userId}`] },
  )();

// ─── JOB SEEKER ─────────────────────────────────────────
export const getCachedInterviews = async (userId: string) =>
  unstable_cache(
    () => upcomingInterviewsService(true, userId),
    ["interviews", userId],
    { revalidate: 30, tags: [`interviews-${userId}`] },
  )();

export const getCachedRecentJobs = async () =>
  unstable_cache(() => seekerRecentJobsService(), ["recent-jobs"], {
    revalidate: 120,
  })();

export const getCachedRecommendedJobs = async (userId: string) =>
  unstable_cache(
    () => seekerRecommendedJobsService(userId),
    ["recommended-jobs", userId],
    { revalidate: 120, tags: [`recommended-${userId}`] },
  )();

export const getCachedSeekerStats = async (userId: string) =>
  unstable_cache(
    () => seekerApplicationStatsService(userId),
    ["seeker-stats", userId],
    { revalidate: 60, tags: [`seeker-stats-${userId}`] },
  )();
