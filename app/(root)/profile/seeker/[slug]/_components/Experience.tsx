import EmptyState from "@/components/EmptyState";
import { ExperienceItem } from "@/types/job-seeker";
import { Briefcase } from "lucide-react";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  const exps = experiences ?? [];
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Experience
      </h2>

      <div className="space-y-6">
        {exps.length > 0 ? (
          exps.map((exp) => (
            <div
              key={exp.id}
              className="pb-6 border-b border-border last:border-b-0 last:pb-0"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{exp.company}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {exp.duration}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <EmptyState icon={Briefcase} msg1="No Experience Added" msg2="" />
        )}
      </div>
    </div>
  );
};

export default Experience;
