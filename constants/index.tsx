import {
  Briefcase,
  Building2,
  CheckCircle,
  CreditCard,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  PlusCircle,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

// <--- HOME ---> //

export const featuredJobs = [
  {
    title: "Senior Product Designer",
    company: "MetaLabs",
    salary: "$150K - $200K",
    type: "Remote",
    location: "San Francisco Bay",
  },
  {
    title: "Full Stack Engineer",
    company: "NexGen",
    salary: "$140K - $190K",
    type: "Hybrid",
    location: "New York",
  },
  {
    title: "AI/ML Researcher",
    company: "DeepThink",
    salary: "$180K - $240K",
    type: "Full-time",
    location: "Seattle",
  },
  {
    title: "DevOps Engineer",
    company: "CloudStack",
    salary: "$130K - $170K",
    type: "Remote",
    location: "Anywhere",
  },
  {
    title: "Product Manager",
    company: "InnovateHub",
    salary: "$160K - $210K",
    type: "Full-time",
    location: "Austin",
  },
  {
    title: "Data Scientist",
    company: "AnalyticsPro",
    salary: "$145K - $195K",
    type: "Remote",
    location: "Anywhere",
  },
];

export const JOB_PLATFORM_STATS = [
  { number: "50K+", label: "Active Roles", icon: Briefcase },
  { number: "5K+", label: "Companies", icon: TrendingUp },
  { number: "500K+", label: "Members", icon: Users },
  { number: "96%", label: "Satisfaction", icon: CheckCircle },
];

export const JOB_PLATFORM_FEATURES = [
  {
    title: "AI-Powered Matching",
    desc: "Smart algorithm finds roles perfectly aligned with your profile",
  },
  {
    title: "Direct Access",
    desc: "Connect with hiring managers and recruiters instantly",
  },
  {
    title: "Real-Time Alerts",
    desc: "Never miss opportunities with instant job notifications",
  },
  {
    title: "Career Resources",
    desc: "Free guides, interview prep, and salary insights",
  },
  {
    title: "Privacy Protected",
    desc: "Your data stays confidential and secure always",
  },
  {
    title: "Premium Free",
    desc: "Resume tools, salary calculator, and advanced filters",
  },
];

export const JOB_PLATFORM_TESTIMONIALS = [
  {
    name: "Sarah Anderson",
    role: "Senior PM",
    company: "Google",
    text: "Found my perfect role in 2 weeks. The AI matching is incredibly accurate!",
  },
  {
    name: "Michael Zhang",
    role: "Staff Engineer",
    company: "Meta",
    text: "Direct recruiter access saved me months compared to traditional job hunting.",
  },
  {
    name: "Emma Rodriguez",
    role: "Design Lead",
    company: "Apple",
    text: "Career resources alone are worth more than expensive coaching programs.",
  },
];

// <--- HOME ---> //

// <--- AUTH TABS ---> //
export const AUTH_TABS = [
  { value: "job_seeker", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];
// <--- AUTH TABS ---> //

// <--- JOB SEEKER PROFILE ---> //

export const jobSeekerLinks = [
  {
    label: "Dashboard",
    href: "/job-seeker/dashboard",
    icon: LayoutDashboard,
    section: "main",
  },
  {
    label: "Browse Jobs",
    href: "/job-seeker/jobs",
    icon: Briefcase,
    section: "main",
  },
  {
    label: "My Applications",
    href: "/job-seeker/applications",
    icon: Users,
    section: "main",
  },
  {
    label: "My Interviews",
    href: "/job-seeker/interviews",
    icon: MessageSquare,
    section: "main",
  },
  {
    label: "Find Companies",
    href: "/job-seeker/companies",
    icon: Users,
    section: "main",
    plan: "champion",
  },
  {
    label: "AI Career Hub",
    href: "/job-seeker/ai",
    icon: Sparkles,
    section: "main",
    plan: "champion",
  },
  {
    label: "Saved Jobs",
    href: "/job-seeker/saved-jobs",
    icon: Heart,
    section: "manage",
  },
  {
    label: "Billing",
    href: "/job-seeker/billing",
    icon: CreditCard,
    section: "manage",
  },
  {
    label: "Profile",
    href: (slug: string) => `/job-seeker/profile/${slug}`,
    icon: User,
    section: "manage",
  },
];

export const jobType = ["Full-time", "Contract", "Remote"];

export const jobSeekerSections = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "preferences", label: "Job Preferences", icon: Target },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "billing", label: "Billing", icon: CreditCard },
];

//free links
export const FREE_LINKS = {
  employer: ["Dashboard", "Billing", "Profile"],
  "job-seeker": ["Dashboard", "Billing", "Profile", "Browse Jobs"],
};
// <---  JOB SEEKER PROFILE  ---> //

// <---  EMPLOYER PROFILE  ---> //

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
// <--- EMPLOYER PROFILE ---> //

export const notifications = [
  {
    id: 1,
    type: "message",
    title: "New Message",
    description: "You received a message from TechCorp Inc",
    timestamp: "2 min ago",
    icon: MessageSquare,
    unread: true,
  },
  {
    id: 2,
    type: "job",
    title: "Job Application Update",
    description: "Your application for Senior Dev has been reviewed",
    timestamp: "1 hour ago",
    icon: Briefcase,
    unread: true,
  },
  {
    id: 3,
    type: "system",
    title: "Profile Updated",
    description: "Your profile information was successfully updated",
    timestamp: "3 hours ago",
    icon: CheckCircle,
    unread: false,
  },
  {
    id: 4,
    type: "job",
    title: "New Job Recommendation",
    description: "We found a job that matches your skills",
    timestamp: "1 day ago",
    icon: Briefcase,
    unread: false,
  },
];
