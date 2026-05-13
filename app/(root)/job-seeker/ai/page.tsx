"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import Link from "next/link";

interface AIToolCard {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  icon: React.ReactNode;
  badge?: string;
  accentColor: string;
  buttonColor: string;
}

const AI_TOOL_CARDS: AIToolCard[] = [
  {
    title: "Job Recommendations",
    description:
      "Upload your resume and get AI-matched job suggestions instantly tailored to your unique skills and experience.",
    href: "/job-seeker/ai/resume-matching",
    buttonText: "Upload Resume",
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: "bg-primary/10 text-primary",
    buttonColor: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "Mock Interview",
    description:
      "Practice real interview scenarios with AI-driven mock tests. Get instant feedback on your answers and delivery.",
    href: "/job-seeker/ai/mock-interview",
    buttonText: "Start Test",
    icon: <Bot className="w-6 h-6" />,
    accentColor: "bg-primary/10 text-primary",
    buttonColor: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "AI Job Match",
    description:
      "Find the perfect opportunities. Our AI analyzes your profile to find jobs with the highest success rate.",
    href: "/job-seeker/ai/matched-jobs",
    buttonText: "View Matches",
    icon: <Sparkles className="w-6 h-6" />,
    badge: "Hot",
    accentColor: "bg-primary/10 text-primary",
    buttonColor: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
];

const AICareerHubPage = () => {
  return (
    <>
      {/* Header */}
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
        {AI_TOOL_CARDS.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Link
              href={card.href}
              className="group h-full relative flex flex-col bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-8 flex-1 flex flex-col">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${card.accentColor}`}
                >
                  {card.icon}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  {card.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider">
                      {card.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-auto">
                  <div
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold transition-all ${card.buttonColor}`}
                  >
                    {card.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AICareerHubPage;
