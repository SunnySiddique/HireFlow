import { JobSeekerProfile } from "@/types/job-seeker";
import {
  Briefcase,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";

export function FeaturedTalentCard({ talent }: { talent: JobSeekerProfile }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-card to-card border border-primary/20 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1">
      <div className="absolute top-0 right-0 p-3">
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary border border-primary/20 uppercase tracking-wider">
          <Star className="h-3 w-3 fill-primary" />
          <span>Featured</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 shadow-sm">
            {talent.profile_url ? (
              <Image
                src={talent.profile_url}
                alt={talent.full_name || "Profile Picture"}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                {talent.full_name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="pt-1 pr-16">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
              {talent.full_name || "Unnamed Talent"}
              {talent.profile_completion > 90 && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}
            </h3>
            <p className="text-sm font-medium text-secondary mt-0.5">
              {talent.headline || "No headline provided"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5 min-h-[24px]">
          {talent.skills && talent.skills.length > 0 ? (
            <>
              {talent.skills.slice(0, 4).map((skill: string) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary"
                >
                  {skill}
                </span>
              ))}
              {talent.skills.length > 4 && (
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  +{talent.skills.length - 4}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs italic text-muted-foreground/70">
              No skills listed
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-muted-foreground line-clamp-2 flex-1">
          {talent.about || talent.bio || "No bio provided."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
            <Mail className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {talent.email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {talent.preferred_locations || "Open to remote"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {talent.preferred_job_type || "Any type"}
            </span>
          </div>
          {talent.expected_salary_min && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
              <DollarSign className="h-3.5 w-3.5 text-primary/70 shrink-0" />
              <span>
                ${(talent.expected_salary_min / 1000).toFixed(0)}k
                {talent.expected_salary_max
                  ? ` - ${(talent.expected_salary_max / 1000).toFixed(0)}k`
                  : "+"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-muted/30 px-5 py-3 sm:px-6 border-t border-border flex justify-between items-center">
        <span className="text-xs font-medium text-muted-foreground">
          {talent.open_to_work ? (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to work
            </span>
          ) : (
            "Currently employed"
          )}
        </span>
        <a
          href={`/profile/seeker/${talent?.slug}`}
          target="_blank"
          className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View Profile <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
