# Blog SEO and search console handoff

The collection adds 50 completed engineering guides across 10 topic hubs at `/blog/topics/<topic>`, alongside the original 15 posts. See [the completion record](blog-progress.md). Articles use server-rendered Markdown, crawlable citations and internal links, canonical URLs, unique descriptions, article and breadcrumb JSON-LD, author links, dates, and social cards. All articles remain available in `/blog`, `/sitemap.xml`, and `/feed.xml`.

## Configure ownership

1. Confirm `lib/site.ts` contains the canonical production origin. It currently uses `https://www.caffeineoperator.online`. Redirect alternate HTTP/HTTPS and www/non-www origins to that one origin in hosting configuration.
2. In Google Search Console, prefer a Domain property and add the supplied TXT record at your DNS provider. Alternatively use a URL-prefix property and put its HTML verification token into the deployment environment as `GOOGLE_SITE_VERIFICATION` (token only). Redeploy and verify ownership.
3. In Bing Webmaster Tools, import your verified Search Console property or use `BING_SITE_VERIFICATION` with the HTML tag token. Redeploy if the environment variable changes.
4. Submit `https://www.caffeineoperator.online/sitemap.xml` to both consoles after deploying. The sitemap is generated from the same article catalog as the pages.
5. Inspect the blog index, a topic hub, and several new article URLs. Confirm a successful response, accessible rendered content, the intended canonical URL, and indexing eligibility. Request indexing for a few representative pages if useful; a submission does not guarantee indexing.

## Validate the live deployment

- Open `/robots.txt`, `/sitemap.xml`, and `/feed.xml` on the real domain.
- Use Google's Rich Results Test on representative articles and hubs. Structured data describes visible content and does not guarantee enhanced results.
- Check title, description, canonical, social image URL, and JSON-LD in fetched HTML. The page title should contain the site name once.
- Preview an article link in a social card debugger. New guides get a dynamically rendered 1200×630 title card at `/blog/<slug>/opengraph-image`.
- Use PageSpeed Insights and Search Console's Core Web Vitals after deployment. Field performance requires actual traffic; local checks cannot establish field results.
- Check that the production host does not add an unintended `noindex` header. Preview environments should be excluded from indexing at the host level.

## Editorial and measurement work

These articles were prepared with AI research assistance. Each has linked primary references, explicitly illustrative designs, and a research note in its JSON file. The public editorial policy explains this process without claiming independent benchmark reproduction or personal deployment experience.

Review technical examples against your own stack before adopting them. Update `modifiedDate` only when content actually changes. Keep factual corrections and source updates substantive; do not refresh dates merely to suggest freshness.

Use Search Console to learn which questions receive impressions, then improve the corresponding article rather than creating near-duplicate keyword variations. Search demand has not been measured with Keyword Planner, and this collection makes no search-volume or ranking claims. Track impressions, clicks, queries, indexed pages, and useful reader actions over time.

## Article catalog

[The SEO catalog](blog-catalog.csv) lists each new article's canonical URL, title, description, tags, word count, and related links. Use it to review coverage and match Search Console queries to the right guide. Regenerate it with `node scripts/export-blog-catalog.mjs` after editing article metadata.

## Repository maintenance

- Edit one article in `data/articles/<slug>.json`.
- `node scripts/validate-articles.mjs` checks the complete 50-article target. While the collection is in progress, use `node scripts/validate-articles.mjs --partial --report` to validate completed articles and save their report to `docs/article-validation.json`.
- `node scripts/generate-article-index.mjs` refreshes static imports after adding or removing article files. This also runs before normal builds.
- `node scripts/check-blog-renderer.cjs` checks Markdown rendering and injection boundaries.
- `npx tsc --noEmit` checks types; `npm run build` checks production compilation and static rendering.

Primary search guidance consulted:

- [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

No Search Console, Bing, DNS, or hosting account configuration has been performed by this repository change.
