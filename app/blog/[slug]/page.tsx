// 'use client' removed to make this a server component
import { Badge } from "@/components/ui/badge"
import { blogs } from "@/data/blogs"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { notFound } from 'next/navigation'
import Link from "next/link"
import { Metadata } from "next"
import Script from "next/script"

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
      title: 'Blog Post Not Found | Abhishek Raj',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      }
    }
  }

  // Clean content for meta description (remove markdown and limit length)
  const cleanContent = post.content
    .replace(/\*\*.*?\*\*/g, '') // Remove bold text
    .replace(/##\s+/g, '') // Remove headings
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .substring(0, 160) // Limit to 160 characters for SEO

  const metaDescription = cleanContent.length < post.content.length 
    ? cleanContent + '...' 
    : post.excerpt

  const publishedDate = new Date(post.date).toISOString()
  const modifiedDate = new Date().toISOString() // You could track this separately

  return {
    title: `${post.title} | Abhishek Raj`,
    description: metaDescription,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: 'Abhishek Raj',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://ojhaabhishekraj.in'), // Replace with your actual domain
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: metaDescription,
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [post.author.name],
      tags: post.tags,
      siteName: 'Abhishek Raj - Software Developer',
      locale: 'en_US',
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: metaDescription,
      creator: '@ojhaabhishekraj', // Replace with your Twitter handle
      site: '@ojhaabhishekraj', // Replace with your Twitter handle
      images: post.coverImage ? [post.coverImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
   
    other: {
      'article:published_time': publishedDate,
      'article:modified_time': modifiedDate,
      'article:author': post.author.name,
      'article:section': 'Technology',
      'article:tag': post.tags.join(', '),
      'og:image:width': '1200',
      'og:image:height': '630',
      'twitter:image:alt': post.title,
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
      // Check if the paragraph is a markdown heading (## Title)
      if (/^##\s+.+$/.test(paragraph)) {
        const headingText = paragraph.replace(/^##\s+/, "")
        const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        return (
          <h2 key={index} id={headingId} className="text-2xl font-bold mt-8 mb-4 text-primary scroll-mt-20">
            {headingText}
          </h2>
        )
      }
      // Check if the paragraph is a numbered subheading (e.g., "1. Title:")
      else if (/^\d+\.\s+.+:$/.test(paragraph)) {
        const headingId = paragraph.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        return (
          <h2 key={index} id={headingId} className="text-2xl font-bold mt-8 mb-4 text-primary scroll-mt-20">
            {paragraph}
          </h2>
        )
      }
      // Check if the paragraph is a bullet point
      else if (paragraph.trim().startsWith("-")) {
        const bulletText = paragraph.replace(/^-\s*/, "")
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {processBoldText(bulletText)}
          </li>
        )
      }
      // Regular paragraph
      else if (paragraph.trim()) {
        return (
          <p key={index} className="mb-4 text-lg leading-relaxed">
            {processBoldText(paragraph)}
          </p>
        )
      }
      // Empty line
      return <br key={index} />
    })
  }

  // Function to process bold text (**text**)
  const processBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2)
        return <strong key={index} className="font-bold">{boldText}</strong>
      }
      return part
    })
  }

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "url": "https://ojhaabhishekraj.in", // Replace with your actual domain
        "image": post.author.avatar
      },
      "publisher": {
        "@type": "Organization",
        "name": "Abhishek Raj",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ojhaabhishekraj.in/logo.png" // Replace with your actual logo URL
        }
      },
      "datePublished": new Date(post.date).toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ojhaabhishekraj.in/blog/${post.slug}` // Replace with your actual domain
      },
      "keywords": post.tags.join(', '),
      "articleSection": "Technology",
      "wordCount": post.content.split(' ').length,
      "timeRequired": post.readTime,
      "inLanguage": "en-US"
    }

    return JSON.stringify(structuredData)
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredData(),
        }}
      />
      
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
    </>
  )
}
