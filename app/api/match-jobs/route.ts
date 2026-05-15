import { analyzeResumeAndJobMatchService } from "@/lib/services/ai/job-matching.service";

export async function POST(req: Request) {
  const { resume } = await req.json();

  if (!resume || typeof resume !== "string" || resume.trim().length < 50) {
    return Response.json(
      { success: false, error: "Resume text is required and must be valid." },
      { status: 400 },
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload: object) =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
        );

      try {
        const data = await analyzeResumeAndJobMatchService(
          resume,
          (step, message) => send({ type: "status", step, total: 4, message }),
        );

        send({ type: "result", data });
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Resume analysis error:", error);
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
