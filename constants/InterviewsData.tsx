import { Badge } from "@/components/ui/badge";
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
