import { NotificationPayload } from "@/types";
import {
  AlertCircle,
  BarChart3,
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  ListChecks,
  RefreshCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

export const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    // Job-related
    case "job_match":
      return <Briefcase className="w-4 h-4 text-blue-500" />;
    case "profile_view":
      return <Eye className="w-4 h-4 text-purple-500" />;
    case "job_view":
      return <BarChart3 className="w-4 h-4 text-green-500" />;
    case "job_post_limit":
      return <ListChecks className="w-4 h-4 text-red-500" />;

    // System
    case "system":
      return <Sparkles className="w-4 h-4 text-amber-500" />;

    // Subscription/payment notifications
    case "new": // new subscription
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "update": // plan updated
      return <RefreshCcw className="w-4 h-4 text-blue-500" />;
    case "renewed": // subscription renewed
      return <CheckCircle className="w-4 h-4 text-indigo-500" />;
    case "cancelling": // scheduled cancellation
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "canceled": // fully canceled
      return <XCircle className="w-4 h-4 text-red-500" />;
    case "payment_failed":
      return <AlertCircle className="w-4 h-4 text-red-600" />;

    // interview notifications
    case "new_interview_invite":
      return <Bell className="w-4 h-4 text-blue-500" />;
    case "interview_accepted":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "interview_declined":
      return <XCircle className="w-4 h-4 text-red-500" />;
    case "interview_reminder":
      return <Clock className="w-4 h-4 text-yellow-500" />;

    default:
      return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

export function getNotificationLink(
  type: string | null,
  referenceId: string | null,
  role: string,
) {
  if (!referenceId) return "";

  switch (type) {
    case "job_match":
      return `/job-seeker/jobs/${referenceId}`;
    case "job_view":
      return `/employer/jobs/${referenceId}`;
    case "profile_view":
      return role === "job-seeker"
        ? `/profile/company/${referenceId}`
        : `/profile/seeker/${referenceId}`;
    case "system":
      return `/job-seeker/${referenceId}`;
    case "subscription":
    case "job_post_limit":
      return `/${role}/billing`;

    // applicant
    case "new_applicant":
      return `/${role}/${referenceId}`;

    // interview notificaitons
    case "new_interview_invite":
    case "interview_accepted":
    case "interview_declined":
    case "interview_reminder":
      return `/${role}/interviews/${referenceId}`;

    default:
      return "";
  }
}

// category
export const categories = [
  {
    key: "all",
    label: "All Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    key: "job_match",
    label: "Job Matches",
    icon: <Briefcase className="w-4 h-4" />,
  },

  {
    key: "profile_view",
    label: "Profile Views",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    key: "job_view",
    label: "Job Views",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    key: "payment",
    label: "Payments & Subscriptions",
    icon: <CreditCard className="w-4 h-4" />,
  },
];

// notification service functions
export const SUBSCRIPTION_TEMPLATES: Record<string, NotificationPayload> = {
  new: {
    type: "new",
    title: "Subscription Activated! 🎉",
    message: "Your {plan} plan is now active. Enjoy your benefits!",
  },
  update: {
    type: "update",
    title: "Plan Updated! 🔄",
    message: "Your plan has been updated to {plan} successfully.",
  },
  renewed: {
    type: "renewed",
    title: "Subscription Renewed! ✅",
    message: "Your {plan} plan has been renewed successfully.",
  },
  cancelling: {
    type: "cancelling",
    title: "Subscription Cancellation Scheduled 🔔",
    message:
      "Your {plan} plan will be cancelled at the end of your billing period.",
  },
  canceled: {
    type: "canceled",
    title: "Subscription Cancelled ❌",
    message:
      "Your {plan} plan has been cancelled. You can resubscribe anytime.",
  },
  payment_failed: {
    type: "payment_failed",
    title: "Payment Failed ⚠️",
    message:
      "Your payment for {plan} plan failed. Please update your card details.",
  },
  trial_end: {
    type: "trial_end",
    title: "Trial Ending Soon ⏳",
    message: "Your trial for {plan} ends on {date}. Don't forget to subscribe!",
  },
  payment_upcoming: {
    type: "payment_upcoming",
    title: "Upcoming Payment 💳",
    message: "Your next payment of ${amount} for {plan} is due on {date}.",
  },
};

export const APPLICANT_TEMPLATES: Record<string, NotificationPayload> = {
  pending: {
    type: "pending",
    title: "Application Received",
    message:
      "Your application has been received and is pending review. We'll get back to you soon.",
  },
  reviewing: {
    type: "reviewing",
    title: "Application Under Review",
    message:
      "Good news! Your application is currently being reviewed by our hiring team.",
  },
  shortlisted: {
    type: "shortlisted",
    title: "You've Been Shortlisted! 🎉",
    message:
      "Congratulations! You have been shortlisted for the position. We will contact you shortly.",
  },
  rejected: {
    type: "rejected",
    title: "Application Update",
    message:
      "Thank you for your interest. After careful consideration, we have decided to move forward with other candidates.",
  },
  accepted: {
    type: "accepted",
    title: "Application Accepted! 🎊",
    message:
      "Congratulations! Your application has been accepted. Please check your email for further instructions.",
  },
};
