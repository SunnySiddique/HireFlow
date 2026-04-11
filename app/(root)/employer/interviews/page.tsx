"use client";

import EmployerInterviewModal from "@/components/employer/interviews/EmployerInterviewModal";
import Pagination from "@/components/pagination/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteInterview, useInterviews } from "@/hooks/useInterview";
import { useInterviewFilters } from "@/hooks/useInterviewFilters";
import { Interview } from "@/types/interview";
import { Calendar } from "lucide-react";
import { useState } from "react";
import InterviewHeader from "../../../../components/interview/InterviewHeader";
import EmployerInterviewsTable from "./_components/EmployerInterviewsTable";
import EmployerStatsCard from "./_components/EmployerStatsCard";

const EmployerInterviewsPage = () => {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, queryFilters, updateFilter, resetFilters } =
    useInterviewFilters();

  // hooks
  const { data, isLoading } = useInterviews(queryFilters, "employer");

  const { mutateAsync: deleteInterview, isPending: isDeleting } =
    useDeleteInterview();

  const interviews = (data?.data ?? []).map((i) => ({
    ...i,
    status: i.status ?? "upcoming",
    interview_type: i.interview_type ?? "",
    scheduled_at: i.scheduled_at ?? "",
  })) as Interview[];

  const totalPages = data?.totalPages ?? 0;

  const handleView = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const handleUpdateFilter = (key: string, value: string) => {
    updateFilter(key as keyof typeof filters, value);
  };

  const handleDelete = async (interview: Interview) => {
    await deleteInterview({
      interviewId: interview.id,
      seekerId: interview.seeker_id ?? "",
    });
  };

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter((i) => i.status === "upcoming").length,
    pending_confirm: interviews.filter((i) => i.status === "pending_confirm")
      .length,
    completed: interviews.filter((i) => i.status === "completed").length,
    cancelled: interviews.filter((i) => i.status === "cancelled").length,
  };
  console.log(interviews);
  return (
    <main>
      <InterviewHeader
        totalInterviews={interviews.length}
        filters={filters}
        updateFilter={handleUpdateFilter}
        resetFilters={resetFilters}
        role="employer"
      />
      {/* Stats Cards */}
      <div className="pb-8">
        <EmployerStatsCard stats={stats} />
      </div>

      {/* Main Content */}
      <div>
        <Card className="border-border shadow-lg">
          <CardContent className="pt-6">
            {/* Table */}
            {isLoading ? (
              <div className="py-12 text-center">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Loading interviews...
                </h3>
              </div>
            ) : interviews.length > 0 ? (
              <EmployerInterviewsTable
                interviews={interviews}
                onView={handleView}
                onDeleteClick={handleDelete}
                isDeleting={isDeleting}
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
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onNext={() => updateFilter("page", (filters?.page ?? 1) + 1)}
            onPrev={() => updateFilter("page", (filters?.page ?? 1) - 1)}
          />
        </Card>
      </div>

      {/* Modal */}
      {selectedInterview && (
        <EmployerInterviewModal
          isView={true}
          interview={selectedInterview}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          seekerId={selectedInterview?.seeker_id ?? ""}
          applicationId={selectedInterview?.application_id ?? ""}
        />
      )}
    </main>
  );
};

export default EmployerInterviewsPage;
