import { analyzeResumeAndJobMatch } from "@/lib/ai/mentor";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
      return Response.json(
        { success: false, error: "Resume text is required and must be valid." },
        { status: 400 },
      );
    }

    const data = await analyzeResumeAndJobMatch(resume);
    return Response.json({ success: true, data });
  } catch (error: any) {
    console.error("Resume analysis error:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Something went wrong during AI analysis",
      },
      { status: 500 },
    );
  }
}
