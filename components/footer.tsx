import { Code2, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-10 sm:py-10 md:py-12 px-6 sm:px-6 md:px-8 lg:px-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-base sm:text-lg font-bold">Abhishek Raj</span>
          </div>

          <div className="flex gap-6 sm:gap-6">
            <Link
              href="https://github.com/abhishek141001"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/abhishek-raj-69b55a230/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="mailto:ojhaabhishekraj14@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5 sm:h-5 sm:w-5" />
            </Link>
          </div>

          <p className="text-sm sm:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Abhishek Raj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}