import { employerSections, jobSeekerSections } from "@/constants";

interface NavigationSidebarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  role: string;
  isSubscribed: boolean;
}

const NavigationSidebar = ({
  activeSection,
  setActiveSection,
  role,
  isSubscribed,
}: NavigationSidebarProps) => {
  const sections =
    role === "job_seeker"
      ? jobSeekerSections.map((section) => section)
      : employerSections.map((emp) => emp);

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Sections
          </p>
          {sections
            .filter((section) => {
              if (section.id === "billing" && !isSubscribed) return false;
              return true;
            })
            .map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-lg">{<section.icon />}</span>
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
