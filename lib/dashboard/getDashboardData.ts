"use server";

import { getServerUser } from "../action/auth/serverAuth";
import { upcomingInterviewsService } from "../services/interview/interview.service";
import {
  activeJobsService,
  chartApplicantsService,
  recentJobsService,
} from "../services/jobs/employer-job.service";
import {
  seekerRecentJobsService,
  seekerRecommendedJobsService,
} from "../services/jobs/seeker-job.service";
import {
  employerApplicationStatsService,
  seekerApplicationStatsService,
} from "../services/stats/stats.service";
import { getMySubscriptionService } from "../services/stripe/stripe.service";

export async function getEmployerDashboardData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [subscription, jobs, chartData, recentApplicants, stats] =
    await Promise.all([
      getMySubscriptionService(),
      activeJobsService(),
      chartApplicantsService(),
      recentJobsService(),
      employerApplicationStatsService(),
    ]);

  return { subscription, jobs, chartData, recentApplicants, stats };
}

export async function getSeekerDashboardData() {
  const { user } = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const [subscription, interviews, recentJobs, recommendedJobs, stats] =
    await Promise.all([
      getMySubscriptionService(),
      upcomingInterviewsService(true),
      seekerRecentJobsService(),
      seekerRecommendedJobsService(),
      seekerApplicationStatsService(),
    ]);

  return { subscription, interviews, recentJobs, recommendedJobs, stats };
}
