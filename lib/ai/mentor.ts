import { SYSTEM_PROMPT } from "@/constants/prompt";
import { openrouter } from "../openrouter";
import { createClient } from "../supabase/server";

async function getFilteredJobsForAI() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      job_title,
      location,
      skills_required,
      experience_level,
      salary_min,
      salary_max,
      currency,
      remote_option,
      created_at,
      employers:employer_id (company_name)
    `,
    )
    .eq("status", "open")
    .gte(
      "created_at",
      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    )
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw new Error(`Failed to fetch jobs: ${error.message}`);
  if (!jobs || jobs.length === 0) return "";

  return jobs
    .map((job: any) => {
      const company =
        job.employers?.company_name ||
        `Employer ${job.employer_id?.slice(0, 8)}`;
      const skills = job.skills_required?.join(", ") || "Not specified";
      const salary =
        job.salary_min && job.salary_max
          ? `${job.salary_min}-${job.salary_max} ${job.currency || "BDT"}`
          : "Not mentioned";

      return `JOB-${job.id} | ${job.job_title} | ${company} | ${job.location || "N/A"} |
Requires: ${skills} |
Experience: ${job.experience_level || "Not specified"} |
Salary: ${salary} |
Remote: ${job.remote_option || "No"}`;
    })
    .join("\n\n");
}

export async function analyzeResumeAndJobMatch(resume: any) {
  const jobsText = await getFilteredJobsForAI();

  if (!jobsText) {
    return {
      resume_summary: "No active jobs found at the moment.",
      extracted_skills: {},
      job_matches: [],
    };
  }

  const userMessage = `
Here is the candidate's resume:
${resume}

Here are the most relevant job postings to analyze (only these ones):
${jobsText}`;
  const completion = await openrouter.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const rawContent = completion.choices[0]?.message?.content;
  if (!rawContent) throw new Error("No response from AI");

  const parsedData = JSON.parse(rawContent);

  return parsedData;
}
