import Link from "next/link"
import { blogs } from "@/data/blogs"
import { Metadata } from "next"
import { topicClusters } from "@/lib/blog-topics"
import { jsonLd } from "@/lib/blog-markdown"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Engineering and Agent Systems Guides",
  description: "Practical AI engineering guides on agent architecture, orchestration, RAG, evaluation, security, and production reliability by Abhishek Raj.",
  openGraph: {
    title: "AI Engineering and Agent Systems Guides",
    description: "Practical AI engineering guides on agent architecture, orchestration, RAG, evaluation, security, and production reliability by Abhishek Raj.",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function Blog() {
  const posts = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="mx-auto max-w-[1100px] px-3 py-6 text-[13px] leading-5 sm:px-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "CollectionPage", name: "AI Engineering and Agent Systems Guides", url: absoluteUrl("/blog"), mainEntity: { "@type": "ItemList", itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.title, url: absoluteUrl(`/blog/${post.slug}`) })) } }) }} />
      <section>
        <h1 className="text-2xl font-bold">AI Engineering and Agent Systems</h1>
        <p className="mt-1 text-muted-foreground">
          Research-backed guides to designing, evaluating, and operating AI agents, alongside notes on software development.
        </p>
        <nav aria-label="Browse by topic" className="mt-6 grid gap-3 sm:grid-cols-2">
          {topicClusters.filter(topic => blogs.some(post => post.cluster === topic.slug)).map(topic => <Link key={topic.slug} href={`/blog/topics/${topic.slug}`} className="rounded-lg border p-3 hover:bg-muted/50"><h2 className="font-semibold text-primary">{topic.title}</h2><p className="mt-1 text-xs text-muted-foreground">{topic.description}</p></Link>)}
        </nav>
        <p className="mt-5 text-sm"><Link href="/feed.xml" className="text-primary underline">RSS feed</Link> · <Link href="/blog/editorial-policy" className="text-primary underline">Editorial approach</Link></p>
        <h2 className="mt-7 text-lg font-semibold">All articles</h2>
        <ol className="mt-5 divide-y border-y">
          {posts.map((post, index) => (
            <li key={post.slug} className="grid gap-1 py-3 sm:grid-cols-[2rem_minmax(0,1fr)_8rem] sm:gap-3">
              <span className="text-muted-foreground">{index + 1}.</span>
              <div>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-primary hover:underline" aria-label={`Read: ${post.title}`}>
                  {post.title}
                </Link>
                <p className="mt-1 text-muted-foreground">{post.excerpt}</p>
                <p className="mt-1 text-xs text-muted-foreground">{post.tags.join(" · ")}</p>
              </div>
              <time className="text-xs text-muted-foreground" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                <br />{post.format && <span className="font-medium text-primary">{post.format} · </span>}{post.readTime}
              </time>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
