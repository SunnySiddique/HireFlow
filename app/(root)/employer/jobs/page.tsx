import { employerJobsService } from "@/lib/services/jobs/employer-job.service";
import ManageJobsPage from "./_components/ManageJobsPage";

const JobsPage = async () => {
  const jobs = await employerJobsService();

  return <ManageJobsPage initialJobs={jobs} />;
};

export default JobsPage;
