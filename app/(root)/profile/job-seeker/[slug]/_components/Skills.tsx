import EmptyState from "@/components/EmptyState";
import { Zap } from "lucide-react";

interface SkillsProps {
  skills: string[];
}

const Skills = ({ skills }: SkillsProps) => {
  // const
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Skills
      </h2>
      {skills.length === 0 ? (
        <EmptyState icon={Zap} msg1="No Skills Added" msg2="" />
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded text-sm font-medium bg-secondary-foreground border"
            >
              {skill.toLowerCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
