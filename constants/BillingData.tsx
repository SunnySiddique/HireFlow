import { Rocket, Shield, Zap } from "lucide-react";
// employer
export const employerPlans = [
  {
    name: "Starter",
    price: "$49",
    description: "Start your hiring journey with essential tools.",
    icon: Shield,
    features: [
      "3 active job posts",
      "Standard visibility",
      "Basic applicant dashboard",
      "Company profile",
      "7-day listings",
      "Email support",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Growth",
    price: "$149",
    description: "Scale your recruitment with advanced filtering.",
    icon: Zap,
    features: [
      "10 active job posts",
      "Better search visibility",
      "Applicant filtering",
      "Candidate organization tools",
      "30-day listings",
      "Basic analytics",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Elite",
    price: "$299",
    description: "Maximum reach and full access to our talent pool.",
    icon: Rocket,
    features: [
      "Unlimited job posts",
      "Priority placement",
      "Featured job badges",
      "Advanced analytics",
      "Team hiring access",
      "Resume database access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const PLAN_LIMITS = {
  starter: 3,
  growth: 10,
  elite: Infinity,
};

// employer

// seeker
export const seekerPlans = [
  {
    name: "Explorer",
    price: "$9",
    description: "Essential tools to start your job search.",
    icon: Shield,
    features: [
      "Build your profile",
      "Apply to jobs",
      "Save jobs",
      "Basic alerts",
      "Track applications",
      "Standard visibility",
    ],
    cta: "Join Now",
    popular: false,
  },
  {
    name: "Accelerator",
    price: "$29",
    description: "Stand out to employers and get hired faster.",
    icon: Zap,
    features: [
      "Priority applications",
      "Advanced alerts",
      "Profile boost",
      "Profile view insights",
      "Skills assessments",
      "Resume tips",
    ],
    cta: "Go Standard",
    popular: true,
  },
  {
    name: "Champion",
    price: "$59",
    description: "The ultimate toolkit for your career growth.",
    icon: Rocket,
    features: [
      "Featured profile",
      "Top search visibility",
      "Unlimited priority applications",
      "AI resume help",
      "Interview prep",
      "Premium support",
    ],
    cta: "Get Pro",
    popular: false,
  },
];

// ----
export const PRICE_IDS = {
  employer: {
    starter: "price_1TDrQZHVtR1pHHiQUOEJE6B4",
    growth: "price_1TDrRNHVtR1pHHiQ3HpT3XsR",
    elite: "price_1TDrRcHVtR1pHHiQDFVQ5E00",
  },
  jobseeker: {
    explorer: "price_1TDrUrHVtR1pHHiQ1kZrl0Z9",
    accelerator: "price_1TDrV5HVtR1pHHiQa9HPo3W9",
    champion: "price_1TDrVJHVtR1pHHiQeMLwFe8J",
  },
};

export const PLAN_NAME_TO_KEY: Record<string, string> = {
  // employer
  Starter: "starter",
  Growth: "growth",
  Elite: "elite",
  // jobseeker
  Explorer: "explorer",
  Accelerator: "accelerator",
  Champion: "champion",
};

export type EmployerPlanKey = keyof typeof PRICE_IDS.employer; // "starter" | "growth" | "elite"
export type JobSeekerPlanKey = keyof typeof PRICE_IDS.jobseeker; // "explorer" | "accelerator" | "champion"
