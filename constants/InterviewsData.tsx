import { Badge } from "@/components/ui/badge";
import { MapPin, MonitorSmartphone, Phone, Users, Video } from "lucide-react";
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
