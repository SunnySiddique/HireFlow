import { JOB_PLATFORM_FEATURES } from "@/constants";
import { CheckCircle } from "lucide-react";

const TalentHub = () => {
  return (
    <>
      <section
        id="companies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-5xl sm:text-6xl font-black mb-4 text-foreground">
              Why TalentHub?
            </h2>
            <p className="text-lg text-muted-foreground font-semibold mb-12">
              Everything you need to land your next opportunity
            </p>
            <div className="space-y-5">
              {JOB_PLATFORM_FEATURES.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-secondary group-hover:scale-110 transition-all">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-muted rounded-2xl p-12 border border-border hover:border-primary/30 transition-all">
              <div className="space-y-6 animate-pulse">
                <div className="h-12 bg-primary/10 rounded-lg w-3/4"></div>
                <div className="h-8 bg-primary/10 rounded-lg w-1/2"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-primary/10 rounded-lg w-full"></div>
                  <div className="h-4 bg-primary/10 rounded-lg w-5/6"></div>
                  <div className="h-4 bg-primary/10 rounded-lg w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TalentHub;
