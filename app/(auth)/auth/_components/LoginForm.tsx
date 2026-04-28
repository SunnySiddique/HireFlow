"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { AUTH_TABS } from "@/constants/authData";
import { useLoginUser } from "@/hooks/auth/useAuth";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Github, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form } from "../../../../components/ui/form";
import AuthField from "./AuthField";
import AuthTabs from "./AuthTabs";

const jobSeekerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const employerSchema = z.object({
  workEmail: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type JobSeekerFormData = z.infer<typeof jobSeekerSchema>;
type EmployerFormData = z.infer<typeof employerSchema>;

const LoginForm = () => {
  const { mutate: loginUser, isPending: isSubmitting } = useLoginUser();

  const [activeTab, setActiveTab] = useState<"job_seeker" | "employer">(
    "job_seeker",
  );
  const searchParams = useSearchParams();

  const jobSeekerForm = useForm<JobSeekerFormData>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const employerForm = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      workEmail: "",
      password: "",
    },
  });
  const path =
    activeTab === "job_seeker"
      ? "/job-seeker/dashboard"
      : "/employer/dashboard";

  const onJobSeekerSubmit = (data: JobSeekerFormData) => {
    loginUser({
      role: "job_seeker",
      data,
    });
  };

  const onEmployerSubmit = (data: EmployerFormData) => {
    loginUser({
      role: "employer",
      data,
    });
  };

  const handleSignIn = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.origin}/auth/callback?role=${activeTab}&next=${path}&type=signin`,
      },
    });
  };

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "role_mismatch") {
      toast.error("This email is registered with a different account type.");
    }

    if (error === "no_account") {
      toast.error("No account found. Please sign up first.");
    }

    if (error === "profile_creation_failed") {
      toast.error("Failed to create your account. Please try again.");
    }

    if (error) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-base">
          Sign in to your account to continue
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="outline"
          className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
          disabled={isSubmitting}
          onClick={() => handleSignIn("github")}
        >
          <Github className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
          disabled={isSubmitting}
          onClick={() => handleSignIn("google")}
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
            Or sign in with email
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
              {/* Email */}
              <AuthField
                id="email"
                control={jobSeekerForm.control}
                label="Email"
                name="email"
                placeholder="john@example.com"
              />

              {/* password */}
              <AuthField
                id="password"
                control={jobSeekerForm.control}
                label="Password"
                name="password"
                placeholder="••••••••"
                isLogin={true}
                type="password"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="employer">
          <Form {...employerForm}>
            <form
              onSubmit={employerForm.handleSubmit(onEmployerSubmit)}
              className="space-y-5"
            >
              <AuthField
                id="workEmail"
                control={employerForm.control}
                label="Work Email"
                name="workEmail"
                placeholder="john@example.com"
              />

              {/* password */}
              <AuthField
                id="empPassword"
                control={employerForm.control}
                label="Password"
                name="password"
                placeholder="••••••••"
                isLogin={true}
                type="password"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <AuthTabs tabs={AUTH_TABS} />
      </Tabs>

      <p className="text-center text-muted-foreground text-sm mt-8">
        {`Don't`} have an account?{" "}
        <a
          href="/auth/signup"
          className="text-primary font-semibold hover:underline"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
