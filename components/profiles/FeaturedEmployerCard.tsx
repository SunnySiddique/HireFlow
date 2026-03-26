import {
  Briefcase,
  ExternalLink,
  Mail,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

export function FeaturedEmployerCard({ employer }: { employer: any }) {
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
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-primary/20 shadow-sm bg-muted">
            {employer.company_logo_url ? (
              <Image
                src={employer.company_logo_url}
                alt={employer.company_name || "Company Logo"}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xl font-bold text-muted-foreground">
                {employer.company_name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="pt-1 pr-16">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
              {employer.company_name || "Unnamed Company"}
            </h3>
            <p className="text-sm font-medium text-secondary mt-0.5">
              {employer.industry || "Industry not specified"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5 min-h-[24px]">
          {employer.core_values && employer.core_values.length > 0 ? (
            <>
              {employer.core_values.slice(0, 4).map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary"
                >
                  {value}
                </span>
              ))}
              {employer.core_values.length > 4 && (
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  +{employer.core_values.length - 4}
                </span>
              )}
            </>
          ) : (
            <span className="text-xs italic text-muted-foreground/70">
              No core values listed
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-muted-foreground line-clamp-2 flex-1">
          {employer.description || "No description provided for this company."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
            <Mail className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {employer.work_email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {employer.headquarters_location || "Location not specified"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="truncate">
              {employer.company_size || "Unknown size"}
            </span>
          </div>
          {employer.open_positions_count !== null &&
            employer.open_positions_count > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
                <Briefcase className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                <span className="font-medium text-foreground">
                  {employer.open_positions_count} open positions
                </span>
              </div>
            )}
        </div>
      </div>

      <div className="bg-muted/30 px-5 py-3 sm:px-6 border-t border-border flex justify-between items-center">
        <span className="text-xs font-medium text-muted-foreground">
          {employer.hiring_status === "actively hiring" ? (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Actively hiring
            </span>
          ) : (
            <span className="capitalize">
              {employer.hiring_status
                ?.replace(/'/g, "")
                .replace(/::text/g, "") || "Not hiring"}
            </span>
          )}
        </span>

        <a
          href={`/profile/company/${employer?.slug}`}
          target="_blank"
          className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View Company <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
