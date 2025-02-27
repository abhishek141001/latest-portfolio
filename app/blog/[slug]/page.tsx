'use client'
import { useParams, useRouter } from "next/navigation" // from next/navigation
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogs } from "@/data/blogs" // Assuming posts are stored here
import { marked } from "marked"

export default function PostPage() {
  const router = useRouter()
  const { slug } = useParams() // Get the slug
console.log(slug)   
  // Find the post based on the slug
  const post = blogs.find((p) => p.slug === slug)

  if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div className="container py-32 px-2 md:px-4 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="text-start mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold  tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-lg  tracking-tight">{post.excerpt}</p>
          <div className="mt-4 flex justify-start gap-6 text-sm  tracking-tight">
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

        {/* Main Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full p-6 shadow-lg transition-transform transform hover:scale-105">
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-semibold  tracking-tight">Introduction</h2>
                <p className="text-lg  tracking-tight">
        {post.content.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
              </div>

              {/* Tags Section */}
              <div className="mt-6 flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm  tracking-tight">
          <p>Thank you for reading! Stay tuned for more articles.</p>
        </footer>
      </motion.div>
    </div>
  )
}
