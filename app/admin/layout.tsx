"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => setIsAuthenticated(Boolean(data.authenticated)))
      .catch(() => setIsAuthenticated(false))
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) router.replace("/admin/login")
  }, [isAuthenticated, router])

  if (isAuthenticated !== true) return null

  return <div className="min-h-screen">{children}</div>
}
