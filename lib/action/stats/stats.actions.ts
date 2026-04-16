"use server";

import {
  employerApplicationStatsService,
  seekerApplicationStatsService,
} from "@/lib/services/stats/stats.service";

export async function seekerApplicationStats() {
  return seekerApplicationStatsService();
}

export async function employerApplicationStats() {
  return employerApplicationStatsService();
}
