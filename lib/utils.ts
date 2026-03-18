import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  // Extract the last part of the URL
  const rawName = url.split("/").pop()?.split("-")[1] || "";
  console.log({ rawName });

  return decodeURIComponent(rawName);
};

export const MAX_PROFILE_SIZE = 1 * 1024 * 1024; // 1MB
export const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB

export const getReadableError = (message: string) => {
  if (message.includes("Body exceeded")) {
    return "File is too large. Please upload a smaller file.";
  }
  return message || "Something went wrong. Please try again.";
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

// fromate date
export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// formatLabel
export const formatLabel = (value: string): string => {
  switch (value) {
    case "full_time":
      return "Full-time";
    case "part_time":
      return "Part-time";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
};

// formate Date
export const formatDeadline = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// time diff
export const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  if (days >= 365) {
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

// past week

export const pastWeek = () => {
  const pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 7);

  return pastWeek.toISOString();
};
