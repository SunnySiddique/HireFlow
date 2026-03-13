import Loader from "@/components/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useRecentApplicants } from "@/hooks/useJobs";
import { getInitials, timeAgo } from "@/lib/utils";
import Image from "next/image";

// const recentApplicants = [
//   {
//     name: "Sarah Johnson",
//     role: "Senior React Developer",
//     time: "2h ago",
//     initials: "SJ",
//     gradient: "from-blue-400 to-blue-600",
//   },
//   {
//     name: "Mike Chen",
//     role: "UX/UI Designer",
//     time: "4h ago",
//     initials: "MC",
//     gradient: "from-purple-400 to-purple-600",
//   },
//   {
//     name: "Emma Davis",
//     role: "Product Manager",
//     time: "6h ago",
//     initials: "ED",
//     gradient: "from-pink-400 to-pink-600",
//   },
//   {
//     name: "Alex Rodriguez",
//     role: "DevOps Engineer",
//     time: "8h ago",
//     initials: "AR",
//     gradient: "from-green-400 to-green-600",
//   },
//   {
//     name: "Lisa Wong",
//     role: "Backend Developer",
//     time: "1d ago",
//     initials: "LW",
//     gradient: "from-orange-400 to-orange-600",
//   },
// ];

const RecentApplicants = () => {
  const { data: recentApplicants, isLoading } = useRecentApplicants();

  if (isLoading) return <Loader />;
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-base lg:text-lg font-bold text-foreground">
            Recent Applicants
          </h2>
          <a
            target="_blank"
            href={"/employer/applicants"}
            className="text-primary hover:underline text-xs lg:text-sm"
          >
            View all →
          </a>
        </div>
        <Card className="bg-background border border-border p-3 lg:p-4 space-y-3 lg:space-y-4 mb-4 lg:mb-6">
          {(recentApplicants ?? []).map((applicant, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 lg:p-3 hover:bg-muted rounded-md cursor-pointer transition"
            >
              <div className="flex items-center gap-2 lg:gap-3 flex-1">
                <Avatar className="h-12 w-12 rounded-lg">
                  {applicant.seeker.profile_url ? (
                    <Image
                      src={applicant.seeker.profile_url}
                      alt={applicant.seeker.full_name}
                      fill
                      sizes="56px"
                      className="object-contain "
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg text-white font-bold">
                      {getInitials(applicant.seeker.full_name || "Jhon")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-foreground">
                    {applicant.seeker.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {applicant.job.job_title}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {timeAgo(applicant.applied_at as string)}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
};

export default RecentApplicants;
