export const JOB_CATEGORY = [
  { label: "Software Development", value: "software" },
  { label: "Design", value: "design" },
  { label: "Product Management", value: "product" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Operations", value: "operations" },
  { label: "Human Resources", value: "hr" },
];

export const EMPLOYMENT_TYPES = [
  { label: "Full Time", value: "full_time" },
  { label: "Part Time", value: "part_time" },
  { label: "Remote", value: "remote" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Internship", value: "internship" },
];

export const EXPERIENCE_LEVELS = [
  { label: "Entry Level (0-2 years)", value: "entry" },
  { label: "Junior (2-4 years)", value: "junior" },
  { label: "Mid Level (4-7 years)", value: "mid" },
  { label: "Senior (7-10 years)", value: "senior" },
  { label: "Lead / Management (10+ years)", value: "lead" },
];

export const SALARY_RANGES = [
  { label: "$0 - $50k", min: 0, max: 50000 },
  { label: "$50k - $100k", min: 50000, max: 100000 },
  { label: "$100k - $150k", min: 100000, max: 150000 },
  { label: "$150k+", min: 150000, max: undefined },
];

export const appStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800",
  },
  reviewing: {
    label: "reviewing",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  },
  shortlisted: {
    label: "shortlisted",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  },
  accepted: {
    label: "Accepted",
    className:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  },
};
