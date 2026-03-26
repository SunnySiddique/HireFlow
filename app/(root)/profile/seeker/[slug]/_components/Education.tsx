import EmptyState from "@/components/EmptyState";
import { EducationItem } from "@/types/job-seeker";
import { BookOpen } from "lucide-react";

interface EducationProps {
  education: EducationItem[];
}

const Education = ({ education }: EducationProps) => {
  const edus = education ?? [];
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Education
      </h2>

      <div className="space-y-6">
        {edus.length === 0 ? (
          <EmptyState icon={BookOpen} msg1="No Education Added" msg2="" />
        ) : (
          edus.map((edu: EducationItem) => (
            <div
              key={edu.id}
              className="pb-6 border-b border-border last:border-b-0 last:pb-0"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-muted-foreground text-sm">{edu.school}</p>
                <p className="text-muted-foreground text-xs">{edu.year}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Education;
