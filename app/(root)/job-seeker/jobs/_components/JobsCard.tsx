import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatSalary } from "@/lib/utils";
import { ArrowRight, Bookmark, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  job: any;
}

const JobCard = ({ job }: JobCardProps) => {
  const comProfile = job.employer;

  return (
    <>
      <Card
        className={`group bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/40 overflow-hidden mb-5`}
      >
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Company Logo */}
              <div className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
                {comProfile?.company_logo_url ? (
                  <Image
                    src={comProfile.company_logo_url}
                    alt={comProfile.company_name}
                    fill
                    sizes="56px"
                    className="object-contain "
                  />
                ) : (
                  <span className="text-sm font-semibold text-primary">
                    {comProfile?.company_name?.slice(0, 2)}
                  </span>
                )}
              </div>

              {/* Title + Company */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {job.job_title}
                </h3>

                <p className="text-sm text-muted-foreground truncate">
                  {comProfile?.company_name}
                </p>

                {/* Small Info Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-muted text-foreground"
                  >
                    {job.employment_type.replace("_", " ")}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    {job.remote_option}
                  </Badge>

                  <Badge
                    variant={job.status === "Open" ? "default" : "destructive"}
                  >
                    {job.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Bookmark size={20} strokeWidth={1.5} />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {job.job_description}
          </p>

          {/* Meta Section */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {job.location}
            </div>

            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-primary" />
              <span className="font-medium text-foreground">
                {formatSalary(job.salary_min, job.salary_max, job.currency)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              {new Date(job.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {job.skills_required.slice(0, 3).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-muted text-foreground text-xs"
              >
                {skill}
              </Badge>
            ))}
            {job.skills_required.length > 3 && (
              <Badge
                variant="outline"
                className="text-muted-foreground border-border text-xs"
              >
                +{job.skills_required.length - 3}
              </Badge>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {job.open_positions} position
              {job.open_positions > 1 && "s"} available
            </p>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              View Details
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default JobCard;

{
  /* Pagination */
}
{
  /* <div className="flex items-center justify-center gap-2 mt-8">
  <Button
    variant="outline"
    className="border-border text-foreground"
    disabled
  >
    <ChevronLeft className="w-4 h-4" />
    Previous
  </Button>
  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
    1
  </Button>
  <Button
    variant="outline"
    className="border-border text-foreground hover:bg-muted"
  >
    2
  </Button>
  <Button
    variant="outline"
    className="border-border text-foreground hover:bg-muted"
  >
    3
  </Button>
  <span className="text-muted-foreground">...</span>
  <Button
    variant="outline"
    className="border-border text-foreground hover:bg-muted"
  >
    8
  </Button>
  <Button variant="outline" className="border-border text-foreground">
    Next
    <ChevronRight className="w-4 h-4" />
  </Button>
</div> */
}
