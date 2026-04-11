"use server";

import { EmployerType } from "@/types/employer";
import { serverAuth } from "../auth/serverAuth";
import { createClient } from "../supabase/server";

export async function updateEmployerProfile(profileData: EmployerType) {
  const supabase = await createClient();

  const user = await serverAuth();

  const { data, error } = await supabase
    .from("employers")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("UPDATE_FAILED");
  }

  return data;
}
