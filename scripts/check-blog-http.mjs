import assert from 'node:assert/strict'
import fs from 'node:fs'
const origin = process.argv.find(arg => arg.startsWith('http')) || 'http://127.0.0.1:3100'
const partial = process.argv.includes('--partial')
const plan = JSON.parse(fs.readFileSync('data/article-plan.json', 'utf8'))
const builtRoutes = partial ? JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8')).routes : {}
const articles = partial ? plan.filter(item => builtRoutes[`/blog/${item.slug}`]) : plan
const fetchText = async path => {
 const response = await fetch(new URL(path, origin))
 assert.equal(response.status, 200, `${path}: HTTP ${response.status}`)
 return response.text()
}
const sitemap = await fetchText('/sitemap.xml')
const rss = await fetchText('/feed.xml')
assert(rss.includes('application/rss+xml'))
const robots = await fetchText('/robots.txt')
assert(robots.includes('Sitemap: https://www.caffeineoperator.online/sitemap.xml'))
let count = 0
for (const entry of articles) {
 const path = `/blog/${entry.slug}`
 const html = await fetchText(path)
 assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: exactly one H1`)
 assert(html.includes(`rel="canonical" href="https://www.caffeineoperator.online${path}"`), `${path}: canonical`)
 assert(!html.match(/<meta name="robots" content="[^"]*noindex/), `${path}: unintended noindex`)
 const title = html.match(/<title>(.*?)<\/title>/)?.[1] || ''
 assert.equal((title.match(/Abhishek Raj/g) || []).length, 1, `${path}: duplicated title suffix`)
 assert(html.includes('name="description"') && html.includes('property="og:image"'), `${path}: missing metadata`)
 const script = html.match(/<script id="article-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
 assert(script, `${path}: missing JSON-LD`)
 const graph = JSON.parse(script)['@graph']
 const article = graph.find(node => node['@type'] === 'BlogPosting')
 assert(article && article.wordCount >= 1200 && /^PT\d+M$/.test(article.timeRequired), `${path}: article schema`)
 assert(graph.some(node => node['@type'] === 'BreadcrumbList'), `${path}: breadcrumbs`)
 assert(article.citation.length >= 4, `${path}: sources`)
 for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${fragment}"`), `${path}: missing TOC anchor ${fragment}`)
 assert(sitemap.includes(`https://www.caffeineoperator.online${path}<`), `${path}: missing sitemap entry`)
 assert(rss.includes(`https://www.caffeineoperator.online${path}<`), `${path}: missing RSS entry`)
 count++
}
for (const cluster of [...new Set(articles.map(item => item.cluster))]) {
 const html = await fetchText(`/blog/topics/${cluster}`)
 assert(html.includes('CollectionPage'), `Missing collection schema for ${cluster}`)
}
const image = await fetch(new URL(`/blog/${articles[0].slug}/opengraph-image`, origin))
assert.equal(image.status, 200, 'Social card response')
assert(image.headers.get('content-type')?.includes('image/png'), 'Social card MIME')
const bytes = new Uint8Array(await image.arrayBuffer())
assert.equal(new DataView(bytes.buffer).getUint32(16), 1200, 'Social card width')
assert.equal(new DataView(bytes.buffer).getUint32(20), 630, 'Social card height')
const missing = await fetch(new URL('/blog/this-article-does-not-exist', origin))
assert.equal(missing.status, 404, 'Unknown article should be a 404')
console.log(`HTTP checks passed for ${count} articles, their topic hubs, sitemap, RSS, robots, social image, and missing-page status.`)
