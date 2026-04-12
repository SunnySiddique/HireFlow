import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Clock,
  MapPin,
  MonitorSmartphone,
  Phone,
  User,
  Users,
  Video,
} from "lucide-react";
// employer
export const DURATION_OPTIONS = ["30", "45", "60", "90"];

// seeker
export const getStatusBadge = (status: string) => {
  switch (status) {
    case "upcoming":
      return <Badge variant="default">Upcoming</Badge>;
    case "pending_confirm":
      return <Badge variant="secondary">Pending Confirm</Badge>;
    case "completed":
      return (
        <Badge className="bg-[#3B6D11] hover:bg-[#3B6D11]/80 text-white border-transparent">
          Completed
        </Badge>
      );
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// employer
export const typeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "zoom":
      return <Video className="h-3.5 w-3.5" />;
    case "google_meet":
      return <MonitorSmartphone className="h-3.5 w-3.5" />;
    case "ms_teams":
      return <Users className="h-3.5 w-3.5" />;
    case "phone":
      return <Phone className="h-3.5 w-3.5" />;
    case "in_person":
      return <MapPin className="h-3.5 w-3.5" />;
    default:
      return <MonitorSmartphone className="h-3.5 w-3.5" />;
  }
};

export const typeLabel: Record<string, string> = {
  zoom: "Zoom",
  google_meet: "Google Meet",
  ms_teams: "MS Teams",
  phone: "Phone",
  in_person: "In Person",
};

// interviews

export const getStatusConfig = (status: string | null) => {
  switch (status) {
    case "upcoming":
      return {
        label: "Upcoming",
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: Clock,
      };
    case "completed":
      return {
        label: "Completed",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: User,
      };
    case "cancelled":
      return {
        label: "Cancelled",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: AlertCircle,
      };
    case "pending_confirm":
      return {
        label: "Pending",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: Clock,
      };
    default:
      return {
        label: status ?? "Unknown",
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
        icon: Clock,
      };
  }
};
