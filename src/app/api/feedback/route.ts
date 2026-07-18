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

  const { honeypot, ...submission } = result.data;
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.FEEDBACK_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Feedback delivery is not configured" },
      { status: 500 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to deliver feedback" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
