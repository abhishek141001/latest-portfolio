import { blogs } from '@/data/blogs'
import { absoluteUrl, siteConfig } from '@/lib/site'
const xml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
export const dynamic = 'force-static'
export function GET() {
  const items = [...blogs].sort((a, b) => b.date.localeCompare(a.date)).map(post => `<item><title>${xml(post.title)}</title><link>${xml(absoluteUrl(`/blog/${post.slug}`))}</link><guid isPermaLink="true">${xml(absoluteUrl(`/blog/${post.slug}`))}</guid><description>${xml(post.excerpt)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>${post.tags.map(tag => `<category>${xml(tag)}</category>`).join('')}</item>`).join('')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteConfig.name)} — Engineering Guides</title><link>${xml(absoluteUrl('/blog'))}</link><description>${xml(siteConfig.description)}</description><language>en</language><atom:link href="${xml(absoluteUrl('/feed.xml'))}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
