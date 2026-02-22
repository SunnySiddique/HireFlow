"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg text-center">
        {/* Error Code */}
        <div className="mb-8">
          <div className="inline-block">
            <span className="text-9xl font-bold text-primary">404</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/employer/jobs">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-border hover:bg-muted h-11 px-8"
            >
              Browse Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            Looking for something specific?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/employer/jobs"
              className="text-sm text-secondary hover:text-primary transition-colors font-medium"
            >
              Explore Jobs
            </Link>
            <Link
              href="/contact"
              className="text-sm text-secondary hover:text-primary transition-colors font-medium"
            >
              Contact Support
            </Link>
            <Link
              href="/about"
              className="text-sm text-secondary hover:text-primary transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className="text-sm text-secondary hover:text-primary transition-colors font-medium"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
