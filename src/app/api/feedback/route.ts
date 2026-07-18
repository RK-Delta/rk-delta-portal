import { NextResponse } from "next/server";

import { feedbackSchema } from "@/lib/validations/feedback";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = feedbackSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: result.error.issues },
      { status: 400 },
    );
  }

  const { date, ...submission } = result.data;

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.FEEDBACK_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    return NextResponse.json(
      { error: "Feedback delivery is not configured" },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    name: submission.name,
    email: submission.email,
    category: submission.category,
    message: submission.message,
    secret: webhookSecret,
  });

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  const webhookResult =
    typeof data === "object" && data !== null && "result" in data
      ? (data as { result?: unknown }).result
      : undefined;

  if (!response.ok || webhookResult !== "success") {
    return NextResponse.json(
      { error: "Failed to deliver feedback" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
