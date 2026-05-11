"use client";

import Checkout from "@/components/subscription/Checkout";
import { seekerPlans } from "@/constants/billingData";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { cn } from "@/lib/utils";
import { UserSubscription } from "@/types";
import { Check, Info, Star } from "lucide-react";

const SeekerBilling = () => {
  const { data: subscription } = useGetCurrentUserSubscription();
  return (
    <>
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <main>
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 ">
          <div>
            <h2 className="text-primary font-mono text-sm uppercase tracking-widest mb-4">
              Job Seeker Pricing
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Invest in your <br className="hidden md:block" /> career success.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Choose the plan that fits your goals. Stand out to employers and
              find your dream job with our professional tools.
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {seekerPlans.map((plan) => (
            <div
              key={plan.name}
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
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {plan.description}
                </p>
              </div>
              <Checkout
                key={plan.name}
                cta={plan.cta}
                isPopular={plan.popular}
                planName={plan.name.toLowerCase()}
                userRole="jobseeker"
                subscription={subscription as UserSubscription}
              />

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

        {/* Footer Info */}
        <div className="mt-20 p-8 rounded-2xl bg-muted/50 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-background border border-border">
              <Info className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-bold">Need a custom career solution?</h4>
              <p className="text-sm text-muted-foreground">
                We offer tailored coaching and resume services for
                professionals.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl border border-border bg-background hover:bg-accent transition-colors text-sm font-bold">
            Contact Support Team
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
                a: "We accept all major credit cards, PayPal, and bank transfers.",
              },
              {
                q: "How do application boosts work?",
                a: "Boosted applications appear at the top of the employer's applicant list.",
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
    </>
  );
};
export default SeekerBilling;
