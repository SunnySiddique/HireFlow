import { JobFiltersType } from "@/types/jobs";
import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MAX_PROFILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const MAX_RESUME_SIZE = 2 * 1024 * 1024; // 5MB

// avatar for the proifle
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const getResumeFileName = (url: string) => {
  if (!url) return toast.error("No resume uploaded");
  const rawName = url.split("/").pop()?.split("-")[1] || "";
  return decodeURIComponent(rawName);
};

// slug
export const createSlug = (title: string) => {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  const uniqueSuffix = Math.random().toString(36).slice(2, 7);

  return `${base}-${uniqueSuffix}`;
};

// job salaery formate
export const formatSalary = (min: number, max: number, currency: string) => {
  const format = (num: number) => `$${(num / 1000).toFixed(0)}k`;
  return `${format(min)} - ${format(max)} ${currency.toUpperCase()}`;
};

// formatLabel
export const formatLabel = (value: string): string => {
  switch (value) {
    case "full_time":
      return "Full-time";
    case "part_time":
      return "Part-time";
    case "on_site":
      return "On-Site";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
};

// formate Date
export const formatDeadline = (dateStr: string) => {
  return format(parseISO(dateStr), "MMM d, yyyy");
};

// time diff
// export const timeAgo = (dateStr: string) => {
//   const diff = Date.now() - new Date(dateStr).getTime();
//   const days = Math.floor(diff / 86400000);
//   if (days === 0) return "Today";
//   if (days === 1) return "1 day ago";
//   if (days < 30) return `${days} days ago`;
//   if (days >= 365) {
//     const years = Math.floor(days / 365);
//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   }
// };

export const timeAgo = (dateStr: string) => {
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
};
// past week

// has acess
export const hasAccess = (status: string, plan_expires_at: string) => {
  return Boolean(
    (status === "active" || status === "cancelling") &&
    plan_expires_at &&
    new Date(plan_expires_at) > new Date(),
  );
};

// interview
export const interviewTime = (scheduledAt: string) => {
  const interviewTime = new Date(scheduledAt);
  const joinAvailableAt = new Date(interviewTime.getTime() - 5 * 60 * 1000);

  return new Date() >= joinAvailableAt;
};

// format date
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "MMM d, yyyy");
};

// seeker jobs
export const normalizeFilters = (filters?: JobFiltersType) => ({
  search: filters?.search ?? "",
  location: filters?.location ?? "",
  category: filters?.category ?? "",
  employmentType: filters?.employmentType ?? "",
  experienceLevel: filters?.experienceLevel ?? "",
  salaryMin: filters?.salaryMin ?? null,
  salaryMax: filters?.salaryMax ?? null,
  page: filters?.page ?? 1,
  limit: filters?.limit ?? 10,
  sort: filters?.sort ?? "all",
  featured: filters?.featured ?? false,
});
