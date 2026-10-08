"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // The login page lives under /admin too, but must remain visible before a
  // session exists. Without this exception the guard hides the login form and
  // redirects back to the same URL forever.
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => setIsAuthenticated(Boolean(data.authenticated)))
      .catch(() => setIsAuthenticated(false))
  }, [])

  useEffect(() => {
    if (!isLoginPage && isAuthenticated === false) router.replace("/admin/login")
  }, [isAuthenticated, isLoginPage, router])

  if (isLoginPage) return <div className="min-h-screen">{children}</div>

  if (isAuthenticated !== true) return null

  return <div className="min-h-screen">{children}</div>
}
