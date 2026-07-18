"use client";

import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotification } from "@/components/NotificationProvider";
import { cn } from "@/lib/utils";
import {
  FEEDBACK_CATEGORIES,
  feedbackSchema,
  type FeedbackInput,
} from "@/lib/validations/feedback";

const fieldBaseClass =
  "rounded-lg border border-[var(--text-secondary)]/25 bg-[var(--bg)] px-3.5 text-body text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/70 transition-colors duration-200 focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-0";

const fieldClass = cn("h-11", fieldBaseClass);

// SelectTrigger sets its own height via a `data-[size=default]:h-8` rule, so
// the override has to target that same variant to actually win the cascade.
const selectTriggerClass = cn(
  "w-full data-[size=default]:h-11",
  fieldBaseClass,
);

const textareaClass = cn("min-h-32 py-3", fieldBaseClass);

const labelClass = "text-small font-medium text-[var(--text-secondary)]";

export function FeedbackForm() {
  const { notify } = useNotification();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: FeedbackInput) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      notify({
        type: "success",
        title: "Thanks for the feedback",
        message: "We've received your message and will be in touch.",
      });
      reset();
    } catch {
      notify({
        type: "error",
        title: "Something went wrong",
        message: "Please try submitting the form again.",
      });
    }
  };

  return (
    <Card className="w-full border border-[var(--text-secondary)]/15 bg-[var(--surface)] shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          {/* Honeypot: hidden from sighted and keyboard users, left in the DOM for bots */}
          <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
            <Label htmlFor="honeypot">Website</Label>
            <Input
              id="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register("honeypot")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className={labelClass}>
              Name
            </Label>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              className={fieldClass}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-small text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className={labelClass}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              className={fieldClass}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-small text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className={labelClass}>
              Category
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="category"
                    aria-invalid={errors.category ? true : undefined}
                    className={selectTriggerClass}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {FEEDBACK_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-small text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message" className={labelClass}>
              Message
            </Label>
            <Textarea
              id="message"
              rows={5}
              aria-invalid={errors.message ? true : undefined}
              className={textareaClass}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-small text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent)]/90 disabled:opacity-70"
          >
            {isSubmitting && (
              <Loader2
                className="motion-safe:animate-spin"
                aria-hidden="true"
              />
            )}
            {isSubmitting ? "Sending…" : "Send feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
