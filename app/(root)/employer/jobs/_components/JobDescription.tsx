import CustomField from "@/components/CustomField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobFormValues } from "@/types/jobs";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface JobDescriptionProps {
  form: UseFormReturn<JobFormValues>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const JobDescription = ({ form, skills, setSkills }: JobDescriptionProps) => {
  const [skillInput, setSkillInput] = useState<string>("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Job Description
      </h2>
      <p className="text-muted-foreground mb-8">
        Provide detailed information about the role
      </p>

      <div className="space-y-6">
        {/* Job Description */}
        <CustomField
          control={form.control}
          name="jobDescription"
          label="Job Description *"
          type="textarea"
          placeholder="Describe the role, responsibilities, and what success looks like..."
          isJob={true}
        />

        {/* Requirements */}
        <CustomField
          control={form.control}
          name="requirements"
          label="Requirements *"
          type="textarea"
          placeholder="List the key requirements and qualifications (one per line)..."
          isJob={true}
        />

        {/* Skills Required */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-3">
            Skills Required
          </label>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a skill (e.g., React, Python)"
              className="bg-accent border-border text-foreground placeholder:text-muted-foreground h-11"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <Button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="bg-primary/20 text-primary border-primary/30 px-3 py-1.5 cursor-pointer hover:bg-primary/30"
              onClick={() => handleRemoveSkill(index)}
            >
              {skill} ×
            </Badge>
          ))}
        </div>
      </div>

      {/* Application Deadline */}
      <div className="relative">
        <CustomField
          control={form.control}
          name="applicationDeadline"
          label="Application Deadline"
          type="date"
          placeholder=""
        />
      </div>

      {/* Status */}
      {/* <FormField
        control={form.control}
        name="publishStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-foreground">
              Publication Status
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-accent border-border text-foreground h-11">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="border-border">
                <SelectItem value="draft">Save as Draft</SelectItem>
                <SelectItem value="publish">Publish Immediately</SelectItem>
                <SelectItem value="schedule">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </>
  );
};

export default JobDescription;
