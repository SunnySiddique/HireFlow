"use client";

import InterviewModal from "@/components/employer/interviews/InterviewModal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { InterviewsTable } from "./_components/InterviewsTable";
import { StatsCards } from "./_components/StatsCard";

interface Interview {
  id: string;
  candidateName: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  meetingLink: string;
  interviewerName: string;
  interviewerTitle: string;
  message: string;
  notes: string;
  feedback: string;
}

const sampleInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "Alice Johnson",
    interviewType: "zoom",
    date: "2024-04-15",
    time: "10:00",
    duration: "1 hour",
    status: "Scheduled",
    meetingLink: "https://zoom.us/j/123456789",
    interviewerName: "John Smith",
    interviewerTitle: "Senior Engineer",
    message: "Looking forward to discussing your experience with React.",
    notes:
      "Strong background in frontend development. Previously worked at TechCorp.",
    feedback: "",
  },
  {
    id: "2",
    candidateName: "Bob Wilson",
    interviewType: "google_meet",
    date: "2024-04-16",
    time: "14:00",
    duration: "30 minutes",
    status: "Completed",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewerName: "Sarah Davis",
    interviewerTitle: "HR Manager",
    message: "Let&apos;s discuss your career goals and expectations.",
    notes: "Candidate very communicative and engaged.",
    feedback:
      "Excellent communication skills, passed all cultural fit assessments. Ready for next round.",
  },
  {
    id: "3",
    candidateName: "Carol Miller",
    interviewType: "ms_teams",
    date: "2024-04-17",
    time: "11:00",
    duration: "1.5 hours",
    status: "Scheduled",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xxx",
    interviewerName: "Mike Johnson",
    interviewerTitle: "Tech Lead",
    message: "We will be discussing your approach to system design problems.",
    notes:
      "8 years of experience in system design. Published 3 technical papers.",
    feedback: "",
  },
  {
    id: "4",
    candidateName: "David Brown",
    interviewType: "phone",
    date: "2024-04-18",
    time: "15:30",
    duration: "1 hour",
    status: "In Progress",
    meetingLink: "+1-555-0123",
    interviewerName: "Emily White",
    interviewerTitle: "Senior Developer",
    message: "Assessment will focus on problem-solving and coding skills.",
    notes: "Currently available to start immediately. Open to remote work.",
    feedback: "",
  },
  {
    id: "5",
    candidateName: "Emma Davis",
    interviewType: "in_person",
    date: "2024-04-19",
    time: "09:00",
    duration: "2 hours",
    status: "Scheduled",
    meetingLink: "Conference Room A",
    interviewerName: "Robert Johnson",
    interviewerTitle: "Hiring Manager",
    message: "Final round interview for Senior Product Manager position.",
    notes: "Top candidate from previous screening rounds.",
    feedback: "",
  },
  {
    id: "6",
    candidateName: "Frank Martinez",
    interviewType: "zoom",
    date: "2024-04-20",
    time: "13:00",
    duration: "1 hour",
    status: "Cancelled",
    meetingLink: "https://zoom.us/j/987654321",
    interviewerName: "Lisa Wong",
    interviewerTitle: "Technical Recruiter",
    message: "Initial screening interview.",
    notes: "Candidate requested reschedule.",
    feedback: "",
  },
];

const EmployerInterviewsPage = () => {
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const stats = {
    total: interviews.length,
    scheduled: interviews.filter((i) => i.status === "Scheduled").length,
    completed: interviews.filter((i) => i.status === "Completed").length,
    inProgress: interviews.filter((i) => i.status === "In Progress").length,
  };

  return (
    <main className="min-h-screen bg-background p-8">
      {/* Stats Cards */}
      <div className="pb-8">
        <StatsCards stats={stats} />
      </div>

      {/* Main Content */}
      <div className="">
        <Card className="border-border shadow-lg">
          <CardContent className="pt-6">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Search
                  </label>
                  <Input
                    placeholder="Search by candidate name or interviewer..."
                    className="h-10"
                  />
                </div>
                {/* <SearchFilter onStatusChange={}  /> */}
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {/* {filteredInterviews.length} */} 20
                  </span>{" "}
                  of {interviews.length} interviews
                </p>
                {/* {(searchQuery ||
                  statusFilter !== "All" ||
                  typeFilter !== "All") && ( */}
                <button
                  // onClick={() => {
                  //   setSearchQuery("");
                  //   setStatusFilter("All");
                  //   setTypeFilter("All");
                  // }}
                  className="text-primary hover:underline font-medium"
                >
                  Clear filters
                </button>
                {/* )} */}
              </div>
            </div>

            {/* Table */}
            {interviews.length > 0 ? (
              <InterviewsTable
                interviews={interviews}
                onView={handleView}
                // onDelete={handleDelete}
              />
            ) : (
              <div className="py-12 text-center">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No interviews found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {selectedInterview && (
        <InterviewModal
          isView={true}
          interview={selectedInterview}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default EmployerInterviewsPage;
