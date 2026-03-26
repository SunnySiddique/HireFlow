import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EducationItem } from "@/types/job-seeker";
import { GraduationCap, Plus, X } from "lucide-react";

interface EducationProps {
  editMode: boolean;
  education: EducationItem[];
  setEducation: React.Dispatch<React.SetStateAction<EducationItem[]>>;
}

const Education = ({ editMode, education, setEducation }: EducationProps) => {
  const handleEducationChange = (
    id: number,
    field: keyof EducationItem,
    value: string,
  ) => {
    setEducation((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now(), degree: "", school: "", year: "" },
    ]);
  };

  const removeEducation = (id: number) => {
    setEducation((prev) => prev.filter((exp) => exp.id !== id));
  };
  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          Education
        </h2>
        <div className="space-y-6">
          {education.length === 0 && !editMode ? (
            <EmptyState
              icon={GraduationCap}
              msg1="No Education Added"
              msg2="Click edit to add your education details."
            />
          ) : (
            education.map((edu) => (
              <div
                key={edu.id}
                className="pb-6 border-b border-border last:border-b-0 last:pb-0"
              >
                {editMode ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        School
                      </Label>
                      <Input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "school",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Degree
                      </Label>
                      <Input
                        type="text"
                        placeholder="Degree & Field"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "degree",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-semibold text-muted-foreground">
                        Year
                      </Label>
                      <Input
                        type="text"
                        placeholder="Year Graduated"
                        value={edu.year}
                        onChange={(e) =>
                          handleEducationChange(edu.id, "year", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                      />
                    </div>

                    {education.length > 1 && (
                      <Button
                        variant={"outline"}
                        onClick={() => removeEducation(edu.id)}
                        className="flex items-center gap-2 text-red-500 text-sm font-semibold"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-semibold">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {editMode && (
          <Button
            variant={"outline"}
            onClick={addEducation}
            className="mt-6 flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Education
          </Button>
        )}
      </div>
    </>
  );
};

export default Education;
