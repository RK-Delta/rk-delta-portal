"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, X, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationType = "success" | "error";

interface Notification {
  type: NotificationType;
  title: string;
  message?: string;
}

interface NotificationContextValue {
  notify: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const AUTO_DISMISS_MS = 5000;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(
    null,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNotification(null);
  }, []);

  const notify = useCallback(
    (next: Notification) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setNotification(next);
      timeoutRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);
    },
    [dismiss],
  );

  useEffect(() => {
    if (!notification) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [notification, dismiss]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
          >
            <div
              role="alertdialog"
              aria-live="assertive"
              aria-atomic="true"
              className={cn(
                "flex w-full max-w-sm items-start gap-3 rounded-lg border bg-[var(--surface)] p-4 shadow-lg",
                notification.type === "success"
                  ? "border-[var(--accent)]"
                  : "border-destructive",
              )}
            >
              {notification.type === "success" ? (
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                  aria-hidden="true"
                />
              )}
              <div className="flex-1">
                <p className="text-h3 text-[var(--text-primary)]">
                  {notification.title}
                </p>
                {notification.message && (
                  <p className="mt-1 text-small text-[var(--text-secondary)]">
                    {notification.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss notification"
                className="shrink-0 rounded-md p-1 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}
