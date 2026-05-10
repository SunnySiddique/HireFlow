"use server";

import {
  employerApplicationStatsService,
  seekerApplicationStatsService,
} from "@/lib/services/stats/stats.service";
import { getServerUser } from "../auth/serverAuth";

export async function seekerApplicationStats() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");
  return seekerApplicationStatsService(user.id);
}

export async function employerApplicationStats() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");
  return employerApplicationStatsService(user.id);
}
