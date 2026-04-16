"use server";

import { uploadSeekerImageService } from "../services/media/media.service";
import { createClient } from "../supabase/server";

export async function uploadJobSeekerImage(
  bucketName: "job_seeker_profile" | "resumes",
  file: File,
  currentFilePath?: string,
) {
  return uploadSeekerImageService(bucketName, file, currentFilePath);
}

export async function uploadEmployerCompanyLogo(file: File, logoPath?: string) {
  const supabase = await createClient();
  const fileNameTimestamp = `${Date.now()}-${file.name}`;

  if (logoPath) {
    const { error: removeError } = await supabase.storage
      .from("employer_logo")
      .remove([logoPath]);

    if (removeError)
      console.warn("Failed to remove previous file:", removeError);
  }

  const { data, error } = await supabase.storage
    .from("employer_logo")
    .upload(fileNameTimestamp, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = await supabase.storage.from("employer_logo").getPublicUrl(data.path);

  return { success: true, url: publicUrl, path: data.path };
}
