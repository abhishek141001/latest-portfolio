// 'use client' removed to make this a server component
import { Badge } from "@/components/ui/badge"
import { blogs } from "@/data/blogs"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notFound } from 'next/navigation'
import Link from "next/link"
import { Metadata } from "next"

// Default avatar image URL
const DEFAULT_AVATAR = "https://media.licdn.com/dms/image/v2/D5603AQEfYoJxdIN1fA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724933283200?e=1755734400&v=beta&t=ElkRWO96EGrWuMiBQsU7hTSkENcteEdg53FVJcAwO8U"
const DEFAULT_AUTHOR = {
  name: "Anonymous",
  avatar: DEFAULT_AVATAR,
  bio: "No bio available"
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogs.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = blogs.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const author = post.author || DEFAULT_AUTHOR

  // Function to process content and identify subheadings
  const processContent = (content: string) => {
    return content.split("\n").map((paragraph, index) => {
      // Check if the paragraph is a numbered subheading (e.g., "1. Title:")
      if (/^\d+\.\s+.+:$/.test(paragraph)) {
        const headingId = paragraph.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        return (
          <h2 key={index} id={headingId} className="text-2xl font-bold mt-8 mb-4 text-primary scroll-mt-20">
            {paragraph}
          </h2>
        )
      }
      // Check if the paragraph is a bullet point
      else if (paragraph.trim().startsWith("-")) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {paragraph.replace(/^-\s*/, "")}
          </li>
        )
      }
      // Regular paragraph
      else if (paragraph.trim()) {
        return (
          <p key={index} className="mb-4 text-lg leading-relaxed">
            {paragraph}
          </p>
        )
      }
      // Empty line
      return <br key={index} />
    })
  }

  return (
    <article className="container py-12 md:py-16 px-2 md:px-4 lg:px-20">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="text-start mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4">{post.excerpt}</p>
        
        {/* Author Info */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-10 w-10 mt-1">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium mb-2">{author.name}</p>
            {author.bio && (
              <div className="text-sm text-muted-foreground">
                {author.bio}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
      </header>

      {/* Table of Contents */}
      {post.subheadings && post.subheadings.length > 0 && (
        <nav className="mb-8 p-4 md:p-6 bg-muted/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Table of Contents</h2>
          <ul className="space-y-2">
            {post.subheadings.map((heading) => (
              <li key={heading.id}>
                <Link 
                  href={`#${heading.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {heading.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-lg leading-relaxed">
          {processContent(post.content)}
        </div>

        {/* Tags Section */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Thank you for reading! Stay tuned for more articles.</p>
      </footer>
    </article>
  )
}
