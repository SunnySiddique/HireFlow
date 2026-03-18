"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buttonText } from "@/constants/employerData";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useCreateJob, useUpdateJob } from "@/hooks/useJobs";
import { createSlug } from "@/lib/utils";
import { JobFormValues } from "@/types/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import BasicInfo from "./BasicInfo";
import JobDescription from "./JobDescription";
import SalaryAndBenefits from "./SalaryAndBenefits";
import WorkLocation from "./WorkLocation";

// Zod Validation Schema
const jobFormSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title must be at least 3 characters"),
    category: z.string().min(1, "Category type is required"),
    employmentType: z.string().min(1, "Employment type is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    numberOfPositions: z.coerce.number().min(1, "At least 1 position required"),
    primaryLocation: z.string().min(2, "Location is required"),
    workArrangement: z.string().min(1, "Work arrangement is required"),
    minimumSalary: z.number().min(0, "Minimum salary cannot be negative"),
    maximumSalary: z.number().min(0, "Maximum salary cannot be negative"),
    currency: z.string().min(1, "Currency is required"),
    skills: z
      .array(z.string().min(1, "Each skill must be at least 1 character"))
      .optional(),
    benefits: z
      .array(z.string().min(1, "Each benefit must be at least 1 character"))
      .optional(),
    jobDescription: z
      .string()
      .min(10, "Job description must be at least 10 characters"),
    requirements: z
      .array(z.string().min(1))
      .min(1, "At least one requirement is needed"),
    responsibilities: z
      .array(z.string().min(1))
      .min(1, "At least one responsibility is needed"),
    applicationDeadline: z.string().optional(),
    status: z.string().default("draft"),
  })
  .refine((data) => data.maximumSalary >= data.minimumSalary, {
    message: "Maximum salary must be greater than or equal to minimum salary",
  });

interface CreateJobFormProps {
  fromType: "create" | "edit";
  slug?: string;
  initialData?: JobFormValues;
}

const CreateJobForm = ({ fromType, initialData }: CreateJobFormProps) => {
  const { data: currentEmployerProfile } = useEmployerProfile();
  const { mutateAsync: createJob, isPending: isJobCreating } = useCreateJob();
  const { mutateAsync: updateJobPost, isPending: isJobUpdating } =
    useUpdateJob();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  const form = useForm<JobFormValues, any, JobFormValues>({
    resolver: zodResolver(jobFormSchema) as Resolver<JobFormValues>,
    defaultValues: {
      jobTitle: initialData?.job_title || "",
      category: initialData?.category || "",
      employmentType: initialData?.employment_type || "",
      experienceLevel: initialData?.experience_level || "",
      numberOfPositions: initialData?.open_positions || 1,
      primaryLocation: initialData?.location || "",
      workArrangement: initialData?.remote_option || "",
      minimumSalary: initialData?.salary_min || 0,
      maximumSalary: initialData?.salary_max || 0,
      currency: initialData?.currency || "usd",
      benefits: initialData?.benefits || [],
      jobDescription: initialData?.job_description || "",
      requirements: initialData?.requirements || [],
      responsibilities: initialData?.responsibilities || [],
      skills: initialData?.skills_required || [],
      applicationDeadline: initialData?.application_deadline || "",
      status: initialData?.status.toLowerCase() || "draft",
    },
  });

  const handleIncreaseCurrentStep = () => {
    if (currentStep >= 4) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleDecreaseCurrentStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: JobFormValues) => {
    if (!currentEmployerProfile) return;

    if (fromType === "create") {
      const payload: JobFormValues = {
        employer_id: currentEmployerProfile.id,
        job_slug: createSlug(data.jobTitle),
        job_title: data.jobTitle,
        category: data.category,
        employment_type: data.employmentType,
        experience_level: data.experienceLevel,
        open_positions: data.numberOfPositions,
        location: data.primaryLocation,
        remote_option: data.workArrangement,
        salary_min: data.minimumSalary,
        salary_max: data.maximumSalary,
        currency: data.currency,
        benefits: data.benefits || [],
        job_description: data.jobDescription,
        requirements: data.requirements || [],
        responsibilities: data.responsibilities || [],
        application_deadline: data.applicationDeadline || null,
        status: data.status,
        skills_required: data.skills.map((s: string) => s.toLowerCase()),
      };

      createJob(payload, {
        onSuccess: () => {
          form.reset();
          router.push("/employer/jobs");
        },
      });
    } else {
      await updateJobPost(
        { job_slug: initialData.job_slug, jobData: data },
        {
          onSuccess: () => {
            toast.success("Job updated successfully");
            form.reset();
          },
          onSettled: () => {
            router.push("/employer/jobs");
          },
        },
      );
    }
  };

  const isValid = () => {
    switch (currentStep) {
      case 1:
        return (
          form.watch("jobTitle").trim().length >= 3 &&
          form.watch("category").trim() !== "" &&
          form.watch("employmentType").trim() !== "" &&
          form.watch("experienceLevel").trim() !== "" &&
          form.watch("numberOfPositions") >= 1
        );
      case 2:
        return (
          form.watch("primaryLocation").trim().length >= 3 &&
          form.watch("workArrangement").trim() !== ""
        );
      case 3:
        return (
          form.watch("minimumSalary") > 1 &&
          form.watch("maximumSalary") > 1 &&
          form.watch("currency").trim() !== ""
        );
      case 4:
        return (
          form.watch("jobDescription").trim().length >= 10 &&
          (form.watch("requirements") as string[]).length >= 1
        );
      default:
        return false;
    }
  };

  const onInvalid = (errors: unknown) => {
    const firstError = Object.values(errors as Record<string, unknown>)[0] as
      | Record<string, unknown>
      | undefined;
    if (firstError?.message) {
      toast.error(firstError.message as string);
    }
  };

  return (
    <>
      <main>
        {/* Page Header */}
        <div className="">
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
        <div className=" pb-12">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
              {/* Step 1: Basic Information */}
              <Card className="p-8 border-border">
                {currentStep === 1 && <BasicInfo form={form} />}

                {/* Step 2: Work Location */}
                {currentStep === 2 && <WorkLocation form={form} />}

                {/* Step 3: Salary & Benefits */}
                {currentStep === 3 && <SalaryAndBenefits form={form} />}

                {/* Step 4: Job Description */}
                {currentStep === 4 && <JobDescription form={form} />}

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
                    type="button"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
                    onClick={
                      currentStep < 4
                        ? handleIncreaseCurrentStep
                        : () => form.handleSubmit(onSubmit, onInvalid)()
                    }
                    disabled={!isValid() || isJobCreating || isJobUpdating}
                  >
                    {currentStep < 4 && "Next: "}
                    {currentStep === 4
                      ? fromType === "create"
                        ? isJobCreating
                          ? "Creating..."
                          : "Publish Job"
                        : isJobUpdating
                          ? "Updating..."
                          : "Update Job"
                      : (buttonText.find((txt) => txt.stepNum === currentStep)
                          ?.btnTxt ?? "")}
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
