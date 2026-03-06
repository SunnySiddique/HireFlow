"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AUTH_TABS } from "@/constants";
import { loginUser } from "@/lib/action/auth.actions";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Github } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

export function LoginForm() {
  const [activeTab, setActiveTab] = useState<"job_seeker" | "employer">(
    "job_seeker",
  );
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const router = useRouter();
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

  const onJobSeekerSubmit = async (data: JobSeekerFormData) => {
    try {
      setIsLoading(true);
      const result = await loginUser(activeTab, data);

      if (result.success) {
        router.push(path);
        jobSeekerForm.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onEmployerSubmit = async (data: EmployerFormData) => {
    try {
      setIsLoading(true);
      const result = await loginUser(activeTab, data);

      if (result.success) {
        router.push(path);
        employerForm.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.log(error.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.origin}/auth/callback?role=${activeTab}&next=${path}`,
      },
    });
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "role_mismatch") {
      // Show toast
      toast.error(
        "This email is registered with a different account type. Please login with the correct tab.",
      );

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
      {activeTab === "job_seeker" && (
        <div className="flex gap-3 mb-8">
          <Button
            variant="outline"
            className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
            disabled={isLoading}
            onClick={() => handleSignup("github")}
          >
            <Github className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 border border-border hover:bg-muted bg-transparent"
            disabled={isLoading}
            onClick={() => handleSignup("google")}
          >
            <Chrome className="w-5 h-5" />
          </Button>
        </div>
      )}
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
              />

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="employer">
          <form
            onSubmit={employerForm.handleSubmit(onEmployerSubmit)}
            className="space-y-5"
          >
            <Field>
              <FieldLabel
                htmlFor="workEmail"
                className="text-foreground font-semibold"
              >
                Work Email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="workEmail"
                  type="email"
                  placeholder="company@example.com"
                  {...employerForm.register("workEmail")}
                  className="h-11 bg-accent border-border text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <FieldError
                  errors={
                    employerForm.formState.errors.workEmail
                      ? [employerForm.formState.errors.workEmail]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="empPassword"
                  className="text-foreground font-semibold"
                >
                  Password
                </FieldLabel>
                <a
                  href="#"
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <FieldContent>
                <Input
                  id="empPassword"
                  type="password"
                  placeholder="••••••••"
                  {...employerForm.register("password")}
                  className="h-11 bg-accent border-border text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <FieldError
                  errors={
                    employerForm.formState.errors.password
                      ? [employerForm.formState.errors.password]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
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
}
