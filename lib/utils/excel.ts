import { ApplicantType } from "@/types/jobs";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { formatDate } from "../utils";

export const exportToExcel = (applicants: ApplicantType[]) => {
  if (!applicants || applicants.length === 0) return;
  const data = applicants.map((a) => ({
    CandidateName: a.seeker?.full_name ?? "",
    Email: a.seeker?.email ?? "",
    JobTitle: a.job?.job_title ?? "",
    Resume: a.seeker?.resume_url ?? "",
    Applied: formatDate(a.applied_at),
    Status: a.status ?? "",
  }));

  // 2. Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 3. Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

  // 4. Generate Excel buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // 5. Save file
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "Applicants.xlsx");
};
