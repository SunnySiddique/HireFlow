import { createClient } from "@/lib/supabase/server";

// seeker image upload
export async function uploadSeekerImageService(
  bucketName: "job_seeker_profile" | "resumes",
  file: File,
  currentFilePath?: string,
) {
  const supabase = await createClient();

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File too large (max 5MB)");
  }

  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const filePath = `seekers/${fileName}`;

  if (currentFilePath) {
    await supabase.storage.from(bucketName).remove([currentFilePath]);
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return {
    success: true,
    url: urlData.publicUrl,
    path: data.path,
  };
}

// employer image upload
export async function uploadEmployerCompanyLogoService(
  file: File,
  logoPath?: string,
) {
  const supabase = await createClient();

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Logo must be under 2MB");
  }

  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const filePath = `employers/logos/${fileName}`;

  if (logoPath) {
    await supabase.storage.from("employer_logo").remove([logoPath]);
  }

  const { data, error } = await supabase.storage
    .from("employer_logo")
    .upload(filePath, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("employer_logo")
    .getPublicUrl(data.path);

  return {
    success: true,
    url: urlData.publicUrl,
    path: data.path,
  };
}
