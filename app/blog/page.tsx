import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
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

export default function Blog({ searchParams }: { searchParams?: { q?: string } }) {
  const searchTerm = searchParams?.q?.toLowerCase() || ""
  const filteredPosts = blogs.filter((post) =>
    post.title.toLowerCase().includes(searchTerm)
  )

  return (
    <main className="container py-24 px-2 md:px-4 lg:px-20">
      <section>
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Thoughts, insights, and technical articles about web development.
        </p>
        <form className="mb-10 max-w-md" method="get" role="search" aria-label="Search blog posts">
          <label htmlFor="search" className="sr-only">Search articles</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              name="q"
              type="search"
              placeholder="Search articles..."
              defaultValue={searchTerm}
              className="pl-9"
              aria-label="Search articles"
            />
          </div>
        </form>
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length === 0 && (
            <p className="col-span-full text-muted-foreground">No articles found.</p>
          )}
          {filteredPosts.map((post) => (
            <article key={post.slug} className="h-full flex flex-col">
              <Link href={`/blog/${post.slug}`} className="group" aria-label={`Read: ${post.title}`}>
                <Card className="h-full p-6 transition-colors hover:bg-muted/50 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                  <p className="mt-2 text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}