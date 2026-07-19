"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MAIN_NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  shouldReduceMotion: boolean | null;
}

function NavLink({
  href,
  label,
  isActive,
  shouldReduceMotion,
}: NavLinkProps) {
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 500, damping: 30, mass: 1 };

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative block rounded-full outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        "px-4 py-1.5 text-small font-medium transition-colors duration-200",
        isActive
          ? "text-[var(--text-primary)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:text-[var(--text-primary)]"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute inset-0 z-0 rounded-full bg-[var(--text-secondary)]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const navVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const logoVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 500, damping: 15, mass: 0.5 },
    },
  };

  const linksListVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 },
    },
  };

  const linkItemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 500, damping: 15, mass: 0.5 },
    },
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={logoVariants}>
          <Link
            href="/"
            className="text-h3 font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
          >
            RK Delta
          </Link>
        </motion.div>

        <motion.ul
          variants={linksListVariants}
          className="hidden items-center gap-1 md:flex"
        >
          {MAIN_NAV_LINKS.map((link) => (
            <motion.li key={link.href} variants={linkItemVariants}>
              <NavLink
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
                shouldReduceMotion={shouldReduceMotion}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* Desktop CTA & Theme Toggle (Always visible on desktop, theme toggle visible on mobile) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button asChild size="sm">
              <Link href="/get-in-touch">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
