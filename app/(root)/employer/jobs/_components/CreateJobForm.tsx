"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buttonText } from "@/constants/employerData";
import { useEmployerProfile } from "@/hooks/employer-profile/useEmployer";
import { useCreateJob, useUpdateJob } from "@/hooks/jobs/useEmployerJobs";
import { createSlug } from "@/lib/utils";
import { JobFormValues } from "@/types/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, SkipForward } from "lucide-react";
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
    isFeatured: z.boolean().default(false),
    status: z.string().default("open"),
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
      applicationDeadline: initialData?.application_deadline
        ? new Date(initialData.application_deadline).toISOString().split("T")[0]
        : "",
      isFeatured: initialData?.is_featured || false,
      status: initialData.status || "open",
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
        is_featured: data.isFeatured,
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
      <main className="w-full">
        <div className="">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              Create New Job Posting
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Complete all steps to publish your job opening
            </p>
          </div>

          {/* Step Indicator */}
          <div className="w-full mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-2">
              {[
                { step: 1, label: "Basic Info" },
                { step: 2, label: "Location" },
                { step: 3, label: "Salary & Benefits" },
                { step: 4, label: "Description" },
              ].map((item, index) => {
                const isActive = currentStep >= item.step;
                const isCompleted = currentStep > item.step;

                return (
                  <div
                    key={item.step}
                    className="flex-1 flex flex-col sm:flex-row items-center"
                  >
                    <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:gap-3 w-full">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-semibold transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          item.step
                        )}
                      </div>

                      <span
                        className={`mt-1 sm:mt-0 text-xs sm:text-sm md:text-base font-medium leading-tight
                  ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {index !== 3 && (
                      <div className="hidden sm:block flex-1 h-[2px] mx-2 rounded bg-border relative">
                        <div
                          className={`absolute left-0 top-0 h-full rounded transition-all duration-300
                    ${currentStep > item.step ? "bg-primary w-full" : "w-0"}`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="pb-8 sm:pb-12">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
                <Card className="p-4 sm:p-6 md:p-8 border-border rounded-xl">
                  {currentStep === 1 && <BasicInfo form={form} />}
                  {currentStep === 2 && <WorkLocation form={form} />}
                  {currentStep === 3 && <SalaryAndBenefits form={form} />}
                  {currentStep === 4 && <JobDescription form={form} />}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-border mt-6 sm:mt-8">
                    {/* Back */}
                    {currentStep > 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={handleDecreaseCurrentStep}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                      </motion.div>
                    )}

                    {/* Right buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto">
                      {fromType === "edit" && currentStep < 4 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto border-primary/40 text-primary"
                          onClick={() => setCurrentStep(4)}
                          disabled={
                            !isValid() || isJobCreating || isJobUpdating
                          }
                        >
                          <SkipForward className="w-4 h-4 mr-2" />
                          Skip
                        </Button>
                      )}

                      <Button
                        type="button"
                        className="w-full sm:w-auto h-11 sm:h-12 rounded-xl font-bold bg-primary text-primary-foreground"
                        onClick={
                          currentStep < 4
                            ? handleIncreaseCurrentStep
                            : () => form.handleSubmit(onSubmit, onInvalid)()
                        }
                        disabled={!isValid() || isJobCreating || isJobUpdating}
                      >
                        {currentStep < 4 && "Next: "}
                        {currentStep === 4 ? (
                          fromType === "create" ? (
                            isJobCreating ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              "Publish Job"
                            )
                          ) : isJobUpdating ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Save Changes"
                          )
                        ) : (
                          (buttonText.find((txt) => txt.stepNum === currentStep)
                            ?.btnTxt ?? "")
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateJobForm;
