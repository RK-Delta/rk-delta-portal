"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/get-in-touch", label: "Contact", icon: Mail },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
];

// Matches the wrapper's `bottom-[calc(1.5rem+...)]` offset below — kept as one
// constant so the measured clearance and the nav's own position can't drift apart.
const NAV_BOTTOM_OFFSET_PX = 24;

export function MobileBottomNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // The pill's rendered height can change (font loading, label edits, a 5th
  // item later), so the scroll clearance it reserves is measured, not guessed.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateClearance = () => {
      const height = nav.offsetHeight;
      document.documentElement.style.setProperty(
        "--mobile-nav-clearance",
        height > 0 ? `${height + NAV_BOTTOM_OFFSET_PX}px` : "0px"
      );
    };

    updateClearance();

    const observer = new ResizeObserver(updateClearance);
    observer.observe(nav);
    window.addEventListener("resize", updateClearance);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateClearance);
    };
  }, []);

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 md:hidden">
      <nav
        ref={navRef}
        aria-label="Mobile Bottom Navigation"
        className="flex items-center gap-1 rounded-full border border-[var(--text-secondary)]/15 bg-[var(--surface)]/70 p-1.5 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface)]/50"
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-full px-4 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                isActive
                  ? "text-[var(--bg)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 rounded-full bg-[var(--text-primary)]"
                  transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                />
              )}
              <span className="relative z-10 mb-1">
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
              </span>
              <span className="relative z-10 text-[10px] font-medium leading-none tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
