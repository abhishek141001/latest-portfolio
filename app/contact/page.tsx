"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon, SendIcon } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add your email service integration here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-32 px-2 md:px-4 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Get in touch with me for any inquiries or collaboration opportunities.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                <a
                  href="mailto:ojhaabhishekraj14@gmail.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  ojhaabhishekraj14@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                <a
                  href="tel:+918271643979"
                  className="text-muted-foreground hover:text-foreground"
                >
                  +91 8271643979
                </a>
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-bold">Social Links</h2>
            <div className="mt-4 flex gap-4">
              <Link
                href="https://github.com/abhishek141001"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
              >
                <LinkedinIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  required
                  className="min-h-[150px]"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                {isSubmitting ? "Sending..." : "Send Message"}
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}