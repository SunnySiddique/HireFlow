"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buttonText } from "@/constants/employerData";
import { JobFormValues } from "@/types/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import BasicInfo from "./BasicInfo";
import JobDescription from "./JobDescription";
import SalaryAndBenefits from "./SalaryAndBenefits";
import WorkLocation from "./WorkLocation";

// Zod Validation Schema
const jobFormSchema = z.object({
  jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
  jobType: z.string().min(1, "Job type is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  numberOfPositions: z.coerce.number().min(1, "At least 1 position required"),
  primaryLocation: z.string().min(2, "Location is required"),
  workArrangement: z.string().min(1, "Work arrangement is required"),
  minimumSalary: z.coerce.number().min(0, "Minimum salary required"),
  maximumSalary: z.coerce.number().min(0, "Maximum salary required"),
  currency: z.string().min(1, "Currency is required"),
  benefits: z.string().optional(),
  jobDescription: z
    .string()
    .min(10, "Job description must be at least 10 characters"),
  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters"),
  applicationDeadline: z.string().optional(),
  publishStatus: z.string().default("draft"),
});

//TODO create edit job post server action to edit the  job posts
const CreateJobForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [skills, setSkills] = useState<string[]>([]);

  const form = useForm<JobFormValues, any, JobFormValues>({
    resolver: zodResolver(jobFormSchema) as Resolver<JobFormValues>,
    defaultValues: {
      jobTitle: "",
      jobType: "",
      employmentType: "",
      experienceLevel: "",
      numberOfPositions: 1,
      primaryLocation: "",
      workArrangement: "",
      minimumSalary: 0,
      maximumSalary: 0,
      currency: "usd",
      benefits: "",
      jobDescription: "",
      requirements: "",
      skills: [],
      applicationDeadline: "",
      publishStatus: "draft",
    },
  });

  const handleIncreaseCurrentStep = () => {
    if (currentStep === 4) {
      return onSubmit;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleDecreaseCurrentStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (values: JobFormValues) => {
    console.log("Form submitted with values:", { ...values, skills });
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-8">
          <Link href="/dashboard/employer">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Create New Job Posting
            </h1>
            <p className="text-muted-foreground text-base">
              Complete all steps to publish your job opening
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className="text-sm font-medium text-foreground">
                Basic Info
              </span>
            </div>

            {/* Connector Line 1 */}
            <div
              className={`flex-1 h-1 mx-2 rounded mb-8 ${currentStep > 1 ? "bg-primary" : "bg-border"}`}
            />

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  currentStep >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {currentStep > 2 ? <Check className="w-5 h-5" /> : "2"}
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Location
              </span>
            </div>

            {/* Connector Line 2 */}
            <div
              className={`flex-1 h-1 mx-2 rounded mb-8 ${currentStep > 2 ? "bg-primary" : "bg-border"}`}
            />

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  currentStep >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {currentStep > 3 ? <Check className="w-5 h-5" /> : "3"}
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Salary & Benefits
              </span>
            </div>

            {/* Connector Line 3 */}
            <div
              className={`flex-1 h-1 mx-2 rounded mb-8 ${currentStep > 3 ? "bg-primary" : "bg-border"}`}
            />

            {/* Step 4 */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  currentStep >= 4
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {currentStep > 4 ? <Check className="w-5 h-5" /> : "4"}
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 4 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Description
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Basic Information */}
              <Card className="p-8 border-border">
                {currentStep === 1 && <BasicInfo form={form} />}

                {/* Step 2: Work Location */}
                {currentStep === 2 && <WorkLocation form={form} />}

                {/* Step 3: Salary & Benefits */}
                {currentStep === 3 && <SalaryAndBenefits form={form} />}

                {/* Step 4: Job Description */}
                {currentStep === 4 && (
                  <JobDescription
                    form={form}
                    skills={skills}
                    setSkills={setSkills}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-3 pt-6 border-t border-border mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-border hover:bg-muted"
                      onClick={handleDecreaseCurrentStep}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <Button
                    type={currentStep === 4 ? "submit" : "button"}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
                    onClick={
                      currentStep < 4 ? handleIncreaseCurrentStep : undefined
                    }
                  >
                    {currentStep !== 4 ? "Next: " : ""}
                    {buttonText.map((txt, i) =>
                      txt.stepNum === currentStep ? txt.btnTxt : "",
                    )}
                  </Button>
                </div>
              </Card>
            </form>
          </FormProvider>
        </div>
      </main>
    </>
  );
};

export default CreateJobForm;
