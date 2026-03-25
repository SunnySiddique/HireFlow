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
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              Employer Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your company information and job openings
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            {editMode && (
              <Button
                variant={"outline"}
                className={`px-6 py-5 rounded-lg font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform whitespace-nowrap disabled:bg-muted disabled:cursor-not-allowed`}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            )}
            <Button
              variant={editMode ? "outline" : "ghost"}
              className={`px-6 py-5 rounded-lg font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform whitespace-nowrap disabled:bg-muted disabled:cursor-not-allowed`}
              onClick={editMode ? handleProfileSave : () => setEditMode(true)}
              disabled={isLoading}
            >
              {editMode ? (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </div>
              )}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
