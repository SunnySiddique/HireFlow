import EmployerSidebar from "@/components/sidebar/EmployerSidebar";
import EmployerNavbar from "../../../components/navbar/EmployerNavbar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <EmployerSidebar />

      <div className="ml-70 flex flex-col flex-1">
        <EmployerNavbar />

        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
