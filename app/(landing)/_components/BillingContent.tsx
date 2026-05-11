"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  Info,
  Rocket,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";

import { useState } from "react";

const employerPlans = [
  {
    name: "Basic",
    price: "$0",
    description: "Start your hiring journey with essential tools.",
    icon: Shield,
    features: [
      "3 active job posts",
      "Standard visibility",
      "Basic applicant dashboard",
      "Company profile",
      "7-day listings",
      "Email support",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Standard",
    price: "$79",
    description: "Scale your recruitment with advanced filtering.",
    icon: Zap,
    features: [
      "10 active job posts",
      "Better search visibility",
      "Applicant filtering",
      "Candidate organization tools",
      "30-day listings",
      "Basic analytics",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Pro",
    price: "$249",
    description: "Maximum reach and full access to our talent pool.",
    icon: Rocket,
    features: [
      "Unlimited job posts",
      "Priority placement",
      "Featured job badges",
      "Advanced analytics",
      "Team hiring access",
      "Resume database access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const seekerPlans = [
  {
    name: "Basic",
    price: "$0",
    description: "Essential tools to start your job search.",
    icon: Shield,
    features: [
      "Build your profile",
      "Apply to jobs",
      "Save jobs",
      "Basic alerts",
      "Track applications",
      "Standard visibility",
    ],
    cta: "Join Now",
    popular: false,
  },
  {
    name: "Standard",
    price: "$19",
    description: "Stand out to employers and get hired faster.",
    icon: Zap,
    features: [
      "Priority applications",
      "Advanced alerts",
      "Profile boost",
      "Profile view insights",
      "Skills assessments",
      "Resume tips",
    ],
    cta: "Go Standard",
    popular: true,
  },
  {
    name: "Pro",
    price: "$39",
    description: "The ultimate toolkit for your career growth.",
    icon: Rocket,
    features: [
      "Featured profile",
      "Top search visibility",
      "Unlimited priority applications",
      "AI resume help",
      "Interview prep",
      "Premium support",
    ],
    cta: "Get Pro",
    popular: false,
  },
];

export default function BillingConetnt() {
  const [userType, setUserType] = useState<"employer" | "seeker">("employer");
  const activePlans = userType === "employer" ? employerPlans : seekerPlans;

  return (
    <div className="min-h-screen bg-background">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div>
            <h2 className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
              Pricing Plans
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Invest in your <br className="hidden md:block" />{" "}
              {userType === "employer" ? "hiring" : "career"} success.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Choose the plan that fits your goals. Whether you&apos;re looking
              to hire top talent or find your dream job, we&apos;ve got you
              covered.
            </p>
          </div>

          {/* Tabs & Toggle Container */}
          <div className="flex flex-col items-center gap-8">
            {/* User Type Tabs */}
            <div className="inline-flex p-1 bg-muted rounded-2xl border border-border">
              <button
                onClick={() => setUserType("employer")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                  userType === "employer"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Briefcase className="w-4 h-4" />
                Employer
              </button>
              <button
                onClick={() => setUserType("seeker")}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                  userType === "seeker"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Users className="w-4 h-4" />
                Job Seeker
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="wait">
            <div key={userType} className="contents">
              {activePlans.map((plan, index) => (
                <div
                  key={`${userType}-${plan.name}`}
                  className={cn(
                    "relative flex flex-col p-8 rounded-2xl border transition-all duration-300",
                    plan.popular
                      ? "bg-card border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                      : "bg-card border-border hover:border-primary/30 hover:shadow-lg",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-muted">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tighter">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        / mo
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <button
                    className={cn(
                      "w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 mb-8 flex items-center justify-center gap-2 group",
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                        : "bg-muted text-foreground hover:bg-accent border border-border",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="space-y-4 flex-grow">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      What&apos;s included
                    </p>
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="mt-1 p-0.5 rounded-full bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-tight group-hover/item:text-foreground transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-20 p-8 rounded-2xl bg-muted/50 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-background border border-border">
              <Info className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-bold">Need a custom enterprise solution?</h4>
              <p className="text-sm text-muted-foreground">
                We offer tailored plans for large organizations with specific
                requirements.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl border border-border bg-background hover:bg-accent transition-colors text-sm font-bold">
            Contact Enterprise Team
          </button>
        </div>

        {/* FAQ Preview */}
        <div className="mt-32 text-center">
          <h2 className="text-2xl font-bold mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard.",
              },
              {
                q: "Is there a free trial?",
                a: "Our Basic plan is free forever. For Standard and Premium, we offer a 14-day money-back guarantee.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "How do job posts expire?",
                a: "Job posts expire based on your plan's duration. You can always renew them manually.",
              },
            ].map((faq, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-foreground">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tighter text-xl">JobBoard</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 JobBoard Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
