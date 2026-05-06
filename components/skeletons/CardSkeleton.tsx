import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  rows?: number;
  className?: string;
  variant?: "applicant" | "interview";
}

const ApplicantSkeleton = () => (
  <div className="rounded-3xl border border-border bg-card p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded-lg w-1/3" />
        <div className="h-3 bg-muted rounded-lg w-1/2" />
      </div>
      <div className="h-6 w-20 bg-muted rounded-full" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-muted rounded-lg w-2/3" />
      <div className="h-3 bg-muted rounded-lg w-1/2" />
    </div>
  </div>
);

const InterviewSkeleton = () => (
  <div className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-4 md:p-5 animate-pulse flex flex-col gap-4">
    {/* Header: avatar + name + badge */}
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-muted flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-4 bg-muted rounded-lg w-2/5" />
        <div className="h-3 bg-muted rounded-lg w-1/3" />
      </div>
    </div>

    {/* Status badge row */}
    <div className="flex items-center justify-between">
      <div className="h-6 w-24 bg-muted rounded-full" />
      <div className="flex gap-1.5">
        <div className="w-7 h-7 bg-muted rounded-full" />
        <div className="w-7 h-7 bg-muted rounded-full" />
        <div className="w-7 h-7 bg-muted rounded-full" />
      </div>
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3 sm:p-4 rounded-xl border border-border/30">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="w-8 h-8 bg-muted rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-1.5 pt-0.5">
            <div className="h-2.5 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-2.5 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>

    {/* Action buttons */}
    <div className="flex gap-2 pt-3 border-t border-border/30">
      <div className="h-8 sm:h-9 flex-1 bg-muted rounded-lg" />
      <div className="h-8 sm:h-9 flex-1 bg-muted rounded-lg" />
    </div>
  </div>
);

const CardSkeleton = ({
  rows = 1,
  className,
  variant = "applicant",
}: CardSkeletonProps) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className={cn(className)}>
        {variant === "interview" ? (
          <InterviewSkeleton />
        ) : (
          <ApplicantSkeleton />
        )}
      </div>
    ))}
  </>
);

export default CardSkeleton;
