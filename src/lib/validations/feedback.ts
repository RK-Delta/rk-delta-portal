import { z } from "zod";

export const FEEDBACK_CATEGORIES = [
  "General",
  "Partnership",
  "Careers",
  "Press",
  "Other",
] as const;

export const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  category: z.enum(FEEDBACK_CATEGORIES, "Select a category"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
  // Intentionally unconstrained: a filled value marks the submission as a
  // bot and is checked explicitly in the API route, not rejected here.
  honeypot: z.string().optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
