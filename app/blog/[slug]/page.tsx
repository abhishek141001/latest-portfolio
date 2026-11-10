import { Badge } from "@/components/ui/badge"
import { blogs } from "@/data/blogs"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "@/lib/site"
import { jsonLd, renderBlogMarkdown, wordCount } from "@/lib/blog-markdown"
import { topicClusters } from "@/lib/blog-topics"

export const dynamicParams = false

export function generateStaticParams() {
  return blogs.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogs.find(post => post.slug === params.slug)
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } }
  const url = absoluteUrl(`/blog/${post.slug}`)
  const image = post.coverImage && !post.coverImage.startsWith('data:') ? absoluteUrl(post.coverImage) : absoluteUrl(`/blog/${post.slug}/opengraph-image`)
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name, url: absoluteUrl('/about') }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title, description: post.excerpt, url, type: "article",
      publishedTime: post.date, modifiedTime: post.modifiedDate || post.date,
      authors: [absoluteUrl('/about')], tags: post.tags, siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, creator: siteConfig.xHandle, images: [image] },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = blogs.find(post => post.slug === params.slug)
  if (!post) notFound()
  const { html, headings } = renderBlogMarkdown(post.content, post.figures, new Set(blogs.map(article => article.slug)))
  const cluster = topicClusters.find(cluster => cluster.slug === post.cluster)
  const explicitRelated = (post.relatedSlugs || []).map(slug => blogs.find(candidate => candidate.slug === slug)).filter((candidate): candidate is typeof post => Boolean(candidate))
  const related = [...explicitRelated, ...blogs.filter(candidate => candidate.slug !== post.slug && !explicitRelated.some(item => item.slug === candidate.slug) && (post.cluster ? candidate.cluster === post.cluster : candidate.tags.some(tag => post.tags.includes(tag))))].slice(0, 3)
  const url = absoluteUrl(`/blog/${post.slug}`)
  const image = post.coverImage && !post.coverImage.startsWith('data:') ? absoluteUrl(post.coverImage) : absoluteUrl(`/blog/${post.slug}/opengraph-image`)
  const crumbs = [{ name: 'Home', url: absoluteUrl('/') }, { name: 'Blog', url: absoluteUrl('/blog') }, ...(cluster ? [{ name: cluster.title, url: absoluteUrl(`/blog/topics/${cluster.slug}`) }] : []), { name: post.title, url }]
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title,
        description: post.excerpt, image: [image], url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@type': 'Person', name: post.author.name, url: absoluteUrl('/about') },
        publisher: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
        datePublished: post.date, dateModified: post.modifiedDate || post.date,
        articleSection: cluster?.title || 'Software Engineering', keywords: post.tags,
        wordCount: wordCount(post.content), timeRequired: `PT${Math.ceil(wordCount(post.content) / 220)}M`,
        inLanguage: 'en', citation: post.sources?.map(source => source.url),
        isAccessibleForFree: true,
      },
      { '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.name, item: crumb.url })) },
    ],
  }
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <script id="article-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          {crumbs.map((crumb, index) => <li key={crumb.url}>{index > 0 && <span aria-hidden="true" className="mr-2">/</span>}{index === crumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={new URL(crumb.url).pathname} className="hover:underline">{crumb.name}</Link>}</li>)}
        </ol>
      </nav>
      {post.coverImage && <div className="relative mb-8 h-60 overflow-hidden rounded-lg md:h-96"><Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="(max-width: 896px) 100vw, 896px" /></div>}
      <header className="mb-8">
        {cluster && <Link href={`/blog/topics/${cluster.slug}`} className="text-sm font-semibold text-primary hover:underline">{cluster.title}</Link>}
        <h1 className="mb-4 mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{post.title}</h1>
        <p className="mb-5 text-xl text-muted-foreground">{post.excerpt}</p>
        <p className="text-sm"><Link href="/about" rel="author" className="font-semibold hover:underline">{post.author.name}</Link> · <time dateTime={post.date}>{new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time> · {post.readTime}</p>
        {post.aiAssisted && <p className="mt-3 text-sm text-muted-foreground">Prepared with AI research assistance. Sources are linked throughout; worked examples are illustrative unless stated otherwise. <Link href="/blog/editorial-policy" className="underline">Editorial approach</Link>.</p>}
        {post.sourceUrl && <a href={post.sourceUrl} className="mt-3 inline-block text-sm text-primary underline">{post.sourceLabel || 'Read the original post'}</a>}
      </header>
      {headings.length > 0 && <nav aria-label="Table of contents" className="mb-8 rounded-lg border bg-muted/30 p-5"><h2 className="mb-3 font-semibold">In this article</h2><ul className="space-y-2 text-sm">{headings.filter(heading => heading.level === 2).map(heading => <li key={heading.id}><a href={`#${heading.id}`} className="text-primary hover:underline">{heading.title}</a></li>)}</ul></nav>}
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
      {post.sources && <section aria-labelledby="reference-list" className="mt-10 border-t pt-6"><h2 id="reference-list" className="mb-3 text-xl font-bold">Source reference list</h2><ul className="space-y-2 text-sm">{post.sources.map(source => <li key={source.url}><a href={source.url} className="break-words text-primary underline">{source.title}</a></li>)}</ul></section>}
      <div className="mt-8 flex flex-wrap gap-2">{post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
      {related.length > 0 && <section aria-labelledby="related-reading" className="mt-10 border-t pt-6"><h2 id="related-reading" className="mb-4 text-xl font-bold">Related reading</h2><ul className="space-y-4">{related.map(article => <li key={article.slug}><Link href={`/blog/${article.slug}`} className="font-semibold text-primary hover:underline">{article.title}</Link><p className="mt-1 text-sm text-muted-foreground">{article.excerpt}</p></li>)}</ul></section>}
      <footer className="mt-10 border-t pt-6 text-sm text-muted-foreground">Found an issue or have a question? <Link href="/contact" className="text-primary underline">Send a correction</Link>. <Link href="/blog" className="ml-3 text-primary underline">Browse all articles</Link>.</footer>
    </article>
  )
}
