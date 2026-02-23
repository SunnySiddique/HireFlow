"use server";

import { EmployerType } from "@/types/employer";
import { createClient } from "../supabase/server";

export async function updateEmployerProfile(profileData: EmployerType) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Not authenticated");
    }
    const { error: isEmployerError } = await supabase
      .from("employers")
      .update(profileData)
      .eq("auth_id", user.id);

    if (isEmployerError) {
      throw new Error(isEmployerError.message);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
