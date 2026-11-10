const assert = require('node:assert/strict')
const fs = require('node:fs')
const Module = require('node:module')
const ts = require('typescript')
const source = ts.transpileModule(fs.readFileSync('lib/blog-markdown.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
const compiled = new Module(require('node:path').resolve('lib/blog-markdown.ts'), module)
compiled.filename = require('node:path').resolve('lib/blog-markdown.ts')
compiled.paths = module.paths
compiled._compile(source, compiled.filename)
const { renderBlogMarkdown, jsonLd } = compiled.exports
const sample = '## Safety\n\n[Docs](https://example.com/docs) and [related](/blog/agent-loop-state-machine).\n\n```ts\nconst x = "<script>"\n```\n\n| A | B |\n| --- | --- |\n| one | two |\n\n- First\n- Second\n\n## Safety\n\n### Details\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))\n\n![bad](data:image/svg+xml,bad)'
const result = renderBlogMarkdown(sample)
assert.deepEqual(result.headings.map(heading => heading.id), ['safety', 'safety-2', 'details'])
assert(result.html.includes('<pre><code class="language-ts">'))
assert(result.html.includes('&lt;script&gt;'))
assert(result.html.includes('<table>') && result.html.includes('blog-table-scroll'))
assert(result.html.includes('<ul>') && result.html.includes('href="/blog/agent-loop-state-machine"'))
assert(!result.html.includes('<script>') && !result.html.includes('href="javascript:') && !result.html.includes('src="data:'))
assert(!jsonLd({ text: '</script><script>alert(1)</script>' }).includes('<'))
const legacy = renderBlogMarkdown('1. First section:\nA paragraph', [{ afterHeading: '1-first-section', src: '/images/example.png', alt: 'Diagram', caption: 'Example' }])
assert(legacy.html.includes('id="1-first-section"') && legacy.html.includes('<figure>'))
const unpublished = renderBlogMarkdown('[Coming soon](/blog/unpublished-article)', [], new Set(['agent-loop-state-machine']))
assert(!unpublished.html.includes('href='), 'Unpublished article links must not produce broken links')
console.log('Blog renderer checks passed: headings, code, tables, lists, links, figures, and injection boundaries.')
