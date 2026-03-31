"use client";

import EmployerInterviewModal from "@/components/employer/interviews/EmployerInterviewModal";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDeleteInterview,
  useEmployerInterviews,
} from "@/hooks/useInterview";
import { useInterviewFilters } from "@/hooks/useInterviewFilters";
import { Interview } from "@/types/interview";
import { Calendar } from "lucide-react";
import { useState } from "react";
import EmployerInterviewHeader from "./_components/EmployerInterviewHeader";
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
  const { data: interviews = [], isLoading } =
    useEmployerInterviews(queryFilters);
  const { mutateAsync: deleteInterview, isPending: isDeleting } =
    useDeleteInterview();

  const handleView = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const handleUpdateFilter = (key: string, value: string) => {
    updateFilter(key as keyof typeof filters, value);
  };

  const handleDelete = async (interviewId: string) => {
    await deleteInterview(interviewId);
  };

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter((i) => i.status === "upcoming").length,
    pending_confirm: interviews.filter((i) => i.status === "pending_confirm")
      .length,
    completed: interviews.filter((i) => i.status === "completed").length,
    cancelled: interviews.filter((i) => i.status === "cancelled").length,
  };

  if (isLoading) return <h1 className="text-center ">Loading...</h1>;
  return (
    <main>
      <EmployerInterviewHeader
        totalInterviews={interviews.length}
        filters={filters}
        updateFilter={handleUpdateFilter}
        resetFilters={resetFilters}
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
            {interviews.length > 0 ? (
              <EmployerInterviewsTable
                interviews={interviews}
                onView={handleView}
                onDelete={handleDelete}
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
        </Card>
      </div>

      {/* Modal */}
      {selectedInterview && (
        <EmployerInterviewModal
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
