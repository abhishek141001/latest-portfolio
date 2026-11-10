# Individual article assignment
Read your numbered entry in `data/article-plan.json`. Write ONLY `data/articles/<slug>.json`; no other file changes and no subagents.

Research the live web: open and read at least four primary documentation/specification/research sources. Use citations next to supported claims. Summaries derived from one source must stay under its word limit (normally 200 words); build the article mainly from original, explicitly illustrative engineering reasoning across sources. Treat provider benchmarks as provider reports, never universal evidence.

Write 1,200–1,800 substantive original words. Cover precise mechanics, a hypothetical worked example, concrete tradeoffs, failure modes, implementation/validation steps, 2–3 FAQ questions. Distinguish proposed design choices from source facts. No fabricated personal experience, benchmarks, credentials, tested code, search-volume claims, or keyword stuffing. API examples must match researched docs or be clearly pseudocode. No H1; use ## and ### headings. Markdown tables/code are supported.

JSON fields: `slug`, `title`, `excerpt` (140–160 characters, clear summary), `content` (Markdown), `date` = `2026-11-10`, `tags` (3–5), `cluster` (from plan), `format` = `Deep dive`, `sources` = `[{title,url}]`, `relatedSlugs` (2–3 exact other planned slugs), `researchNote` (actual sources verified and caveats). No readTime/author/subheadings fields: integration derives them.

Include >=3 inline external Markdown citations, and >=2 contextual internal Markdown links to `/blog/<exact-other-planned-slug>`. Include at least four distinct primary source URLs in sources. Example schema available in existing `data/articles/*.json`, but do not copy its prose or structure mechanically.

Verify JSON parses and report word count and sources when done. Do not commit. Complete the article, don't just report research.
