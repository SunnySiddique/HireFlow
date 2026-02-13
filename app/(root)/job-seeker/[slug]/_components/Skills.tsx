import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface EducationProps {
  editMode: boolean;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const Skills = ({ skills, setSkills, editMode }: EducationProps) => {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState<string>("");

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return toast.error("Please add skill");

    if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      return toast.error("Skill Already Exist");
    }
    setSkills((prev) => [...prev, skill]);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) =>
      prev.filter((skill: string) => skill !== skillToRemove),
    );
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Skills
        </h2>
        {skills.length === 0 ? (
          <EmptyState
            icon={Zap}
            msg1="No Skills Added"
            msg2="Click edit to add your professional skills."
          />
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded text-sm font-medium transition-all flex items-center gap-2 pointer-events-none ${
                  editMode
                    ? "bg-muted text-foreground cursor-pointer hover:bg-red-500/20 hover:text-red-500"
                    : "bg-secondary-foreground border"
                }`}
                onClick={() => editMode && removeSkill(skill)}
              >
                {skill.toLowerCase()}
                {editMode && <X className="w-4 h-4" />}
              </div>
            ))}
          </div>
        )}
        {editMode && (
          <>
            {!showAddSkill ? (
              <Button
                variant={"outline"}
                className="mt-6 flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                onClick={() => setShowAddSkill(true)}
              >
                <Plus className="w-5 h-5" />
                Add Skill
              </Button>
            ) : (
              <div className="mt-6 flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter skill name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                  autoFocus
                />
                <Button
                  onClick={addSkill}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
                >
                  Add
                </Button>
                <button
                  onClick={() => {
                    setShowAddSkill(false);
                    setNewSkill("");
                  }}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Skills;
