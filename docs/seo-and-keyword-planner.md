# SEO and Keyword Planner

This site publishes at `https://www.caffeineoperator.online`. Its canonical tags, sitemap, robots file, and structured data must all use this exact domain.

## What is already in the codebase

- Canonical URLs and `sitemap.xml` generated from published pages and blog posts.
- `robots.txt` that blocks `/admin` and `/api` from crawlers.
- `WebSite`, `Person`, and `BlogPosting` structured data.
- Per-article title, description, canonical URL, social preview, and article metadata.
- Optional Google Search Console verification through `GOOGLE_SITE_VERIFICATION`.

## One-time Google setup

1. Add `https://www.caffeineoperator.online` as a Domain property in Google Search Console. Verify it through DNS if possible.
2. Submit `https://www.caffeineoperator.online/sitemap.xml` in Search Console.
3. Create a Google Ads account with billing enabled. Keyword Planner data comes from Google Ads.
4. In the Google Ads API Center, request or use an approved developer token.
5. Create an OAuth desktop or web client in Google Cloud, authorize the Google Ads account once, and store its refresh token securely.
6. Add the Google Ads values in the deployment provider's environment settings using the names in `.env.local.example`. Do not paste them into source code or chat.

## Keyword workflow

For every article, select one primary query and 3–6 closely related queries from Keyword Planner. Record monthly volume, competition, and the intent (learn, compare, or hire). Use the primary query naturally in the page title, H1, opening paragraph, URL only when a new URL is warranted, one H2, image alt text where relevant, and internal links. Do not repeat phrases unnaturally.

Current content clusters to research:

- AI-native engineering and AI engineering best practices
- Context engineering for coding agents
- Claude Code workflows and Codex workflows
- Subagents, agent orchestration, and graph engineering
- Browser automation and developer productivity

## Monthly operating loop

1. Pull keyword ideas and volumes from Keyword Planner.
2. Check Google Search Console queries, pages, impressions, CTR, and average position.
3. Improve pages with high impressions but weak CTR first: title, description, and answer quality.
4. Add internal links from relevant existing articles.
5. Publish only articles that answer a specific search question better than the existing result.
6. Re-submit important updated URLs in Search Console and measure changes after 2–4 weeks.
