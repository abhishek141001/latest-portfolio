import { Code2, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-12 px-2 md:px-4 lg:px-20">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="text-lg font-bold">Abhishek Raj</span>
          </div>

          <div className="flex gap-6">
            <Link
              href="https://github.com/abhishek141001"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:ojhaabhishekraj14@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Abhishek Raj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}