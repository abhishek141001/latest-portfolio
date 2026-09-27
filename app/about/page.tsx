"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "SQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Tailwind CSS",
  "AWS",
  "Docker",
  "Vercel",
  "OpenAI",
  "Gemini",
  "Git",
  "GitHub",
]

const timeline = [
  {
    year: "Mar 2025 — Present",
    title: "Software Developer · RegisterKaro",
    description: "Building tax and compliance engines, browser automations, subscription workflows, and AI systems for support, call analysis, sales intelligence, escalations, and lead scoring.",
  },
  {
    year: "2024 — 2025",
    title: "Freelance Software Developer",
    description: "Built authenticated browser automations for data extraction, reporting, and high-volume workflows.",
  },
  {
    year: "Jul 2024 — Oct 2024",
    title: "Jr. Software Developer · Gracia Marcom",
    description: "Built and deployed client websites and landing pages, maintained production sites, and improved UI.",
  },
  {
    year: "2020 — 2022",
    title: "BTech · GNIOT",
    description: "Attended BTech before choosing a self-directed path into software through real projects and production work.",
  },
]

export default function About() {
  return (
    <div className="container py-32 px-2 md:px-4 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          I build products where correctness and speed both matter: tax engines, browser automations, and AI workflows. My approach is practical — understand the messy work first, then build software that makes it easier.
        </p>

        <div className="mt-16">
          <h2 className="text-2xl font-bold">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold">Timeline</h2>
          <div className="mt-8 space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="p-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge variant="outline">{item.year}</Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </motion.div>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
