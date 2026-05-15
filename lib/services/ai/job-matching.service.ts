import { SYSTEM_PROMPT } from "@/constants/prompt";
import { openrouter } from "@/lib/openrouter";
import { getFilteredJobsForAIQuery } from "./job-matching.query";

function formatJobsForAI(jobs: any[]) {
  if (!jobs.length) return "";

  return jobs
    .map((job) => {
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
${formatJsonField(job.requirements)}

RESPONSIBILITIES:
${formatJsonField(job.responsibilities)}

SKILLS_REQUIRED:
${skills}

BENEFITS:
${benefits}

SALARY:
${salary}

REMOTE_OPTION:
${job.remote_option || "No"}

APPLICATION_DEADLINE:
${
  job.application_deadline
    ? new Date(job.application_deadline).toLocaleDateString()
    : "Not specified"
}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    })
    .join("\n");
}

type StatusCallback = (step: number, message: string) => void;

export async function analyzeResumeAndJobMatchService(
  resume: any,
  onStatus?: StatusCallback,
) {
  onStatus?.(1, "Reading and extracting your resume...");

  const jobs = await getFilteredJobsForAIQuery();

  onStatus?.(
    2,
    `Fetching live jobs from the database... (${jobs.length} found)`,
  );

  const jobsText = formatJobsForAI(jobs);

  onStatus?.(3, "AI is analyzing your profile against job listings...");

  const completion = await openrouter.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Here is the candidate's resume:\n${resume}\n\nHere are the most relevant job postings to analyze (only these ones):\n${jobsText}`,
      },
    ],
  });

  const rawContent = completion.choices[0]?.message?.content;
  if (!rawContent) throw new Error("No response from AI");

  onStatus?.(4, "Ranking matches and building your report...");

  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    const clean = rawContent.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(clean);
  }

  if (parsed?.job_matches && Array.isArray(parsed.job_matches)) {
    parsed.job_matches = parsed.job_matches
      .filter(
        (job: any) => job.fit_score >= 60 && job.apply_recommendation !== "NO",
      )
      .sort((a: any, b: any) => b.fit_score - a.fit_score);
  }

  return parsed;
}
