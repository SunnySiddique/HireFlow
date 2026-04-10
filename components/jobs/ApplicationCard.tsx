import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { appStatusConfig } from "@/constants/jobsData";
import { formatDate, formatSalary, getInitials } from "@/lib/utils";
import {
  CalendarDays,
  ChevronRight,
  ExternalLink,
  FileText,
  MapPin,
  MessageSquare,
} from "lucide-react";

const jobStatusConfig: Record<string, string> = {
  open: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  closed: "bg-muted text-muted-foreground border-border",
};

const ApplicationCard = ({ app }: { app: any }) => {
  const appStatus =
    appStatusConfig[app.application_status] ?? appStatusConfig.pending;

  return (
    <Card className="group p-0 border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
      <div className="p-4 flex flex-col gap-3">
        {/* Row 1: Logo + job status + app status */}
        <div className="flex items-center justify-between">
          <Avatar className="h-11 w-11 flex-shrink-0 rounded-lg border border-border">
            <AvatarImage
              src={app.employer.company_logo_url}
              alt={app.employer.company_name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-lg bg-muted text-foreground text-xs font-bold">
              {getInitials(app.employer.company_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1.5">
            <Badge
              className={`text-[10px] px-1.5 py-0 rounded-sm border capitalize ${jobStatusConfig[app.job_status] ?? jobStatusConfig.closed}`}
            >
              {app.job_status}
            </Badge>
            <Badge
              className={`text-[10px] px-1.5 py-0 rounded-sm border ${appStatus.className}`}
            >
              {appStatus.label}
            </Badge>
          </div>
        </div>

        {/* Row 2: Title + company */}
        <div className="min-w-0">
          <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200 mb-0.5">
            {app.job_title}
          </h4>
          <a
            href={app.employer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            {app.employer.company_name}
            <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-60" />
          </a>
        </div>

        {/* Row 3: Meta */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary/70 flex-shrink-0" />
            {app.location}
          </span>
          {/* <span className="flex items-center gap-1">
            <Wifi className="h-3 w-3 text-primary/70 flex-shrink-0" />
            {app.remote_option.charAt(0).toUpperCase() +
              app.remote_option.slice(1)}
          </span> */}
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-primary/70 flex-shrink-0" />
            Applied {formatDate(app.created_at)}
          </span>
        </div>

        {/* Row 4: Cover letter snippet */}
        {app.cover_letter && (
          <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground bg-muted/50 rounded-lg p-2.5 border border-border">
            <FileText className="h-3 w-3 text-primary/70 flex-shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">{app.cover_letter}</p>
          </div>
        )}

        {app.employer_notes && (
          <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground bg-muted/50 rounded-lg p-2.5 border border-border">
            <MessageSquare className="h-3 w-3 text-primary/70 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-primary font-medium mb-0.5">
                Employer Note
              </p>
              <p className="line-clamp-2 leading-relaxed">
                {app.employer_notes}
              </p>
            </div>
          </div>
        )}

        {/* Row 5: Skills */}
        {app.skills_required && app.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {app.skills_required.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border"
              >
                {skill}
              </span>
            ))}
            {app.skills_required.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border">
                +{app.skills_required.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Row 6: Salary + View */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Salary / yr
            </p>
            <span className="text-sm font-semibold text-foreground">
              {formatSalary(app.salary_min, app.salary_max, app.currency)}
            </span>
          </div>
          <a
            href={`/job-seeker/jobs/${app.job_slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7 px-2.5 rounded-lg flex items-center gap-1 group/btn"
            >
              View Job
              <ChevronRight className="h-3 w-3 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default ApplicationCard;
