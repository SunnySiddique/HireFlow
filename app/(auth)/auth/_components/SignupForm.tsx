"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AUTH_TABS } from "@/constants";
import { useCreateUser } from "@/hooks/auth/useAuth";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form } from "../../../../components/ui/form";
import { default as AuthField } from "./AuthField";
import AuthTabs from "./AuthTabs";

const jobSeekerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const employerSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  workEmail: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type JobSeekerFormData = z.infer<typeof jobSeekerSchema>;
type EmployerFormData = z.infer<typeof employerSchema>;

export function SignupForm() {
  const { mutate: createUser, isPending: isSubmitting } = useCreateUser();

  const [activeTab, setActiveTab] = useState<"job_seeker" | "employer">(
    "job_seeker",
  );

  const jobSeekerForm = useForm<JobSeekerFormData>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const employerForm = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: "",
      workEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const path =
    activeTab === "job_seeker"
      ? "/job-seeker/dashboard"
      : "/employer/dashboard";

  const onJobSeekerSubmit = (data: JobSeekerFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }

    createUser({
      role: "job_seeker",
      data,
    });
  };

  const onEmployerSubmit = (data: EmployerFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }

    createUser({
      role: "employer",
      data,
    });
  };

  const handleSignInWithGoogleAndGithub = async (
    provider: "google" | "github",
  ) => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${path}&role=${activeTab}&type=signup`,
      },
    });
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Create Account
        </h1>
        <p className="text-muted-foreground text-base">
          Join us and start your journey today
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="outline"
          className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
          disabled={isSubmitting}
          onClick={() => handleSignInWithGoogleAndGithub("github")}
        >
          <Github className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
          disabled={isSubmitting}
          onClick={() => handleSignInWithGoogleAndGithub("google")}
        >
          <Chrome className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or sign up with email
          </span>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "job_seeker" | "employer")
        }
        className="w-full"
      >
        <TabsContent value="job_seeker">
          <Form {...jobSeekerForm}>
            <form
              onSubmit={jobSeekerForm.handleSubmit(onJobSeekerSubmit)}
              className="space-y-5"
            >
              {/* FullName */}
              <AuthField
                id="fullName"
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                control={jobSeekerForm.control}
              />

              {/* Email */}
              <AuthField
                id="email"
                type="email"
                label="Email"
                name="email"
                placeholder="john@example.com"
                control={jobSeekerForm.control}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Password */}
                <AuthField
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="••••••••"
                  control={jobSeekerForm.control}
                />

                {/* Confirm Password */}
                <AuthField
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  control={jobSeekerForm.control}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        {/* Employer */}
        <TabsContent value="employer">
          <Form {...employerForm}>
            <form
              onSubmit={employerForm.handleSubmit(onEmployerSubmit)}
              className="space-y-5"
            >
              {/* Compnay Name */}
              <AuthField
                id="companyName"
                label="Company Name"
                name="companyName"
                placeholder="Your Company"
                control={employerForm.control}
              />

              {/* workEmail  */}
              <AuthField
                id="workEmail"
                label="Work Email"
                name="workEmail"
                type="email"
                placeholder="company@example.com"
                control={employerForm.control}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* empPassword  */}
                <AuthField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  control={employerForm.control}
                />

                {/* emp confirm Password  */}
                <AuthField
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  control={employerForm.control}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <AuthTabs tabs={AUTH_TABS} />
      </Tabs>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Already have an account?{" "}
        <a
          href="/auth/signin"
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}
