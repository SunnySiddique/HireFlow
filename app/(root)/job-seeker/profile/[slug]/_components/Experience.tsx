import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceItem, JobSeekerProfile } from "@/types/job-seeker";
import { Briefcase, Plus, X } from "lucide-react";

interface ExperienceProps {
  editMode: boolean;
  experiences: ExperienceItem[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;
  jobSeekerProfile: JobSeekerProfile;
}

const Experience = ({
  editMode,
  experiences,
  setExperiences,
}: ExperienceProps) => {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now(), title: "", company: "", duration: "", description: "" },
    ]);
  };

  const handleExperienceChange = (
    id: number,
    field: keyof ExperienceItem,
    value: string,
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );
  };

  const removeExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Experience
        </h2>

        <div className="space-y-6">
          {experiences.length === 0 && !editMode ? (
            <EmptyState
              icon={Briefcase}
              msg1="No Experience Added"
              msg2="Click edit to add your work experience."
            />
          ) : (
            experiences.map((exp: ExperienceItem) => (
              <div
                key={exp.id}
                className="pb-6 border-b border-border last:border-b-0 last:pb-0"
              >
                {editMode ? (
                  <div className="space-y-4">
                    {/* Job Title & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-semibold text-muted-foreground">
                          Job Title
                        </Label>
                        <Input
                          type="text"
                          placeholder="e.g. Frontend Developer"
                          value={exp.title}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "title",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold text-muted-foreground">
                          Company
                        </Label>
                        <Input
                          type="text"
                          placeholder="e.g. Google"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "company",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Duration
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. Jan 2022 – Present"
                        value={exp.duration}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "duration",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Description
                      </Label>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements"
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    {/* Remove button */}
                    {experiences.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeExperience(exp.id)}
                        className="flex items-center gap-2 text-red-500 text-sm font-semibold"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.duration.toUpperCase()}
                    </p>
                    <p className="mt-3 text-muted-foreground">
                      {exp.description}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {editMode && (
          <Button
            variant={"outline"}
            onClick={addExperience}
            className="mt-6 flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </Button>
        )}
      </div>
    </>
  );
};

export default Experience;
