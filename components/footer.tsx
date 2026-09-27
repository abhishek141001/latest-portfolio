import { Code2, Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-black/15 py-4">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 px-3 text-xs text-muted-foreground sm:flex-row sm:px-5">
          <div className="flex items-center gap-2 text-foreground">
            <Code2 className="h-4 w-4" />
            <span className="font-bold">Abhishek Raj</span>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/abhishek141001"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/abhishek-raj-69b55a230/"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://x.com/ojhaabhishekraj"
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:ojhaabhishekraj14@gmail.com"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>

          <p className="text-center">
            © {new Date().getFullYear()} Abhishek Raj. All rights reserved.
          </p>
      </div>
    </footer>
  )
}
