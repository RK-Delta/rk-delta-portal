# RK Delta — Product Spec

## Purpose
MVP marketing/organization site to establish credibility, announce
upcoming ventures, and collect feedback from visitors.

## Sections
1. **Hero / Landing** — tagline, CTA, subtle animated background
2. **About RK Delta** — mission, story, founding visionv
3. **Founders** - Two founders - Kamrujama Ansari & Ravi Shankar Jaiswal
4. **Projects Delivered** - List of projects delivered with visit link
5. **Viblooop** - our upcoming and most highlighted section lunching soon
6. **Ventures / Coming Companies** — cards per upcoming company, status badges (Coming Soon / Live)
7. **Services / Features** — what RK Delta offers, icon + short copy grid
8. **Future Goals / Roadmap** — Animated timeline component
9. **What customer says** - Premium review sections for customer satisfactions
10. **Feedback Form** — name, email, message, category dropdown, validated, sends to backend/email
11. **Footer** — contact info, socials, sitemap links

## Design direction
- Modern, confident, slightly premium — not generic SaaS-template look
- Motion should feel purposeful (on-scroll reveals, hover micro-interactions),
  not decorative for its own sake
- Dark mode support is a plus but not required for MVP

## SEO requirements
- Unique title/description per page
- OpenGraph + Twitter card images
- sitemap.xml, robots.txt
- Semantic HTML (proper heading hierarchy, landmark regions)
- JSON-LD structured data for Organization

## Performance targets
- Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO 100
- LCP < 2.5s, CLS < 0.1

## Out of scope for MVP
- User authentication
- Payment/e-commerce
- Multi-language support