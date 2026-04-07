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
      job_slug,
      job_description,
      category,
      employment_type,
      experience_level,
      salary_min,
      salary_max,
      currency,
      location,
      remote_option,
      skills_required,
      benefits,
      requirements,
      responsibilities,
      open_positions,
      application_deadline,
      created_at,
      employers:employer_id(company_name)
    `,
    )
    .eq("status", "open")
    .gte(
      "created_at",
      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    )
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }

  if (!jobs || jobs.length === 0) return "";

  return jobs
    .map((job: any) => {
      const company =
        job.employers?.company_name ||
        `Employer ${job.employer_id?.slice(0, 8)}`;

      const skills = job.skills_required?.length
        ? job.skills_required.join(", ")
        : "Not specified";

      const benefits = job.benefits?.length
        ? job.benefits.join(", ")
        : "Not mentioned";

      const salary =
        job.salary_min && job.salary_max
          ? `${job.salary_min}-${job.salary_max} ${job.currency || "BDT"}`
          : "Not mentioned";

      const formatJsonField = (field: any) => {
        if (!field) return "Not specified";
        if (Array.isArray(field)) return field.join(", ");
        if (typeof field === "object") return JSON.stringify(field);
        return String(field);
      };

      const requirements = formatJsonField(job.requirements);
      const responsibilities = formatJsonField(job.responsibilities);

      const deadline = job.application_deadline
        ? new Date(job.application_deadline).toLocaleDateString()
        : "Not specified";

      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOB_ID: ${job.id}
TITLE: ${job.job_title}
SLUG: ${job.job_slug}
COMPANY: ${company}

LOCATION: ${job.location || "N/A"}
CATEGORY: ${job.category || "Not specified"}
EMPLOYMENT_TYPE: ${job.employment_type || "Not specified"}
EXPERIENCE_LEVEL: ${job.experience_level || "Not specified"}
OPEN_POSITIONS: ${job.open_positions || 1}

DESCRIPTION:
${job.job_description || "Not provided"}

REQUIREMENTS:
${requirements}

RESPONSIBILITIES:
${responsibilities}

SKILLS_REQUIRED:
${skills}

BENEFITS:
${benefits}

SALARY:
${salary}

REMOTE_OPTION:
${job.remote_option || "No"}

APPLICATION_DEADLINE:
${deadline}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    })
    .join("\n");
}

export async function analyzeResumeAndJobMatch(resume: any) {
  const jobsText = await getFilteredJobsForAI();

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
