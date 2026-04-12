import { JobSeekerProfile } from "@/types/job-seeker";
import { Briefcase, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function TalentCard({ talent }: { talent: JobSeekerProfile }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80 hover:-translate-y-1">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
            {talent.profile_url ? (
              <Image
                src={talent.profile_url}
                alt={talent.full_name || "Profile Picture"}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                {talent.full_name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="pt-1 overflow-hidden">
            <h3 className="text-base font-semibold text-foreground truncate">
              {talent.full_name || "Unnamed Talent"}
            </h3>
            <p className="text-xs font-medium text-muted-foreground mt-0.5 truncate">
              {talent.headline || "No headline provided"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 min-h-[24px]">
          {talent.skills && talent.skills.length > 0 ? (
            <>
              {talent.skills.slice(0, 3).map((skill: string) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {talent.skills.length > 3 && (
                <span className="inline-flex items-center rounded bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/70">
                  +{talent.skills.length - 3}
                </span>
              )}
            </>
          ) : (
            <span className="text-[10px] italic text-muted-foreground/70">
              No skills listed
            </span>
          )}
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {talent.email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {talent.preferred_locations || "Open to remote"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {talent.desired_role || "Any role"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 px-5 py-3 border-t border-border">
        <a
          href={`/profile/seeker/${talent?.slug}`}
          target="_blank"
          className="w-full text-center text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
