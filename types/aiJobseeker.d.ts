export interface ExtractedSkills {
  technical: string[];
  soft: string[];
  experience_years: number;
  education: string;
}

export interface FitReasonBreakdown {
  skill_match: string;
  experience_match: string;
  responsibility_match: string;
  risk_factors: string;
}

export interface LearningPath {
  skill: string;
  resource: string;
  time: string;
}

export interface JobMatch {
  job_id: string;
  company: string;
  job_title: string;
  job_slug: string;
  location: string;
  fit_score: number;
  apply_recommendation: "YES" | "MAYBE" | "NO";
  fit_reason_breakdown: FitReasonBreakdown;
  strengths: string[];
  skill_gaps: string[];
  learning_path: LearningPath[];
  why_this_match: string;
}

export interface AICareerAnalysisResult {
  resume_summary: string;
  extracted_skills: ExtractedSkills;
  job_matches: JobMatch[];
}
