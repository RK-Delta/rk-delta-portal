import { NAV_LINKS } from "@/lib/nav-links";
import { contact } from "@/content/contact";
import { SOCIAL_ICONS } from "@/lib/social-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--surface)]">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-h3 font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              <span aria-hidden="true" className="text-[var(--accent)]">
                Δ
              </span>
              RK DELTA
            </a>
            <p className="max-w-xs text-small text-[var(--text-secondary)]">
              A venture studio designing, launching, and growing a portfolio
              of ambitious new companies.
            </p>
            <div className="mt-1 flex items-center gap-3">
              {contact.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--text-secondary)]/20 bg-[var(--bg)] text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] hover:shadow-[0_0_0_1px_var(--accent)]"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer sitemap" className="flex flex-col gap-2">
            <p className="text-small font-medium text-[var(--text-primary)]">
              Sitemap
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-small text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <p className="text-small font-medium text-[var(--text-primary)]">
              Contact
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-small text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {contact.email}
            </a>
            <a
              href={`https://wa.me/${contact.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-small text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-small font-medium text-[var(--text-primary)]">
              Have an idea?
            </p>
            <p className="text-small text-[var(--text-secondary)]">
              Tell us what you&apos;re building or thinking about — we read
              every message.
            </p>
            <a
              href="#feedback"
              className="mt-1 inline-flex w-fit items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-small font-medium text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--accent)]/90"
            >
              Send feedback
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--text-secondary)]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-[var(--text-secondary)]">
            © {year} RK Delta. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-small text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
