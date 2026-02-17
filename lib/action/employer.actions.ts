"use server";

import { EmployerType } from "@/types/employer";
import { createClient } from "../supabase/server";

export async function updateEmployerProfile(profileData: EmployerType) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("employers")
      .select("id")
      .eq("auth_id", user!.id)
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: "User not found" };
    }

    const { error: isEmployerError } = await supabase
      .from("employers")
      .upsert(profileData);

    if (isEmployerError) {
      return { success: false, error: isEmployerError.message };
    }

    return { success: true, message: "Profile Updated successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
