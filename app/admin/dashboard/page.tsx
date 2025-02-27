"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, FolderGit2, Plus } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">
              <FolderGit2 className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="blog">
              <FileText className="mr-2 h-4 w-4" />
              Blog Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-4">
            <Card className="p-6">
              <div className="grid gap-4">
                {/* Project list will be added here */}
                <p className="text-muted-foreground">No projects found.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="mt-4">
            <Card className="p-6">
              <div className="grid gap-4">
                {/* Blog post list will be added here */}
                <p className="text-muted-foreground">No blog posts found.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}