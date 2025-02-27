"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, ExternalLink, Github, Laptop, Sparkles } from "lucide-react"
import Link from "next/link"
import { blogs } from "@/data/blogs"
import linked2web from "@/assets/linked2web.png"
import socialdocsai from "@/assets/socialdocsai.png"
import Image from "next/image"

const featuredProjects = [
  {
    title: "Repurpose Linkedin Content on Website ",
    description: "A full-stack web application to repurpose linkedin feed to your websie.",
    technologies: ["Next.js", "MongoDB", "Linkedin Api", "Gemini"],
    image: linked2web,
  },
  {
    title: "Youtube Analytics AI",
    description: "A full-stack web application to analyze Youtube videos using AI.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Gemini"],
    image: socialdocsai,
  },
]

const latestPosts = blogs.slice(0, 2)

export default function Home() {
  return (
    <div className="min-h-screen px-2 md:px-4 lg:px-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-32">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50"
          style={{
            maskImage: "radial-gradient(circle at center, white, transparent)",
            WebkitMaskImage: "radial-gradient(circle at center, white, transparent)",
          }}
        />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Abhishek Raj
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Full Stack Developer specializing in building exceptional digital experiences.
              I craft scalable applications with modern technologies.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/contact">
                  Get in Touch
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Latest Blog Posts */}
      <section className="border-t py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Latest Posts</h2>
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/blog">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {latestPosts.map((post) => (
                <Card key={post.title} className="p-6">
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
                  <h3 className="mt-4 text-xl font-bold">{post.title}</h3>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                  <Button asChild variant="ghost" className="mt-4 gap-2">
                    <Link href={`/blog/${post.slug}`}>
                      Read Post
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
       {/* Featured Projects */}
       <section className="border-t py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/projects">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Card key={project.title} className="overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-center text-3xl font-bold">What I Do</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="p-6">
                <Code2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Web Development</h3>
                <p className="mt-2 text-muted-foreground">
                  Building responsive and performant web applications using modern frameworks.
                </p>
              </Card>
              <Card className="p-6">
                <Laptop className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Full Stack Solutions</h3>
                <p className="mt-2 text-muted-foreground">
                  Developing end-to-end solutions with scalable architecture.
                </p>
              </Card>
              <Card className="p-6">
                <Github className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Open Source</h3>
                <p className="mt-2 text-muted-foreground">
                  Contributing to and maintaining open source projects.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

     

      
    </div>
  )
}