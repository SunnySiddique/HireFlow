import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Plus } from "lucide-react";
import Link from "next/link";

const NoJobsFound = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md text-center space-y-8">
          {/* Icon Container */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                <Briefcase className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground">No Jobs Yet</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Start building your team by creating your first job posting. Post
              engaging job listings and attract top talent.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Link href="/employer/jobs/create" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Create Job Posting
              </Button>
            </Link>
            <Link href="/browse-jobs" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted h-11 rounded-md font-semibold flex items-center justify-center gap-2"
              >
                Browse Jobs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Features List */}
          <div className="pt-8 border-t border-border/50 space-y-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Why post a job?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: "✨", text: "Reach qualified candidates" },
                { icon: "🎯", text: "Find the perfect fit for your team" },
                { icon: "⚡", text: "Quick and easy hiring process" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoJobsFound;
