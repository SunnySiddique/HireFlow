import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getInitials, timeAgo } from "@/lib/utils";
import { RecentApplicant } from "@/types/applicant";
import { Users } from "lucide-react";
import Image from "next/image";

const RecentApplicants = ({
  applicants,
}: {
  applicants: RecentApplicant[];
}) => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-base lg:text-lg font-bold text-foreground">
            Recent Applicants
          </h2>
          {applicants.length > 0 && (
            <a
              target="_blank"
              href={"/employer/applicants"}
              className="text-primary hover:underline text-xs lg:text-sm"
            >
              View all →
            </a>
          )}
        </div>
        {applicants.length > 0 ? (
          <Card className="bg-background border border-border p-3 lg:p-4 mb-4 lg:mb-6">
            {(applicants ?? []).map((applicant, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 lg:p-3 hover:bg-muted rounded-md cursor-pointer transition"
              >
                <div className="flex items-center gap-2 lg:gap-3 flex-1">
                  <Avatar className="h-12 w-12 rounded-lg">
                    {applicant.seeker.profile_url ? (
                      <Image
                        src={applicant.seeker.profile_url}
                        alt={applicant.seeker.full_name}
                        fill
                        sizes="56px"
                        className="object-contain "
                      />
                    ) : (
                      <AvatarFallback className="rounded-lg text-white font-bold">
                        {getInitials(applicant.seeker.full_name || "Jhon")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-foreground">
                      {applicant.seeker.full_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {applicant.job.job_title}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {timeAgo(applicant.applied_at as string)}
                </p>
              </div>
            ))}
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <Users className="h-16 w-16 text-muted-foreground mb-4 hover:text-primary transition-colors cursor-pointer" />
            <p className="text-lg font-medium text-muted-foreground">
              No Recent Applicants
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Applicants will appear here once they apply to your jobs.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentApplicants;
