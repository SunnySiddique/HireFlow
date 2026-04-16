import { analyzeResumeAndJobMatchService } from "@/lib/services/ai/job-matching.service";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
      return Response.json(
        { success: false, error: "Resume text is required and must be valid." },
        { status: 400 },
      );
    }

    const data = await analyzeResumeAndJobMatchService(resume);
    return Response.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Resume analysis error:", error);
    return Response.json(
      {
        success: false,
        error: message || "Something went wrong during AI analysis",
      },
      { status: 500 },
    );
  }
}
