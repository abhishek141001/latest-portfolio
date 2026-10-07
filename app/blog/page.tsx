import Link from "next/link"
import { blogs } from "@/data/blogs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Abhishek Raj",
  description: "Thoughts, insights, and technical articles about web development, programming, and technology by Abhishek Raj.",
  openGraph: {
    title: "Blog | Abhishek Raj",
    description: "Thoughts, insights, and technical articles about web development, programming, and technology by Abhishek Raj.",
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
      <section>
        <h1 className="text-2xl font-bold">Writing</h1>
        <p className="mt-1 text-muted-foreground">
          Notes on building software, learning in public, and the work behind the work.
        </p>
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
