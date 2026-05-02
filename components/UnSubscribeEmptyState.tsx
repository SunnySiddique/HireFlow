"use client";

import { Card } from "./ui/card";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BarChart3, Eye, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
const UnSubscribeEmptyState = ({
  role,
}: {
  role: "job-seeker" | "employer";
}) => {
  const router = useRouter();
  return (
    <Card className="border-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Zap className="w-8 h-8" />
            </div>
            <div className="text-left">
              <CardTitle className="text-2xl font-bold">
                Unlock Premium Insights
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Upgrade your plan to access advanced analytics and management
                tools.
              </CardDescription>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Recommended
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              What you’ll get:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Eye className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm">
                  Active Job Listings with real-time analytics
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm">
                  Applicants insights & candidate tracking
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm">
                  Weekly applications chart & trends
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm">
                  Priority support & advanced filters
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center p-6 border border-dashed border-border rounded-2xl bg-background/50">
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-foreground">
                $29
                <span className="text-lg text-muted-foreground">/month</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Billed monthly, cancel anytime
              </p>
            </div>
            <Button
              onClick={() => router.push(`/${role}/billing`)}
              size="lg"
              className="w-full gap-2"
            >
              Subscribe Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Start your 7-day free trial. No credit card required.
            </p>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground border-t pt-4">
          Already subscribed?{" "}
          <a href="#" className="text-primary font-medium hover:underline">
            Refresh page
          </a>{" "}
          to see your dashboard.
        </div>
      </CardContent>
    </Card>
  );
};

export default UnSubscribeEmptyState;
