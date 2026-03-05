import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Calendar, Clock, Mail, Phone, Video } from "lucide-react";
import Link from "next/link";

const interviews = [
  {
    id: 1,
    company: "TechCorp Inc.",
    logo: "TC",
    logoColor: "from-blue-500 to-blue-700",
    position: "Senior React Developer",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Video Call",
    interviewer: "John Smith",
    interviewerRole: "Tech Lead",
    duration: "45 min",
  },
  {
    id: 2,
    company: "StartupXYZ",
    logo: "SX",
    logoColor: "from-purple-500 to-purple-700",
    position: "Full Stack Engineer",
    date: "Feb 8, 2024",
    time: "2:30 PM",
    type: "Phone Screen",
    interviewer: "Sarah Johnson",
    interviewerRole: "HR Manager",
    duration: "30 min",
  },
  {
    id: 3,
    company: "CloudTech",
    logo: "CT",
    logoColor: "from-cyan-500 to-cyan-700",
    position: "React Native Developer",
    date: "Feb 10, 2024",
    time: "11:00 AM",
    type: "On-site",
    interviewer: "Mike Chen",
    interviewerRole: "Engineering Manager",
    duration: "1 hour",
  },
];

const UpcomingInterviews = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-bold text-foreground">
          Upcoming Interviews
        </h2>
        <Link
          href="/job-seeker/interviews"
          className="text-primary hover:underline text-xs lg:text-sm font-medium"
        >
          View all →
        </Link>
      </div>
      <div className="space-y-3 lg:space-y-4">
        {interviews.map((interview) => (
          <Card
            key={interview.id}
            className="p-3 lg:p-4 bg-background border border-border hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3 lg:gap-4">
              {/* Company Logo */}
              <Avatar
                className={`h-10 lg:h-12 w-10 lg:w-12 bg-gradient-to-br ${interview.logoColor} flex-shrink-0`}
              >
                <AvatarFallback className="text-white font-bold text-sm">
                  {interview.logo}
                </AvatarFallback>
              </Avatar>

              {/* Interview Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm lg:text-base">
                  {interview.position}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <Building2 className="w-3 h-3" />
                  {interview.company}
                </p>

                {/* Interview Details */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    {interview.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    {interview.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-3 h-3 text-primary" />
                    {interview.type}
                  </span>
                </div>

                {/* Interviewer Info */}
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 bg-primary/20">
                      <AvatarFallback className="text-[10px] font-semibold text-primary">
                        {interview.interviewer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {interview.interviewer}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {interview.interviewerRole}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 text-primary hover:bg-primary/10"
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 text-primary hover:bg-primary/10"
                    >
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Reschedule
              </Button>
              <Button
                size="sm"
                className="flex-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Join Interview
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingInterviews;
