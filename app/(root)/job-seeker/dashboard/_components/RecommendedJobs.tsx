import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRecommandedJobs } from "@/hooks/useJobs";
import {
  formatDate,
  formatLabel,
  formatSalary,
  getInitials,
} from "@/lib/utils";
import { Bookmark, Building2, Clock, Loader, MapPin, Wifi } from "lucide-react";
import Link from "next/link";
import EmptyState from "./EmptyState";

const RecommendedJobs = () => {
  const { data: recommendedJobs = [], isLoading } = useRecommandedJobs();

  if (isLoading) return <Loader />;

  return (
    <>
      {recommendedJobs.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2 className="text-base lg:text-lg font-bold text-foreground">
              Recommended Jobs {recommendedJobs.length}
            </h2>
            <Link
              href="/job-seeker/jobs"
              className="text-primary hover:underline text-xs lg:text-sm font-medium"
            >
              Browse all →
            </Link>
          </div>
          <div className="space-y-3 lg:space-y-4">
            {recommendedJobs.map((job) => {
              const {
                id,
                job_title,
                location,
                salary_min,
                salary_max,
                currency,
                employment_type,
                created_at,
                skills_required: skills,
              } = job;
              const { company_name, company_logo_url } = job.employer || {};
              return (
                <Card
                  key={id}
                  className="p-3 lg:p-4 bg-background border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
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
                          {/* <div className="flex items-center gap-2 mb-1">
                            {job.featured && (
                              <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] px-1.5 py-0">
                                Featured
                              </Badge>
                            )}
                          </div> */}
                          <h3 className="font-semibold text-foreground text-sm lg:text-base group-hover:text-primary transition-colors">
                            {job_title}
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {company_name}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex-shrink-0"
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          {formatLabel(employment_type as string)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(created_at as string)}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Salary */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className="text-sm font-semibold text-foreground">
                          {formatSalary(
                            salary_min as number,
                            salary_max as number,
                            currency as string,
                          )}
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <EmptyState msg={"Recommended"} />
      )}
    </>
  );
};

export default RecommendedJobs;
