"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileDown } from "lucide-react"
import Link from "next/link"

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "AWS (EC2, S3)",
  "Git",
  "GitHub",
  "API Gateway",
  "System Design",
  "Microservices",
]

const timeline = [
  {
    year: "Present",
    title: "Full Stack Developer",
    description: "Building scalable web applications and microservices.",
  },
  {
    year: "2022",
    title: "Started Freelancing",
    description: "Worked on various client projects using modern web technologies.",
  },
  {
    year: "2021",
    title: "Graduated in Computer Science",
    description: "Completed Bachelor's degree with focus on web development.",
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
          Entrepreneurial Full Stack Developer with a passion for building scalable, efficient web applications. 
          Proficient in solving complex problems and delivering high-quality products.
        </p>

        <div className="mt-8">
          <Link href="/resume.pdf" target="_blank">
            <Button className="gap-2">
              Download Resume
              <FileDown className="h-4 w-4" />
            </Button>
          </Link>
        </div>

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