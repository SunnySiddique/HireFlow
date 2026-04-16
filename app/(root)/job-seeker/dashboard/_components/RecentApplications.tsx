import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetRecentJobs } from "@/hooks/jobs/useSeekerJob";
import {
  formatDate,
  formatLabel,
  formatSalary,
  getInitials,
} from "@/lib/utils";
import {
  Building2,
  CalendarDays,
  ChevronRight,
  DollarSign,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import EmptyState from "./EmptyState";

const jobStatusConfig: Record<string, string> = {
  open: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  closed: "bg-muted text-muted-foreground border-border",
};

const RecentApplications = () => {
  const { data: jobs = [] } = useGetRecentJobs();

  return (
    <>
      {jobs.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-base lg:text-lg font-bold text-foreground">
              Recent Applications {jobs.length}
            </h2>
            <Link
              href="/job-seeker/jobs"
              className="text-primary hover:underline text-xs lg:text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <Card className="bg-background border border-border divide-y divide-border">
            {jobs.map((job) => {
              const {
                id,
                job_title,
                location,
                salary_min,
                salary_max,
                currency,
                employment_type,
                job_slug,
                created_at,
                status,
              } = job;
              const { company_name, company_logo_url } = job.employer || {};

              return (
                <div
                  key={id}
                  className="p-3 lg:p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3 lg:gap-4">
                    {/* Company Logo */}
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      {company_logo_url ? (
                        <AvatarImage
                          src={company_logo_url || "/placeholder.svg"}
                          alt={company_name || "User Profile"}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getInitials(company_name as string)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground text-sm lg:text-base truncate">
                            {job_title}
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {company_name}
                          </p>
                        </div>
                        <Badge
                          className={`text-xs px-2 py-0.5 rounded-full border ${jobStatusConfig[status as string]} flex-shrink-0`}
                        >
                          {status}
                        </Badge>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                            {formatLabel(employment_type as string)}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {formatSalary(
                            salary_min as number,
                            salary_max as number,
                            currency as string,
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {formatDate(created_at as string)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/job-seeker/jobs/${job_slug}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10 flex-shrink-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Card>
        </>
      ) : (
        <EmptyState msg={"Recent"} />
      )}
    </>
  );
};

export default RecentApplications;
