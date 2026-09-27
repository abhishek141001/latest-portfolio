"use client"

import { track } from "@vercel/analytics"
import { useEffect } from "react"

export function ResumeVisitTracker() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get("utm_source") !== "resume") return

    track("Resume visit", {
      medium: searchParams.get("utm_medium") ?? "unknown",
      campaign: searchParams.get("utm_campaign") ?? "unknown",
    })
  }, [])

  return null
}
