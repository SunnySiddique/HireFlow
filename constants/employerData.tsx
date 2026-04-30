import {
  Bell,
  Briefcase,
  Building2,
  CreditCard,
  Globe,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  PlusCircle,
  Users,
} from "lucide-react";

export const buttonText = [
  {
    stepNum: 1,
    btnTxt: "Work Location",
  },

  {
    stepNum: 2,
    btnTxt: "Salary & Benefits",
  },
  {
    stepNum: 3,
    btnTxt: "Job Description",
  },
];

export const statusLabel: Record<string, string> = {
  actively_hiring: "Actively Hiring",
  selective: "Selective",
  not_hiring: "Not Hiring",
};

export const employerLinks = [
  {
    label: "Dashboard",
    href: "/employer/dashboard",
    icon: LayoutDashboard,
    section: "main",
  },
  {
    label: "Manage Jobs",
    href: "/employer/jobs",
    icon: Briefcase,
    section: "main",
  },
  {
    label: "Applicants",
    href: "/employer/applicants",
    icon: Users,
    section: "main",
  },
  {
    label: "Interviews",
    href: "/employer/interviews",
    icon: MessageSquare,
    section: "main",
  },

  {
    label: "Find Talents",
    href: "/employer/talents",
    icon: Building2,
    section: "main",
    plan: "elite",
  },
  {
    label: "Notifications",
    href: "/employer/notifications",
    icon: Bell,
    section: "main",
    plan: "starter",
  },
  {
    label: "Post a Job",
    href: "/employer/jobs/create",
    icon: PlusCircle,
    section: "manage",
  },
  {
    label: "Billing",
    href: "/employer/billing",
    icon: CreditCard,
    section: "manage",
  },
  {
    label: "Profile",
    href: (slug: string) => `/employer/profile/${slug}`,
    icon: Building2,
    section: "manage",
  },
];

export const employerSections = [
  { id: "about", label: "About", icon: Building2 },
  { id: "positions", label: "Open Positions", icon: Briefcase },
  { id: "culture", label: "Culture", icon: Heart },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "social", label: "Social Links", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export const employerHiringStatus = [
  "actively_hiring",
  "selective",
  "not_hiring",
];
