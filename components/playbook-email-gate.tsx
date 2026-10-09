"use client"

import { FormEvent, useState } from "react"
import { Download, Mail, X } from "lucide-react"
import { getAnalyticsIdentity } from "@/components/analytics-tracker"

const PLAYBOOK_URL = "/playbooks/ai-native-engineer-playbook.pdf"

export function PlaybookEmailGate() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const response = await fetch("/api/playbook/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage", ...getAnalyticsIdentity() }),
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.error || "Could not save your email.")

      window.location.assign(PLAYBOOK_URL)
      setOpen(false)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save your email. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-analytics-event="playbook_download_intent"
        className="playbook-banner mt-4 grid w-full gap-3 border-2 border-primary bg-primary p-3 text-left text-primary-foreground transition-opacity hover:opacity-90 sm:grid-cols-[1fr_auto] sm:items-center sm:p-4"
      >
        <span>
          <span className="block text-[10px] font-bold tracking-[0.14em] text-primary-foreground/70">FREE · 30-PAGE GUIDE FOR NEW DEVELOPERS</span>
          <span className="mt-1 block text-base font-bold sm:text-lg">Learn to build with Claude Code or Codex without blindly trusting AI.</span>
          <span className="mt-1 block max-w-3xl text-xs leading-5 text-primary-foreground/80">Real workflows, simple examples, diagrams, and checklists—based on 208 AI coding sessions at an Indian startup with 100,000+ paying customers.</span>
        </span>
        <span className="inline-flex w-fit items-center gap-1.5 border border-primary-foreground/60 bg-primary-foreground px-3 py-2 text-xs font-bold text-primary">
          <Download className="h-3.5 w-3.5" /> Get the playbook
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" role="presentation" onMouseDown={() => setOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="playbook-email-title" className="w-full max-w-md border-2 border-foreground bg-background p-5 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-muted-foreground">FREE PLAYBOOK</p>
                <h2 id="playbook-email-title" className="mt-1 text-xl font-bold">Where should I send it?</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="p-1 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Enter your email to download the AI-Native Engineering Playbook. No spam.</p>
            <form className="mt-5" onSubmit={submit}>
              <label htmlFor="playbook-email" className="text-xs font-bold">Email address</label>
              <input id="playbook-email" required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-1.5 w-full border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
              {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
              <button disabled={submitting} type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-foreground px-4 py-3 text-sm font-bold text-background disabled:cursor-not-allowed disabled:opacity-60">
                <Mail className="h-4 w-4" /> {submitting ? "Preparing your download…" : "Download the free playbook"}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
