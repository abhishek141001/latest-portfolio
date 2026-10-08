"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = new FormData(e.currentTarget)
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Invalid credentials")
      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-lg border bg-card p-8 shadow-lg">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-center text-2xl font-bold">Admin Login</h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
