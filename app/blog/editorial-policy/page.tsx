import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Editorial Approach and Corrections', description: 'How the AI engineering guides use primary sources, illustrative examples, AI assistance, and corrections.', alternates: { canonical: '/blog/editorial-policy' } }
export default function EditorialPolicy() {
  return <article className="blog-content mx-auto max-w-3xl px-4 py-12">
    <Link href="/blog">Back to the blog</Link>
    <h1 className="mt-6 text-3xl font-bold">Editorial approach and corrections</h1>
    <p>The AI engineering guide collection is prepared with AI research and writing assistance for Abhishek Raj’s site. The guides explain engineering decisions using linked primary documentation and research. AI assistance can introduce mistakes; readers should inspect the linked sources and validate implementation choices in their own environments.</p>
    <h2>Sources and claims</h2><p>Technical claims link to official specifications, project documentation, original research, or provider engineering publications. Provider reports describe their own systems and may not generalize to yours. Publication dates show when an article was prepared; a modified date is used only when an article is actually revised.</p>
    <h2>Examples and limits</h2><p>Worked scenarios, budgets, policies, code fragments, and numerical examples are illustrative unless explicitly attributed to a source. They are not claims of a deployed system, an independently reproduced benchmark, or the author’s personal experience. Code snippets explain a design and need adaptation, testing, and security review before production use.</p>
    <h2>Coverage and updates</h2><p>Articles focus on distinct engineering questions. They aim to explain mechanisms, tradeoffs, failure modes, and verification steps rather than to repeat product marketing. Model interfaces, framework APIs, and security guidance change; consult the current primary documentation before relying on version-sensitive behavior.</p>
    <h2>Corrections</h2><p>If a source has moved, a technical claim is wrong, or an example omits an important condition, <Link href="/contact">send a correction</Link> with the article URL, the relevant passage, and supporting evidence. Material corrections should update both the article and its modification date.</p>
    <p><Link href="/about">About Abhishek Raj</Link> · <Link href="/blog">Browse the guides</Link></p>
  </article>
}
