import { Button } from "@/components/ui/button";
import { EmployerFormData } from "@/types/employer";
import { Edit2, Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface HeaderProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<EmployerFormData>;
  handleProfileSave: () => void;
  isLoading: boolean;
}

const Header = ({
  editMode,
  handleProfileSave,
  setEditMode,
  isLoading,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Employer Profile
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Manage your company information and job openings
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {editMode && (
              <Button
                variant="outline"
                className="w-full sm:w-auto h-10 px-4 rounded-lg font-medium"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            )}

            <Button
              variant={editMode ? "outline" : "ghost"}
              className="w-full sm:w-auto h-10 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
              onClick={editMode ? handleProfileSave : () => setEditMode(true)}
              disabled={isLoading}
            >
              {editMode ? (
                <>
                  <Save className="w-4 h-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
