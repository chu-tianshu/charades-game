interface FeedbackRequest {
  method?: string;
  body?: unknown;
}

interface FeedbackResponse {
  status(code: number): FeedbackResponse;
  json(body: unknown): void;
}

const FEEDBACK_TO_EMAIL = "cts2003258@gmail.com";
const MAX_MESSAGE_LENGTH = 5000;

export default async function handler(req: FeedbackRequest, res: FeedbackResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = (req.body ?? {}) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";

  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service is not configured" });
    return;
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Charades Feedback <onboarding@resend.dev>",
        to: [FEEDBACK_TO_EMAIL],
        subject: "Charades Feedback",
        text: message,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errorText);
      res.status(502).json({ error: "Failed to send feedback" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send feedback email:", error);
    res.status(500).json({ error: "Failed to send feedback" });
  }
}
