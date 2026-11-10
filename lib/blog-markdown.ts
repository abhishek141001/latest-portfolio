import { Marked, Renderer, type Tokens } from "marked"
import type { Blog } from "./blog-types"

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
const safeUrl = (value: string) => /^(https?:\/\/|\/(?!\/)|#[\w-])/.test(value)
export const headingId = (value: string) => value.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

// One token walk supplies both rendered heading IDs and navigation, including duplicates.
export function renderBlogMarkdown(content: string, figures: Blog["figures"] = [], availableSlugs?: Set<string>) {
  const renderer = new Renderer()
  const headings: { id: string; title: string; level: number }[] = []
  const counts = new Map<string, number>()
  renderer.html = ({ text }) => escapeHtml(text)
  renderer.heading = function ({ tokens, depth, text }: Tokens.Heading) {
    const base = headingId(text)
    const count = counts.get(base) || 0
    counts.set(base, count + 1)
    const id = count ? `${base}-${count + 1}` : base
    const level = Math.max(2, depth)
    headings.push({ id, title: text.replace(/[`*_]/g, ""), level })
    const images = figures.filter(figure => figure.afterHeading === id).map(figure => safeUrl(figure.src) ? `<figure><img src="${escapeHtml(figure.src)}" alt="${escapeHtml(figure.alt)}" width="1600" height="900" loading="lazy"><figcaption>${escapeHtml(figure.caption)}</figcaption></figure>` : "").join("")
    return `<h${level} id="${id}">${this.parser.parseInline(tokens)}</h${level}>${images}`
  }
  renderer.link = function ({ href, title, tokens }) {
    const label = this.parser.parseInline(tokens)
    if (!safeUrl(href)) return label
    if (availableSlugs && href.startsWith("/blog/") && !availableSlugs.has(href.slice(6).split("#")[0])) return label
    return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${label}</a>`
  }
  renderer.image = ({ href, text }) => safeUrl(href) ? `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" loading="lazy">` : escapeHtml(text)
  renderer.table = function (token) {
    return `<div class="blog-table-scroll" role="region" aria-label="Article comparison table" tabindex="0">${Renderer.prototype.table.call(this, token)}</div>`
  }
  const markdown = new Marked({ renderer, gfm: true, breaks: false })
  // Preserve the numbered section headings used by the original articles.
  const normalized = content.replace(/^(\d+\.\s+.+):\s*$/gm, "## $1")
  const html = markdown.parse(normalized, { async: false }) as string
  return { html, headings }
}

export const wordCount = (content: string) => content.trim().split(/\s+/).filter(Boolean).length
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c")
