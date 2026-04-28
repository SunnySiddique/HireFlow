import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatLabel, getInitials } from "@/lib/utils";
import { Job } from "@/types/jobs";
import {
  BarChart2,
  Briefcase,
  CalendarCheck,
  CalendarX,
  Clock,
  ExternalLink,
  MapPin,
  Users,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Sub-components ─────────

function OverviewRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-3 text-sm group">
      <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors duration-200">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="font-medium text-foreground text-sm">{value}</p>
      </div>
    </div>
  );
}

const JobSidebar = ({
  job,
  isSubscribed,
}: {
  job: Job;
  isSubscribed: boolean;
}) => {
  const categoryLabel = formatLabel(job.category as string);
  const employmentLabel = formatLabel(job.employment_type as string);
  const remoteLabel = formatLabel(job.remote_option as string);
  const expLabel = formatLabel(job.experience_level as string);

  return (
    <>
      <div className="lg:col-span-1">
        <div className="space-y-6">
          {/* Job Overview */}
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Job Overview
            </h3>
            <div className="space-y-3">
              <OverviewRow
                icon={Briefcase}
                label="Category"
                value={categoryLabel}
                delay={0}
              />
              <OverviewRow
                icon={Clock}
                label="Employment"
                value={employmentLabel}
                delay={1}
              />
              <OverviewRow
                icon={BarChart2}
                label="Experience"
                value={expLabel}
                delay={2}
              />
              <OverviewRow
                icon={Wifi}
                label="Remote"
                value={remoteLabel}
                delay={3}
              />
              <OverviewRow
                icon={MapPin}
                label="Location"
                value={job.location as string}
                delay={4}
              />
              <OverviewRow
                icon={Users}
                label="Open Positions"
                value={job.open_positions ?? 0}
                delay={5}
              />
              <OverviewRow
                icon={CalendarX}
                label="Deadline"
                value="Apr 22, 1964"
                delay={6}
              />
              <OverviewRow
                icon={CalendarCheck}
                label="Posted"
                value="Feb 22, 2026"
                delay={7}
              />
            </div>
          </Card>

          {/* About Company */}
          {isSubscribed && (
            <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
              <h3 className="text-lg font-bold text-foreground mb-4">
                About the Company
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <Link href={`/profile/company/${job?.employer?.slug}`}>
                  <Avatar className="h-12 w-12 rounded-lg">
                    {job?.employer?.company_logo_url ? (
                      <Image
                        src={job?.employer?.company_logo_url}
                        alt={job?.employer?.company_name}
                        fill
                        sizes="56px"
                        className="object-contain "
                      />
                    ) : (
                      <AvatarFallback className="rounded-lg text-white font-bold">
                        {getInitials(job?.employer?.company_name ?? "")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {job?.employer?.company_name}
                  </h4>
                  <a
                    href={job?.employer?.website ?? ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    Visit website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job?.employer?.description}
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default JobSidebar;
