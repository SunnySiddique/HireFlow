import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { getResumeFileName } from "@/lib/utils";
import { Download, ExternalLink, FileText } from "lucide-react";

interface DocumentsProps {
  portfolioUrl: string | null | undefined;
  resumeUrl: string | null | undefined;
  isPublicView?: boolean;
}

const Documents = ({ portfolioUrl, resumeUrl }: DocumentsProps) => {
  const handleDownloadResume = async () => {
    if (!resumeUrl) return;

    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = getResumeFileName(resumeUrl);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const isEmpty = !portfolioUrl && !resumeUrl;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-8">
      <h2 className="text-2xl font-black flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Documents & Links
      </h2>

      {isEmpty ? (
        <EmptyState icon={FileText} msg1="No Documents Added" msg2="" />
      ) : (
        <>
          {/* Resume Download */}
          {resumeUrl && (
            <div>
              <label className="block text-sm font-bold mb-3">Resume</label>
              <Button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          )}

          {/* Portfolio Link */}
          {portfolioUrl && (
            <div>
              <label className="block text-sm font-bold mb-3">Portfolio</label>
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Portfolio
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Documents;
