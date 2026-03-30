import { Card, CardContent } from "@/components/ui/card";
import JobSeekerHeader from "./_components/JobSeekerHeader";
import JobSeekerInterviewTable from "./_components/JobSeekerInterviewTable";
import JobSeekerStatsCard from "./_components/JobSeekerStatsCard";

// Static mock data
const mockInterviews = [
  {
    id: "1",
    company: { name: "Acme Corp", logo: "https://i.pravatar.cc/150?u=acme" },
    jobTitle: "Frontend Engineer",
    type: "Technical",
    scheduledAt: "Apr 3, 2026 · 10:00 AM",
    duration: "45 min",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewer: { name: "James Cho", title: "HR" },
    message: "Looking forward to discussing your background in React.",
  },
  {
    id: "2",
    company: { name: "NovaTech", logo: "https://i.pravatar.cc/150?u=nova" },
    jobTitle: "UI Developer",
    type: "Behavioral",
    scheduledAt: "Apr 6, 2026 · TBD",
    duration: "30 min",
    status: "pending_confirm",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: { name: "Priya Singh", title: "Tech Lead" },
    message: "Please let us know your availability.",
  },
  {
    id: "3",
    company: {
      name: "Pixel Studio",
      logo: "https://i.pravatar.cc/150?u=pixel",
    },
    jobTitle: "React Developer",
    type: "System Design",
    scheduledAt: "Mar 28, 2026 · 2:00 PM",
    duration: "60 min",
    status: "completed",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
    interviewer: { name: "Dan Moore", title: "CTO" },
    message: "Great chatting with you.",
  },
  {
    id: "4",
    company: { name: "Loop Systems", logo: "https://i.pravatar.cc/150?u=loop" },
    jobTitle: "Full Stack Dev",
    type: "Initial Screen",
    scheduledAt: "Mar 25, 2026 · 11:00 AM",
    duration: "30 min",
    status: "cancelled",
    meetingLink: "",
    interviewer: { name: "Aisha Wang", title: "HR" },
    message: "We have decided to move forward with other candidates.",
  },
];

const JobSeekerInterviewsPage = () => {
  return (
    <div className="p-8">
      {/* Page Header */}
      <JobSeekerHeader />

      {/* Stats Cards */}
      <JobSeekerStatsCard mockInterviews={mockInterviews} />

      {/* Interviews Table / Cards */}
      <Card className="border-border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <JobSeekerInterviewTable mockInterviews={mockInterviews} />
          {/* Empty State Example (Commented out) */}
          {/* 
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No interviews scheduled yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              When you have upcoming interviews, they will appear here.
            </p>
          </div> 
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSeekerInterviewsPage;
