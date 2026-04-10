import CustomField from "@/components/CustomField";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { getResumeFileName } from "@/lib/utils";
import { ProfileFormData } from "@/types/job-seeker";
import { FileText, Upload, X } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface DocumentsProps {
  editMode: boolean;
  form: UseFormReturn<ProfileFormData>;
  portfolioUrl: string | null | undefined;
  resumeUrl: string | null | undefined;
  setResumeFile: Dispatch<SetStateAction<File | null>>;
}

const Documents = ({
  editMode,
  form,
  portfolioUrl,
  setResumeFile,
  resumeUrl,
}: DocumentsProps) => {
  const resumeRef = useRef<HTMLInputElement>(null);
  const [showResumeName, setShowResumeName] = useState<string>("");

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowResumeName(file.name);
      setResumeFile(file);
    }
  };

  const isEmpty = !portfolioUrl && !resumeUrl;

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-8">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Documents & Links
        </h2>
        {!editMode && isEmpty ? (
          <EmptyState
            icon={FileText}
            msg1="No Documents Added"
            msg2="Click edit to upload your resume and portfolio link."
          />
        ) : (
          <>
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-bold mb-3">Resume</label>
              {editMode ? (
                <>
                  {showResumeName ? (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <span className="text-foreground font-semibold">
                          {showResumeName}
                        </span>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="ml-auto"
                        onClick={() => setShowResumeName("")}
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/50">
                      <div onClick={() => resumeRef.current?.click()}>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="font-semibold text-foreground">
                          Drop your resume here or click to upload
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                      <input
                        ref={resumeRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        hidden
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-between items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <a
                      target="_blank"
                      href={resumeUrl || ""}
                      className="text-foreground font-semibold cursor-pointer"
                    >
                      {resumeUrl
                        ? getResumeFileName(resumeUrl)
                        : "No resume uploaded"}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio URL */}
            <label className="block text-sm font-bold mb-3">
              Portfolio URL
            </label>
            <FormProvider {...form}>
              {editMode ? (
                <CustomField
                  control={form.control}
                  placeholder="https://yourportfolio.com"
                  type="url"
                  label="Portfolio URL"
                  name="portfolioUrl"
                  isLable={true}
                />
              ) : (
                <a
                  target="_blank"
                  href={portfolioUrl || ""}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  {portfolioUrl ? portfolioUrl : "https://sarahjohnson.design"}
                </a>
              )}
            </FormProvider>
          </>
        )}
      </div>
    </>
  );
};

export default Documents;
