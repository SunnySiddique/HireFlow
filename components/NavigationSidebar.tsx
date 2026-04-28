import { jobSeekerSections } from "@/constants";
import { employerSections } from "@/constants/employerData";

interface NavigationSidebarProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  role: string;
  isSubscribed: boolean;
  variant?: "default" | "horizontal"; // 👈 add this
}

const NavigationSidebar = ({
  activeSection,
  setActiveSection,
  role,
  isSubscribed,
  variant = "default",
}: NavigationSidebarProps) => {
  const sections = role === "job_seeker" ? jobSeekerSections : employerSections;

  const filteredSections = sections.filter((section) => {
    if (section.id === "billing" && !isSubscribed) return false;
    return true;
  });

  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={
        isHorizontal ? "flex flex-wrap gap-2" : "sticky top-6 space-y-2"
      }
    >
      {/* Desktop Title */}
      {!isHorizontal && (
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Sections
        </p>
      )}

      {filteredSections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center gap-2 transition-all font-medium rounded-lg
              
              ${
                isHorizontal
                  ? "whitespace-nowrap px-3 py-2 text-sm"
                  : "w-full text-left px-4 py-3"
              }

              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-muted"
              }
            `}
          >
            <span className="text-base shrink-0">
              <section.icon />
            </span>

            <span className={`${isHorizontal ? "text-sm" : "text-sm"}`}>
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default NavigationSidebar;
