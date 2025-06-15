"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Code2, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Youtube, Twitter, Linkedin, Github } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const socials = [
  { href: "https://youtube.com/", icon: Youtube, label: "YouTube" },
  { href: "https://twitter.com/", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/", icon: Github, label: "GitHub" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`px-2 md:px-4 lg:px-20 sticky top-0 z-50 border-b backdrop-blur-sm transition-colors ${
        isScrolled ? "bg-background/80" : "bg-background/50"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo/Name */}
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6" />
          <span className="text-lg font-bold">Abhishek Raj</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Burger Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-b px-4 pb-4">
          <ul className="flex flex-col gap-3 mt-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-base transition-colors hover:text-primary ${
                    pathname === href ? "text-foreground" : "text-muted-foreground"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}