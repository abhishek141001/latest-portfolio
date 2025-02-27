"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search } from "lucide-react"
import Link from "next/link"
import linked2web from "@/assets/linked2web.png"
import socialdocsai from "../../assets/socialdocsai.png"
import socialsynchub from "../../assets/socialsynchub.png"
import Image from "next/image"

const projects = [
  {
    title: "Repurpose Linkedin Content on Website ",
    description: "A full-stack web application to repurpose linkedin feed to your websie.",
    technologies: ["Next.js", "MongoDB", "Linkedin Api", "Gemini"],
    liveUrl: "https://linked2web.vercel.app/",
    // githubUrl: "https://github.com/example",
    image: linked2web,
  },
  {
    title: "Youtube Analytics AI",
    description: "A full-stack web application to analyze Youtube videos using AI.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Gemini"],
    liveUrl: "https://social-docs-ai.vercel.app/",
    // githubUrl: "https://github.com/example",
    image: socialdocsai,
  },
  {
    title: "Social Media Automation Saas",
    description: "Collaborative social media management for Linkedin and X.",
    technologies: ["React", "Express.js", "MongoDB", "AWS","Razorpay"],
    image: socialsynchub,
  },
  {
    title: "Slack Automation Bot",
    description: "Automate your Slack workspace with this bot.",
    technologies: ["Nodejs", "Express.js", "MongoDB", "AWS","Slack Api"],
    githubUrl: "https://github.com/abhishek141001/HR-automation",
    image: "data:image/jpeg;base64,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",
  },
  // Add more projects here
]

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  )

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech)
    return matchesSearch && matchesTech
  })

  return (
    <div className="container py-32 px-2 md:px-4 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          A collection of my recent work and side projects.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechnologies.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                size="sm"
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
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
                  <div className="mt-6 flex gap-4">
                    {project.liveUrl && <Link href={project.liveUrl} target="_blank">
                      <Button variant="default" size="sm" className="gap-2">
                        Live Demo
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>}
                    {project.githubUrl && <Link href={project.githubUrl} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        Source
                        <Github className="h-4 w-4" />
                      </Button>
                    </Link>}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}