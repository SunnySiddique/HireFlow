import { Card } from "@/components/ui/card";
import { ApplicantType } from "@/types/jobs";

import { CheckCircle, Clock, Users, XCircle } from "lucide-react";

const ApplicantsStatsCards = ({
  applicants,
}: {
  applicants: ApplicantType[];
}) => {
  const stats = [
    {
      label: "Total Applicants",
      value: applicants.length,
      icon: <Users className="w-5 h-5" />,
      color: "text-primary",
    },
    {
      label: "Pending",
      value: applicants.filter((applicant) => applicant.status === "pending")
        .length,
      icon: <Clock className="w-5 h-5" />,
      color: "text-secondary",
    },
    {
      label: "Shortlisted",
      value: applicants.filter(
        (applicant) => applicant.status === "shortlisted",
      ).length,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-primary",
    },
    {
      label: "Rejected",
      value: applicants.filter((applicant) => applicant.status === "rejected")
        .length,
      icon: <XCircle className="w-5 h-5" />,
      color: "text-destructive",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="p-3 sm:p-4 lg:p-6 bg-background border border-border hover:shadow-lg transition"
          >
            <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
              <div
                className={`p-1.5 sm:p-2 lg:p-3 rounded-lg bg-muted ${stat.color}`}
              >
                <span className="w-4 h-4 sm:w-5 sm:h-5 lg:w-auto lg:h-auto inline-block">
                  {stat.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground mb-0.5 sm:mb-1 truncate">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ApplicantsStatsCards;
