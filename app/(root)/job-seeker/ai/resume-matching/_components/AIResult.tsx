import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";

const AIResult = ({ jobs }: { jobs: any }) => {
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (30%) */}
        <LeftSidebar
          summary={jobs?.resume_summary}
          extractedSkills={jobs?.extracted_skills}
        />
        {/* Right Main Content (70%) */}
        <section className="w-full lg:w-[70%] flex flex-col gap-6">
          <RightContent result={jobs} />
        </section>
      </main>
    </>
  );
};

export default AIResult;
