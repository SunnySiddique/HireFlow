import { featuredJobs } from "@/constants";
import { ArrowRight, DollarSign, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

const FeaturedJobs = () => {
  return (
    <>
      <section
        id="jobs"
        className="bg-muted/50 py-24 sm:py-32 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-5xl sm:text-6xl font-black mb-3 text-foreground">
                Featured Roles
              </h2>
              <p className="text-lg text-muted-foreground font-semibold">
                Trending opportunities from top companies hiring now
              </p>
            </div>
            <Button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground  rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground group-hover:text-secondary transition-colors">
                    {job.company}
                  </p>
                </div>
                <div className="space-y-3 mb-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <DollarSign className="w-4 h-4 text-primary" /> {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="w-4 h-4 text-primary" />{" "}
                    {job.location}
                  </div>
                </div>
                <div className="inline-block px-4 py-2 bg-primary/15 text-primary text-xs font-bold rounded-full mb-4 border border-primary/20">
                  {job.type}
                </div>
                <Link href={"/auth/signin"}>
                  <Button className="w-full py-3 bg-primary text-primary-foreground rounded-lg  shadow-md hover:shadow-lg">
                    Apply Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedJobs;
