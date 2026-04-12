import { Employer } from "@/types/employer";
import { Mail, MapPin, Users } from "lucide-react";
import Image from "next/image";

const EmployerCard = ({ employer }: { employer: Employer }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80 hover:-translate-y-1">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
            {employer.company_logo_url ? (
              <Image
                src={employer.company_logo_url}
                alt={employer.company_name || "Company Logo"}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                {employer.company_name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="pt-1 overflow-hidden">
            <h3 className="text-base font-semibold text-foreground truncate">
              {employer.company_name || "Unnamed Company"}
            </h3>
            <p className="text-xs font-medium text-muted-foreground mt-0.5 truncate">
              {employer.industry || "Industry not specified"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 min-h-[24px]">
          {employer.core_values && employer.core_values.length > 0 ? (
            <>
              {employer.core_values.slice(0, 3).map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {value}
                </span>
              ))}
              {employer.core_values.length > 3 && (
                <span className="inline-flex items-center rounded bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/70">
                  +{employer.core_values.length - 3}
                </span>
              )}
            </>
          ) : (
            <span className="text-[10px] italic text-muted-foreground/70">
              No core values listed
            </span>
          )}
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {employer.work_email || "Email not provided"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {employer.headquarters_location || "Location not specified"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {employer.company_size || "Size not specified"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 px-5 py-3 border-t border-border flex justify-between items-center">
        <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
          {employer.open_positions_count || 0} open roles
        </span>
        <a
          href={`/profile/company/${employer?.slug}`}
          target="_blank"
          className="text-xs font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
};
export default EmployerCard;
