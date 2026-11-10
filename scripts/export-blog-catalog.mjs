import fs from 'node:fs'
const plan = JSON.parse(fs.readFileSync('data/article-plan.json', 'utf8'))
const quote = value => `"${String(value).replace(/"/g, '""')}"`
const rows = [['URL', 'Title', 'Meta description', 'Topic cluster', 'Tags', 'Published date', 'Words', 'Read time (minutes)', 'Source references', 'Related article URLs']]
for (const entry of plan) {
  const path = `data/articles/${entry.slug}.json`
  if (!fs.existsSync(path)) continue
  const article = JSON.parse(fs.readFileSync(path, 'utf8'))
  const words = article.content.trim().split(/\s+/).length
  rows.push([`https://www.caffeineoperator.online/blog/${article.slug}`, article.title, article.excerpt, article.cluster, article.tags.join('; '), article.date, words, Math.ceil(words / 220), article.sources.length, article.relatedSlugs.map(slug => `https://www.caffeineoperator.online/blog/${slug}`).join('; ')])
}
fs.writeFileSync('docs/blog-catalog.csv', rows.map(row => row.map(quote).join(',')).join('\n') + '\n')
console.log(`Exported ${rows.length - 1} articles to docs/blog-catalog.csv`)
