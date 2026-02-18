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
    console.log("payload,", profileData);

    if (authError) return { success: false, message: authError.message };

    if (!user || user.id !== profileData.auth_id) {
      return {
        success: false,
        message: "Unauthorized update profile",
      };
    }

    const { data: updated, error: isEmployerError } = await supabase
      .from("employers")
      .update(profileData)
      .eq("auth_id", user.id)
      .select("*");
    console.log("Updated row:", updated, "Error:", isEmployerError);

    if (isEmployerError) {
      return { success: false, error: isEmployerError.message };
    }

    return { success: true, message: "Profile Updated successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
