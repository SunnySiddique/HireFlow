"use client";

import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// avatar for the proifle
export const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[1][0]).toUpperCase();
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
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

// job salaery formate
export const formatSalary = (min: number, max: number, currency: string) => {
  const format = (num: number) => `$${(num / 1000).toFixed(0)}k`;
  return `${format(min)} - ${format(max)} ${currency}`;
};

// debounce
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // reset if value changes before delay
  }, [value, delay]);

  return debouncedValue;
}
