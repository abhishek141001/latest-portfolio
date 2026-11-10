import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogs } from "@/data/blogs"
import { topicClusters } from "@/lib/blog-topics"
import { absoluteUrl } from "@/lib/site"
import { jsonLd } from "@/lib/blog-markdown"

export const dynamicParams = false
export const generateStaticParams = () => topicClusters.filter(topic => blogs.some(post => post.cluster === topic.slug)).map(({ slug }) => ({ topic: slug }))
export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = topicClusters.find(topic => topic.slug === params.topic)
  if (!topic) return { title: "Topic not found", robots: { index: false } }
  return { title: `${topic.title} Guides`, description: topic.description, alternates: { canonical: `/blog/topics/${topic.slug}` }, openGraph: { title: `${topic.title} Guides`, description: topic.description, url: `/blog/topics/${topic.slug}`, type: 'website' } }
}
export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topicClusters.find(topic => topic.slug === params.topic)
  if (!topic) notFound()
  const articles = blogs.filter(post => post.cluster === topic.slug)
  const url = absoluteUrl(`/blog/topics/${topic.slug}`)
  return <div className="mx-auto max-w-4xl px-4 py-12">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', '@id': url, name: `${topic.title} Guides`, description: topic.description, url, mainEntity: { '@type': 'ItemList', itemListElement: articles.map((article, index) => ({ '@type': 'ListItem', position: index + 1, name: article.title, url: absoluteUrl(`/blog/${article.slug}`) })) } }, { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Blog', item: absoluteUrl('/blog') }, { '@type': 'ListItem', position: 2, name: topic.title, item: url }] }] }) }} />
    <nav aria-label="Breadcrumb" className="mb-6 text-sm"><Link href="/blog" className="text-primary underline">Blog</Link> / <span aria-current="page">{topic.title}</span></nav>
    <h1 className="text-3xl font-bold">{topic.title} Guides</h1>
    <p className="mt-4 text-lg text-muted-foreground">{topic.description}</p>
    <p className="mt-3 text-muted-foreground">Start with the first guide for the core design, then use the others to examine specific implementation and operational decisions. Each includes primary references and illustrative examples.</p>
    <ol className="mt-8 divide-y border-y">{articles.map(article => <li key={article.slug} className="py-5"><Link href={`/blog/${article.slug}`} className="text-xl font-semibold text-primary hover:underline">{article.title}</Link><p className="mt-2 text-muted-foreground">{article.excerpt}</p><p className="mt-2 text-sm text-muted-foreground">{article.readTime}</p></li>)}</ol>
    <nav aria-label="Other topics" className="mt-8"><h2 className="font-semibold">Explore other topics</h2><ul className="mt-3 flex flex-wrap gap-3">{topicClusters.filter(other => other.slug !== topic.slug && blogs.some(post => post.cluster === other.slug)).map(other => <li key={other.slug}><Link href={`/blog/topics/${other.slug}`} className="text-sm text-primary underline">{other.title}</Link></li>)}</ul></nav>
  </div>
}
