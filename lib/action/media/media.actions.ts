"use server";

import {
  uploadEmployerCompanyLogoService,
  uploadSeekerImageService,
} from "../../services/media/media.service";

export async function uploadJobSeekerImage(
  bucketName: "job_seeker_profile" | "resumes",
  file: File,
  currentFilePath?: string,
) {
  return uploadSeekerImageService(bucketName, file, currentFilePath);
}

export async function uploadEmployerCompanyLogo(file: File, logoPath?: string) {
  return uploadEmployerCompanyLogoService(file, logoPath);
}
