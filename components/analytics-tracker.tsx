"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import type { AnalyticsEvent } from "@/lib/analytics"

const SESSION_KEY = "portfolio_analytics_session"
const VISITOR_KEY = "portfolio_analytics_visitor"

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}

function storedId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key)
  if (existing) return existing
  const next = id(prefix)
  window.localStorage.setItem(key, next)
  return next
}

function send(events: AnalyticsEvent[]) {
  if (!events.length) return
  const payload = JSON.stringify({ events })
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }))
    return
  }
  void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true })
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // The dashboard is private operational UI, not a visitor-facing page. Its
    // own navigation and scrolling would otherwise distort the public metrics.
    if (pathname.startsWith("/admin")) return

    const sessionId = storedId(SESSION_KEY, "session")
    const visitorId = storedId(VISITOR_KEY, "visitor")
    const pageStartedAt = Date.now()
    const sentScrollDepths = new Set<number>()
    const viewedSections = new Set<string>()
    const base = () => ({ sessionId, visitorId, path: pathname, occurredAt: new Date().toISOString() })

    send([{ type: "page_view", ...base() }])

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percentage = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
      ;[25, 50, 75, 100].forEach((milestone) => {
        if (percentage >= milestone && !sentScrollDepths.has(milestone)) {
          sentScrollDepths.add(milestone)
          send([{ type: "scroll_depth", ...base(), value: milestone }])
        }
      })
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target as HTMLElement
        const section = element.dataset.analyticsSection || element.querySelector("h1, h2")?.textContent?.trim() || element.id || "Unnamed section"
        if (viewedSections.has(section)) return
        viewedSections.add(section)
        send([{ type: "section_view", ...base(), section: section.slice(0, 120) }])
      })
    }, { threshold: 0.45 })

    document.querySelectorAll("main section, [data-analytics-section]").forEach((section) => sectionObserver.observe(section))

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-analytics-event], a[href$='.pdf']")
      if (!target) return
      send([{ type: "download", ...base(), label: target.dataset.analyticsEvent || target.textContent?.trim().slice(0, 120) || "Download" }])
    }

    const onPageHide = () => send([{ type: "page_exit", ...base(), durationSeconds: Math.round((Date.now() - pageStartedAt) / 1000) }])
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("click", onClick)
    window.addEventListener("pagehide", onPageHide)
    return () => {
      onPageHide()
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("click", onClick)
      window.removeEventListener("pagehide", onPageHide)
      sectionObserver.disconnect()
    }
  }, [pathname])

  return null
}
