import fs from 'node:fs'
import assert from 'node:assert/strict'
import { Marked } from 'marked'
const plan = JSON.parse(fs.readFileSync('data/article-plan.json', 'utf8'))
const plannedSlugs = new Set(plan.map(item => item.slug))
const files = fs.readdirSync('data/articles').filter(file => file.endsWith('.json'))
const partial = process.argv.includes('--partial')
if (!partial) assert.equal(files.length, 50, 'Expected exactly 50 researched articles')
const markdown = new Marked()
const errors = []
const rows = []
const seenTitles = new Set()
for (const file of files) {
 try {
  const article = JSON.parse(fs.readFileSync(`data/articles/${file}`, 'utf8'))
  const entry = plan.find(item => item.slug === article.slug)
  assert(entry, `${file}: slug missing from plan`)
  assert.equal(file, `${article.slug}.json`)
  assert.equal(article.cluster, entry.cluster)
  assert.equal(article.date, '2026-11-10')
  assert(!seenTitles.has(article.title), 'Duplicate title'); seenTitles.add(article.title)
  const words = article.content.trim().split(/\s+/).length
  assert(words >= 1200, `${article.slug}: only ${words} words`)
  assert(article.excerpt.length >= 140 && article.excerpt.length <= 160, `${article.slug}: excerpt ${article.excerpt.length} characters`)
  assert(article.sources.length >= 4, 'At least four sources required')
  const urls = new Set(article.sources.map(source => new URL(source.url).href))
  assert(urls.size >= 4, 'At least four distinct source URLs required')
  assert(article.sources.every(source => source.title && source.url.startsWith('https://')), 'Invalid source')
  assert(article.tags.length >= 3 && article.tags.length <= 5)
  assert(article.researchNote, 'Missing research provenance')
  assert(article.relatedSlugs.length >= 2 && article.relatedSlugs.every(slug => slug !== article.slug && plannedSlugs.has(slug)), 'Invalid related article')
  let external = 0, internal = 0
  markdown.walkTokens(markdown.lexer(article.content), token => {
   if (token.type !== 'link') return
   if (token.href.startsWith('https://')) external++
   else if (token.href.startsWith('/blog/')) { internal++; assert(plannedSlugs.has(token.href.slice(6).split('#')[0]), `Broken internal link: ${token.href}`) }
   else assert(token.href.startsWith('#'), `Unexpected link: ${token.href}`)
  })
  assert(external >= 3 && internal >= 2, `Insufficient links: ${external} citations, ${internal} internal links`)
  assert(!/^# /m.test(article.content), 'Article body must not add another H1')
  rows.push({ slug: article.slug, agentTask: `/root/article_${String(entry.id).padStart(2, '0')}`, words, sources: urls.size, citations: external, internalLinks: internal })
 } catch(error) { errors.push(`${file}: ${error.message}`) }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`Validated ${rows.length} articles: ${rows.reduce((sum, row) => sum + row.words, 0).toLocaleString()} words, ${rows.reduce((sum, row) => sum + row.sources, 0)} source references.`)
if (!partial && !errors.length) fs.writeFileSync('docs/article-validation.json', JSON.stringify({ checked: '2026-11-10', count: rows.length, articles: rows }, null, 2) + '\n')
