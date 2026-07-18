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
import confetti from "canvas-confetti";
import { X, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type NotificationType = "success" | "error";

interface NotificationInput {
  type: NotificationType;
  title: string;
  message?: string;
}

interface Notification extends NotificationInput {
  id: number;
}

interface NotificationContextValue {
  notify: (notification: NotificationInput) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const AUTO_DISMISS_MS = 5000;

function getCssVar(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function fireSuccessConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "60";
  document.body.appendChild(canvas);

  const shoot = confetti.create(canvas, { resize: true, useWorker: true });

  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    shoot.reset();
    canvas.remove();
  };

  shoot({
    particleCount: 70,
    spread: 80,
    startVelocity: 30,
    gravity: 1.1,
    ticks: 220,
    origin: { x: 0.5, y: 0.15 },
    colors: [
      getCssVar("--accent", "#34d399"),
      "#6ee7b7",
      getCssVar("--text-primary", "#f5f5f7"),
    ],
  })?.then(cleanup);

  return cleanup;
}

function SuccessMark({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="mt-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10"
      animate={
        shouldReduceMotion ? undefined : { scale: [1, 1, 1.08, 1] }
      }
      transition={{
        duration: shouldReduceMotion ? 0.01 : 1.1,
        times: [0, 0.75, 0.9, 1],
        ease: "easeOut",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="h-5 w-5 text-[var(--accent)]"
        fill="none"
      >
        <motion.path
          d="M50 12 L90 88 L10 88 Z"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinejoin="round"
          initial={
            shouldReduceMotion
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0.6 }
          }
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        <motion.path
          d="M32 52 L46 66 L70 38"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={
            shouldReduceMotion
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.45,
            ease: "easeOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(
    null,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);
  const confettiCleanupRef = useRef<(() => void) | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNotification(null);
  }, []);

  const notify = useCallback(
    (next: NotificationInput) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      idRef.current += 1;
      setNotification({ ...next, id: idRef.current });
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

  const notificationId = notification?.id;
  const notificationType = notification?.type;

  useEffect(() => {
    if (confettiCleanupRef.current) {
      confettiCleanupRef.current();
      confettiCleanupRef.current = null;
    }

    if (!notificationId || notificationType !== "success" || shouldReduceMotion) {
      return;
    }

    confettiCleanupRef.current = fireSuccessConfetti();

    return () => {
      confettiCleanupRef.current?.();
      confettiCleanupRef.current = null;
    };
  }, [notificationId, notificationType, shouldReduceMotion]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : notification.type === "success"
                  ? { type: "spring", stiffness: 380, damping: 28, mass: 0.9 }
                  : { duration: 0.25 }
            }
          >
            <div
              role="alertdialog"
              aria-live="assertive"
              aria-atomic="true"
              className={cn(
                "relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-lg border bg-[var(--surface)] p-4 shadow-lg",
                notification.type === "success"
                  ? "border-[var(--accent)]"
                  : "border-destructive",
              )}
            >
              {notification.type === "success" ? (
                <SuccessMark shouldReduceMotion={shouldReduceMotion} />
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
              {notification.type === "success" && (
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]/15">
                  <motion.div
                    className="h-full bg-[var(--accent)]"
                    style={{ transformOrigin: "left" }}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : AUTO_DISMISS_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
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
