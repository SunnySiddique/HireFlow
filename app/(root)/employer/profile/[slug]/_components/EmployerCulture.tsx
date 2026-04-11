import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobFormValues } from "@/types/jobs";
import { Heart, Plus, X } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface EmployerCultureProps {
  editMode: boolean;
  form: UseFormReturn<JobFormValues>;
  coreValues: string[];
}

const EmployerCulture = ({
  editMode,
  form,
}: Omit<EmployerCultureProps, "coreValues">) => {
  const [newValue, setNewValue] = useState("");
  const [showAddValue, setShowAddValue] = useState(false);

  const watchedValues = (form.watch("coreValues") as string[]) ?? [];

  const addValue = () => {
    const value = newValue.trim().replace(/,$/, "");
    if (!value) return;
    form.setValue("coreValues", [...watchedValues, value]);
    setNewValue("");
    setShowAddValue(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  const removeValue = (index: number) => {
    form.setValue(
      "coreValues",
      watchedValues.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        Core Values
      </h2>

      {watchedValues.length === 0 && !editMode ? (
        <div className="py-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">
            No core values added yet. Click edit to add your company values.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-6">
            {watchedValues.map((value: string, index: number) => (
              <div
                key={`${value}-${index}`}
                className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  editMode
                    ? "bg-muted text-foreground cursor-pointer hover:bg-red-500/20 hover:text-red-500"
                    : "bg-primary/15 text-primary border border-primary/30"
                }`}
                onClick={() => editMode && removeValue(index)}
              >
                {value}
                {editMode && <X className="w-4 h-4" />}
              </div>
            ))}
          </div>

          {editMode && (
            <>
              {!showAddValue ? (
                <button
                  onClick={() => setShowAddValue(true)}
                  className="flex items-center gap-2 px-4 py-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Core Value
                </button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter core value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg border border-border focus:border-primary focus:outline-none"
                    autoFocus
                  />
                  <Button
                    onClick={addValue}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
                  >
                    Add
                  </Button>
                  <button
                    onClick={() => {
                      setShowAddValue(false);
                      setNewValue("");
                    }}
                    className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EmployerCulture;
