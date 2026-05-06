import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => {
  return (
    <Card className="p-0 relative w-full rounded-xl border border-border bg-card text-card-foreground overflow-hidden">
      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Avatar (h-10 w-10 rounded-lg) */}
            <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />

            {/* Title + Company */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>

          {/* Save Button (h-7 w-7) */}
          <Skeleton className="h-7 w-7 rounded-md flex-shrink-0" />
        </div>

        {/* Description (line-clamp-2) */}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
        </div>

        {/* Type badges (text-[10px] px-2 py-0.5) */}
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-[18px] w-16 rounded-sm" />
          <Skeleton className="h-[18px] w-20 rounded-sm" />
          <Skeleton className="h-[18px] w-14 rounded-sm" />
        </div>

        {/* Skills (text-[10px] px-1.5 py-0.5) */}
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-[18px] w-12 rounded-sm" />
          <Skeleton className="h-[18px] w-16 rounded-sm" />
          <Skeleton className="h-[18px] w-14 rounded-sm" />
          <Skeleton className="h-[18px] w-10 rounded-sm" />
        </div>

        {/* Salary + CTA */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          {/* Button (h-7 px-3) */}
          <Skeleton className="h-7 w-24 rounded-lg" />
        </div>
      </div>
    </Card>
  );
};

export default JobCardSkeleton;
