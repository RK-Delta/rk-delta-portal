import { NAV_LINKS } from "@/lib/nav-links";
import { contact } from "@/content/contact";
import { SOCIAL_ICONS } from "@/lib/social-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--text-secondary)]/10 bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
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

          <div className="flex flex-col gap-3">
            <p className="text-small font-medium text-[var(--text-primary)]">
              Contact
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-small text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {contact.email}
            </a>
            <div className="flex items-center gap-4">
              {contact.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.platform}
                    className="text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--text-secondary)]/10 pt-6">
          <p className="text-small text-[var(--text-secondary)]">
            © {year} RK Delta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
