"use client"

import { useState } from "react"
import { Code2, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="border-b border-white/15 bg-neutral-950 text-white">
      <div className="mx-auto flex h-9 max-w-[1100px] items-center justify-between gap-4 px-3 sm:px-5">
        {/* Logo/Name */}
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-bold">Abhishek Raj</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden gap-4 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs transition-colors hover:underline ${
                pathname === href ? "font-bold text-white" : "text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Burger Menu Button */}
        <button
          className="rounded p-1.5 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="border-t border-white/15 bg-neutral-950 px-3 pb-3 md:hidden">
          <ul className="mt-2 flex flex-col gap-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block text-sm transition-colors hover:underline ${
                    pathname === href ? "font-bold text-white" : "text-white/70"
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
