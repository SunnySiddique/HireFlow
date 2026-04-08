import { ArrowRight, Bot, Sparkles } from "lucide-react";
import Link from "next/link";

const AICareerHubPage = () => {
  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>AI Tools</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          AI Career Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Boost your career with AI-powered tools. Optimize your resume, find
          the perfect job match, and practice for your next big interview.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Job Recommendations */}
        <Link
          href="/job-seeker/ai/resume-matching"
          className="group relative flex flex-col bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-8 flex-1 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              Job Recommendations
            </h3>
            <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">
              Upload your resume and get AI-matched job suggestions instantly
              tailored to your unique skills and experience.
            </p>

            <div className="mt-auto">
              <div className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold group-hover:bg-primary/90 transition-all">
                Upload Resume
                <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </Link>

        {/* Card 3: Mock Interview */}
        <Link
          href="/job-seeker/ai/mock-interview"
          className="group relative flex flex-col bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="p-8 flex-1 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
              <Bot className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              Mock Interview
            </h3>
            <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">
              Practice real interview scenarios with AI-driven mock tests. Get
              instant feedback on your answers and delivery.
            </p>

            <div className="mt-auto">
              <div className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold group-hover:bg-primary/90 transition-all">
                Start Test
                <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default AICareerHubPage;
